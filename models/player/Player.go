package player

import (
	//"log"

	"github.com/yuin/gopher-lua"
)

type Person struct {
	ID string
}

const PlayerTypeName = "Player"

func registerPlayerType(L *lua.LState) {
	mt := L.NewTypeMetatable(PlayerTypeName)
	L.SetGlobal(PlayerTypeName, mt)
	// static attributes
	L.SetField(mt, "new", L.NewFunction(newPlayer))
	// methods
	L.SetField(mt, "__index", L.SetFuncs(L.NewTable(), playerMethods))
}

// Constructor
func newPlayer(L *lua.LState) int {
	//log.Println(L.CheckString(1))
	player := &Person{L.CheckString(1)}
	ud := L.NewUserData()
	ud.Value = player
	L.SetMetatable(ud, L.GetTypeMetatable(PlayerTypeName))
	L.Push(ud)
	return 1
}

// Checks whether the first lua argument is a *LUserData with *Person and returns this *Person.
func checkPlayer(L *lua.LState) *Person {
	ud := L.CheckUserData(1)
	if v, ok := ud.Value.(*Person); ok {
		return v
	}
	L.ArgError(1, "person expected")
	return nil
}

var playerMethods = map[string]lua.LGFunction{
	"ID": playerGetSetName,
}

// Getter and setter for the Person#Name
func playerGetSetName(L *lua.LState) int {
	p := checkPlayer(L)
	if L.GetTop() == 2 {
		p.ID = L.CheckString(2)
		return 0
	}
	L.Push(lua.LString(p.ID))
	return 1
}
