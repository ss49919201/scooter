package sqlite

import (
	"database/sql"
	"sync"

	_ "github.com/mattn/go-sqlite3"
)

var sqlite = sync.OnceValues(func() (*sql.DB, error) {
	return sql.Open("sqlite3", "./example.db")
})
