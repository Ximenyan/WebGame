package player

import (
	. "LuaServer"
)

func init() {
	GetLState().DoFile("./script/G.lua")
}
func AddGPlayer(id, id_p string) {
	CallLuaGFn("AddPlayer", 0, GoParmsField{
		GoFields{"string", id},
		GoFields{"string", id_p},
	})
}
