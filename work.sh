#!/bin/bash

echo "Content-type: text/html"
echo ""

read -d '' input

# récupération des données
pseudo=$(echo "$input" | grep -oP '(?<=in_pseudo=)[^&]+')
mdp=$(echo "$input" | grep -oP '(?<=in_passwd=)[^&]+')

# écriture des données dans le fichier
echo "$pseudo - $mdp" >> db.txt
# renvoie d'une réponse HTML
echo "<html><head><title>Confirmation</title></head><body><h1>Données enregistrées</h1><p>Vos données ont été enregistrées dans la base de données.</p></body></html>"