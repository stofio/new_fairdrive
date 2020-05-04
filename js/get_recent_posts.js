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

    $(post).appendTo(".recent-posts");
}

function getPosts() {
    db.ref("posts")
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((post) => {
                var key = post.key;
                var counter = 0;
                if (counter < 2) {
                    createPostThumb(
                        key,
                        snapshot.child(key + "/img_url").val(),
                        snapshot.child(key + "/post_var").val()
                    );
                    counter = counter + 1;
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

getPosts();