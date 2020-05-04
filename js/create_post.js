const db = firebase.database();
var storage = firebase.storage();

//input and create post
$("#submit-post").on("click", function() {
    var title = $("#title").val().trim().replace(/\s\s+/g, " ");
    var intro = $("#intro").val();
    var content = $("#content").val();
    var image = $("#featured-img")[0].files[0];
    var postVar = title.split(" ").join("-");
    var createdAt = new Date().getTime();

    db.ref("posts/" + title)
        .once("value")
        .then((snapshot) => {
            var titleExist = snapshot.exists();
            if (title === "") {
                alert("Fields empty");
            } else if (titleExist) {
                alert("Post title already exists, choose another title");
            } else if (
                intro === "" ||
                content === "" ||
                $("#featured-img")[0].files.length === 0
            ) {
                alert("Fields empty");
            } else {
                $("#submit-post").html("Posting...");
                var imgName = +new Date() + "-" + image.name;
                var metadata = {
                    contentType: image.type,
                };
                db.ref("posts").child(title); //set key
                var upload = storage.ref().child(imgName).put(image, metadata);

                upload
                    .then((snapshot) => {
                        return snapshot.ref.getDownloadURL();
                    })
                    .then((url) => {
                        db.ref("posts/" + title).set({
                            created: createdAt,
                            intro: intro,
                            content: content,
                            post_var: postVar,
                            img_url: url,
                            img_storage_name: imgName,
                        });
                    })
                    .then(() => {
                        $("#submit-post").html("Post");
                        $("#title").val("");
                        $("#intro").val("");
                        $("#content").val("<h2></h2><p></p><p></p>");
                        $("#featured-img").val("");
                        alert("Post succesfully created");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
});