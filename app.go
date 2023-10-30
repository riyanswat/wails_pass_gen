package main

import (
	"context"
	"math/rand"
	"time"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func generateRandomPassword(length int) string {
	lower := "abcdefghijklmnopqrstuvwxyz"
	upper := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	nums := "1234567890"
	chars := "!@#$%^&"
	allChars := upper + lower + nums + chars

	rand.Seed(time.Now().UnixNano())
	password := make([]byte, length)
	for c := range password {
		password[c] = allChars[rand.Intn(len(allChars))]
	}
	return string(password)
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Generates a random password of length 'length'
func (a *App) Generate(length int) string {
	// max_length := 24
	// if length > max_length {
	// 	return fmt.Sprintf("Password length shouldn't exceed %d", max_length)
	// } else if length < 1 {
	// 	length = 8
	// }
	return generateRandomPassword(length)
	//fmt.Sprintf("Your random password is:\n%s", pass)
}
