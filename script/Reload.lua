--此类，鸡肋
GPlayer = {}
--构造Player 声明在Golang里
function GPlayer:New(ID)
  	o = {}
  	setmetatable(o, self)
	self.super = Player.new(ID)
  	self.__index = self
  	return o
end


--发送Event
function GPlayer:GSendEvent()
	print("Send Event:",self:ID())
end

--重写GGetID()方法
function GPlayer:GGetID()
	return self.super:ID()
end

--重写GSetID()方法
function GPlayer:GSetID(ID)
	self.super:ID(ID)
end

--添加玩家到G表
function AddPlayer(id,player)
	if (G_player[id] == nil)
	then
		G_player[id] = GPlayer:New(player)
	end
	print(G_player[id]:GGetID())
	G_player[id]:SendEvent()
end