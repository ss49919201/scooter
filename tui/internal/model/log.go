package model

type Log struct {
	// TODO
}

type UnsavedLog struct {
	Log
}

type SavedLog struct {
	ID int
	Log
}
