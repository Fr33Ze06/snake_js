document.addEventListener("DOMContentLoaded", function() {
    var oeil = document.getElementById("eye");
    let eyeoff = document.getElementById("eye-off");
    let passwordField = document.getElementById("in_passwd");
    var popup = document.getElementById("container");
    var pop = document.getElementById("open_create");

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

    pop.addEventListener("click", function() {
    popup.style.display = "block";
    });
    document.addEventListener("click", function closePopup(e) {
        if (e.target != pop && !popup.contains(e.target)) {
            popup.style.display = "none";
        }
    });

});