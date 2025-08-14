package command

import (
	"context"

	"github.com/samber/mo"
	"github.com/ss49919201/scooter/tui/internal/model"
)

type CreateLogCommandInput struct {
	CreateLog    func(context.Context, *model.UnsavedLog) mo.Result[*model.Log]
	GetTodaysLog func(context.Context) mo.Option[*model.Log]
}

type CreateLogCommand func(context.Context, *CreateLogCommandInput) error
