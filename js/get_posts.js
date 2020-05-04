const db = firebase.database();

function createPostThumb(title, img, urlVar) {
    var post = `
    <div class="col-md-6">
    <a href="/article.html?e=${urlVar}">
        <div class="post m-b">
            <img src="${img}">
            <div class="post-title">
                <h3>${title}</h3>
                <div class="read-more"><a href="/article.html?e=${urlVar}">Read more</a></div>
            </div>
        </div>
    </a>
</div>
   `;

    $(post).appendTo(".posts");
}

function getPosts() {
    db.ref("posts")
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((post) => {
                var key = post.key;
                createPostThumb(
                    key,
                    snapshot.child(key + "/img_url").val(),
                    snapshot.child(key + "/post_var").val()
                );
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

getPosts();