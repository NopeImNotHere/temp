package Main

import "github.com/calvinmclean/babyapi"

type TODO struct {
	babyapi.DefaultResource

	Title       string
	Description string
	Completed   bool
}
