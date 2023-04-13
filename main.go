package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID       int    `json:"id"`
	Pseudo   string `json:"pseudo"`
	Password string `json:"password"`
}

type Score struct {
	ID_User string `json:"id"`
	Score   string `json:"password"`
}

var db *sql.DB
var err error

func ReadallUsers() []User {
	//requête sur la table Artiste
	var allUsers []User
	rows, err := db.Query("SELECT *FROM users  ")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()
	// Parcourt les lignes retournées
	for rows.Next() {
		recupUser := User{}
		err = rows.Scan(&recupUser.ID, &recupUser.Pseudo, &recupUser.Password)
		if err != nil {
			panic(err.Error())
		}
		allUsers = append(allUsers, recupUser) //ajoute les données des artistes dans le tableau allArtist

	}
	return allUsers
}

func Search_User_By_Pseudo(pseudo string) User {
	//requête sur la table users d'un pseudo donné
	rows, err := db.Query("SELECT *FROM users WHERE pseudo=(?);", pseudo)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()
	recupUser := User{}
	for rows.Next() {
		err = rows.Scan(&recupUser.ID, &recupUser.Pseudo, &recupUser.Password)
		if err != nil {
			panic(err.Error())
		}
	}
	return recupUser
}

func openBase() {
	//Ouvre la connexion à la base de données
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/snake_js")
	if err != nil {
		fmt.Println(err)
	}
}

var logUser User

func main() {
	router := gin.Default()
	// Démarre le serveur
	openBase()
	// Ouvre le Database

	router.Static("/static", "./static") // charge le css et le script js
	router.LoadHTMLGlob("tmpl/*.html")   // charge les pages HTML

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "Home.html", gin.H{"logUser": logUser})
	})

	router.GET("/Snake", func(c *gin.Context) {
		c.HTML(http.StatusOK, "snake.html", gin.H{"logUser": logUser})
	})

	//---------------------Réponse de l'API----------------------//

	// Route POST pour l'inscription d'un utilisateur
	router.POST("/API/Log", func(c *gin.Context) {
		fmt.Println("Début Inscription...")

		recupUser := User{}

		//Recuperation des données de la requête envoyé en méthode POST
		pseudo := c.PostForm("pseudo")
		mdp := c.PostForm("mdp")

		recupUser.Pseudo = pseudo
		recupUser.Password = mdp

		// Affichage du USER envoyé
		fmt.Println("USER envoyé : ", recupUser)

		//Test pour la redondance d'utilisateur du pseudo
		allusers := ReadallUsers()
		var IsPseudo string = "no"
		var foundUser User
		for i := 0; i < len(allusers); i++ {
			if allusers[i].Pseudo == recupUser.Pseudo {
				foundUser = allusers[i]
				IsPseudo = "yes"
			}
		}

		if IsPseudo == "yes" {
			var Retry string = "no"
			fmt.Println("'Pseudo': ", recupUser.Pseudo, " found in DB")
			if CheckPassword(recupUser.Password, foundUser.Password) {
				logUser = Search_User_By_Pseudo(recupUser.Pseudo)
				fmt.Println("Connexion réussie: ", logUser)
				c.Redirect(http.StatusFound, "/")
				return
			} else {
				Retry = "yes"
				fmt.Println("but MDP not match")
				c.Redirect(http.StatusFound, "/?Retry="+Retry)
				return
			}
		} else {
			fmt.Println("'Pseudo': ", recupUser.Pseudo, " not found in DB")
			// Génère un hash bcrypt du mot de passe (hachage aléatoire pour renforcer la sécurité)
			hashed, err := bcrypt.GenerateFromPassword([]byte(recupUser.Password), 14)
			if err != nil {
				fmt.Println(err)
				return
			}

			// Convertit le hash en chaîne hexadécimale pour faciliter le stockage
			hashedMdp := string(hashed)

			fmt.Println("Enregistrement...")
			fmt.Println("Length hashed password : ", len(hashedMdp), " ( ", hashedMdp, " )")
			// Enregistrement de l'utilisateur dans la base de données
			// Exécute une requête INSERT INTO pour insérer des données dans la table "users"
			_, err = db.Exec("INSERT INTO `users`(`pseudo`, `password`) VALUES (?,?)", recupUser.Pseudo, hashedMdp)
			if err != nil {
				panic(err.Error())
			}

			fmt.Println("Utilisateur inséré avec succès dans la table users.")
			// Réponse de succès à l'utilisateur
			logUser = Search_User_By_Pseudo(recupUser.Pseudo)

			c.Redirect(http.StatusFound, "/")
		}

	})

	//---------------------------Fin API-------------------------//

	fmt.Println("All's good: Listening on ( http://localhost:8000/ )")

	router.Run(":8000") // Run du Serveur
}

//Fonction SCRIPT

// CheckPassword compare un mot de passe en clair avec un hash bcrypt donné
func CheckPassword(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
