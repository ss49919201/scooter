package main

import (
	"fmt"
	"os"

	"github.com/ss49919201/scooter/tui/cmd/internal/tui"
)

func main() {
	if err := tui.Run(); err != nil {
		fmt.Printf("Error running tui program: %s\n", err)
		os.Exit(1)
	}
}
