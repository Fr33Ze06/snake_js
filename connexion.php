<?php
  // Récupération du texte saisi dans le formulaire
  $texte = $_POST['in_pseudo'];
  $texte = $_POST['in_passwd'];

  // Ouverture du fichier texte en écriture
  $fichier = fopen('user.txt', 'w');

  // Écriture du texte dans le fichier
  fwrite($fichier, $in_pseudo);
  fwrite($fichier, $in_passwd);

  // Fermeture du fichier
  fclose($fichier);

  // Affichage d'un message de confirmation
  echo "Le texte a été enregistré dans le fichier.";
?>