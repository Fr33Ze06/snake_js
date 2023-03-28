document.addEventListener("DOMContentLoaded", function() {
    var oeil = document.getElementById("eye");
    let eyeoff = document.getElementById("eye-off");
    let passwordField = document.getElementById("in_passwd");

    oeil.addEventListener("click", function() {
        console.log("iui")
        eye.style.display = "none";
        eyeoff.style.display = "block";
        passwordField.type = "text";
    });

    eyeoff.addEventListener("click", function() {
        console.log("non")
        eyeoff.style.display = "none";
        eye.style.display = "block";
        passwordField.type = "password";
    });
});


