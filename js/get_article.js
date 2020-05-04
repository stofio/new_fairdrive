const db = firebase.database();

function createArticle(img, title, intro, content) {
    var article = `
    <div class="text-center lead">
        <img src="${img}">
        <h1 class="mt-5">${title}</h1>
        <p>${intro}</p>
    </div>
    <div class="section-divider"></div>
    <div class="content">${content}</div>
    `;

    $(article).appendTo("#article-content");
}


//getArticle();

/*get URL param*/
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ?
                true :
                decodeURIComponent(sParameterName[1]);
        }
    }
};


function getArticle(urlVar) {
    var theKey = "";
    db.ref("posts").on('value', snapshot => {
        snapshot.forEach(post => {
            var postVar = post.child('post_var').val();
            if (postVar === urlVar) {
                theKey = post.key;
                db.ref("posts/" + theKey).on('value', article => {
                    console.log(article.child('intro').val());
                    createArticle(
                        article.child("img_url").val(),
                        article.key,
                        article.child("intro").val(),
                        article.child("content").val()
                    );
                })
            }
        })
    })
    return theKey;
}


getArticle(getUrlParameter("e"));