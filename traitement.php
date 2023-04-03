<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Récupération des entrées du formulaire
    $pseudo = $_POST['pseudo'];
    $mdp = $_POST['mdp'];
    
    // Création de la chaîne à enregistrer dans le fichier
    $ligne = "$pseudo:$mdp\n";
    
    // Enregistrement de la chaîne dans le fichier db.txt
    file_put_contents('db.txt', $ligne, FILE_APPEND);
    
    // Message de confirmation
    echo "Enregistrement réussi !";
}
?>