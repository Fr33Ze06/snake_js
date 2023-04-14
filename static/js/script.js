document.addEventListener("DOMContentLoaded", function() {
    var oeil = document.getElementById("eye");
    let eyeoff = document.getElementById("eye-off");
    let passwordField = document.getElementById("in_passwd");
    var pop = document.getElementById("popup");
    var close = document.getElementById("close");
    var non = document.getElementById("oui");

    oeil.addEventListener("click", function() {
        eye.style.display = "none";
        eyeoff.style.display = "block";
        passwordField.type = "text";
    });

    eyeoff.addEventListener("click", function() {
        eyeoff.style.display = "none";
        eye.style.display = "block";
        passwordField.type = "password";
    });
});
