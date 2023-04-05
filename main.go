package main

import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	ID       string `json:"id"`
	Pseudo   string `json:"pseudo"`
	Password string `json:"password"`
	Score    int    `json:"score"`
}

var db *sql.DB
var err error

func ReadallUser() []User {
	//requête sur la table Artiste
	var allUser []User
	rows, err := db.Query("SELECT *FROM Users  ")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()
	// Parcourt les lignes retournées
	for rows.Next() {
		recupUser := User{}
		err = rows.Scan(&recupUser.ID, &recupUser.Pseudo, &recupUser.Password, &recupUser.Score)
		if err != nil {
			panic(err.Error())
		}
		allUser = append(allUser, recupUser) //ajoute les données des artistes dans le tableau allArtist

	}
	return allUser
}

func openBase() {
	//Ouvre la connexion à la base de données
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/forum")
	if err != nil {
		fmt.Println(err)
	}
}

func main() {
	router := gin.Default()
	// Démarre le serveur
	openBase()
	// Ouvre le Database

}
