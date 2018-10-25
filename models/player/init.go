package player

import (
	. "LuaServer"
	"log"
	"sync"
)

var once = sync.Once{}

func Reload() {
	err := GetLState().DoFile("./script/Reload.lua")
	log.Println(err)
}
func init() {
	once.Do(func() {
		GetLState().DoFile("./script/G_player.lua")
		registerPlayerType(GetLState())
		Reload()
	})
}
