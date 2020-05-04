const db = firebase.database();
var storage = firebase.storage();

$("#article-form").hide();

function listPosts(titleKey) {
    var post = `
    <li id="${titleKey}" class="post-t">${titleKey}</li>
   `;

    $(post).appendTo(".list-posts");
}

function getPosts(callback) {
    db.ref("posts")
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((post) => {
                var key = post.key;
                listPosts(key);
            });
        })
        .then(() => {
            callback();
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateSelected() {
    $("li.post-t").on("click", (e) => {
        var titlePar = e.target.id;
        submitNewPost(titlePar);
    });
}

function submitNewPost(key) {
    $("#article-form").show();
    $("#post-list").hide();
    db.ref("posts/" + key).on("value", (snapshot) => {
        var pTitle = snapshot.key;
        var pIntro = snapshot.child("intro").val();
        var pContent = snapshot.child("content").val();
        var pImgUrl = snapshot.child("img_url").val();
        var pImgName = snapshot.child("img_storage_name").val();
        var created = snapshot.child("created").val();
        $("#title").val(pTitle);
        $("#intro").val(pIntro);
        $("#content").val(pContent);

        $("#submit-post").on("click", () => {
            var title = $("#title").val().trim().replace(/\s\s+/g, " ");
            var intro = $("#intro").val();
            var content = $("#content").val();
            var postVar = title.split(" ").join("-");
            db.ref("posts/" + pTitle)
                .remove()
                .then(() => {
                    db.ref("posts")
                        .once("value")
                        .then((snapshot) => {
                            var titleExist = snapshot.exists();
                            if (title === "") {
                                alert("Fields empty");
                            } else if (titleExist && title != pTitle) {
                                alert("Post title already exists, choose another title");
                            } else if (intro === "" || content === "") {
                                alert("Fields empty");
                            } else {
                                /*
                                 * do update with image
                                 */
                                if ($("#featured-img")[0].files.length !== 0) {
                                    $("#submit-post").html("Updating...");
                                    var image = $("#featured-img")[0].files[0];
                                    var imgName = +new Date() + "-" + image.name;
                                    var metadata = {
                                        contentType: image.type,
                                    };
                                    db.ref("posts").child(title); //set key
                                    var upload = storage
                                        .ref()
                                        .child(imgName)
                                        .put(image, metadata);

                                    upload
                                        .then((snapshot) => {
                                            return snapshot.ref.getDownloadURL();
                                        })
                                        .then((url) => {
                                            storage.ref().child(pImgName).delete();
                                            db.ref("posts/" + title).set({
                                                created: created,
                                                intro: intro,
                                                content: content,
                                                post_var: postVar,
                                                img_url: url,
                                                img_storage_name: imgName,
                                            });
                                        })
                                        .then(() => {
                                            alert("Post succesfully updated");
                                            location.reload();
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                    /*
                                     * do update without image
                                     */
                                } else {
                                    $("#submit-post").html("Updating...");
                                    db.ref("posts/" + title)
                                        .set({
                                            created: created,
                                            intro: intro,
                                            content: content,
                                            post_var: postVar,
                                            img_url: pImgUrl,
                                            img_storage_name: pImgName,
                                        })
                                        .then(() => {
                                            alert("Post succesfully updated");
                                            $("#submit-post").html("Update");
                                            location.reload();
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }
                            }
                        });
                });
        });
        $("#delete-post").on("click", () => {
            console.log(pImgName);
            if (confirm("Delete this post?")) {
                db.ref("posts/" + pTitle).remove();
                storage
                    .ref()
                    .child(pImgName)
                    .delete()
                    .then(() => {
                        location.reload();
                    });
            } else {}
        });
    });
}

getPosts(updateSelected);