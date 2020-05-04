const db = firebase.database();
const auth = firebase.auth();

var base_url = window.location.origin;
//listen changes 
auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = base_url + "/new_post.html";
    } else {}
});

//login
$('#login-form').submit((e) => {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    auth.signInWithEmailAndPassword(email, password);
})