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

    non.addEventListener("click", function() {
        pop.style.display = "block";
        close.style.display = "block";
    });

    close.addEventListener("click", function() {
        pop.style.display = "none";
        close.style.display = "none";
    });
});

function enregistrer() {
    // Récupération des entrées du formulaire
    let pseudo = document.getElementById('in_pseudo').value;
    let mdp = document.getElementById('in_passwd').value;
    
    // Envoi des données au script PHP avec la méthode POST
    fetch('../traitement.php', {
        method: 'POST',
        body: new URLSearchParams({
            'pseudo': pseudo,
            'mdp': mdp
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Enregistrement réussi !');
        } else {
            console.error('Erreur lors de l\'enregistrement');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

