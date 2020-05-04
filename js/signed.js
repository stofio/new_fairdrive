const auth = firebase.auth();

var base_url = window.location.origin;
//listen changes 
auth.onAuthStateChanged(user => {
    if (user) {} else {
        window.location.href = base_url + "/admin.html";
    }
});

//logout
$('.logout').on('click', (e) => {
    e.preventDefault();
    auth.signOut();
})