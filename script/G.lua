G_player =  {}

function AddPlayer(id,player)
	if (G_player[id] == nil)
	then
		G_player[id] = player
	end
	print("add player succes:")
	print(G_player[id])
end