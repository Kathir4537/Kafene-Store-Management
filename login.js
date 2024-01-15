//login page
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = form.username.value
    const password = form.password.value

    authendication(username, password);
});

function authendication(username, password) {

    if (username == password) {
        window.location.replace("orders.html")
        sessionStorage.setItem('isLoggedIn', true);
        alert("Login Successfull")
    } else {
        alert("Please Enter Valid Credentials");
    }
}
