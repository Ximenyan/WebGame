//import ScatterJS from '/static/js/client-map-1.0.0.29.js'
//import ScatterEOS from 'scatterjs-plugin-eosjs'
//玩家socket
var PlayerSocket;
//登录
function Login(user_hash) {
    // Create a socket
    socket = new WebSocket('ws://' + window.location.host + '/ws/join?uname=' + user_hash);
    // Message received on the socket
    socket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        switch (data.Type) {
        case 0: // JOIN
			AddNpc("屠夫","qwe","npc");
            break;
        case 1: // LEAVE
            break;
        case 2: // MESSAGE
            break;
        }
    };
}
//SCATTEER 钱包工具
ScatterJS.plugins( new ScatterEOS() );

//点击NPC触发
function NpcOnClick(id){
	//alert(id);
	const connectionOptions = {initTimeout:10000}

	ScatterJS.scatter.connect("renzaijianghu", connectionOptions).then(connected => {
    	if(!connected) {
        	// User does not have Scatter installed/unlocked.
        	return false;
    	}
    
    	// Use `scatter` normally now.
    	//alert(ScatterJS.scatter.getIdentity());
		ScatterJS.scatter.getIdentity().then(
			function (result) {  Login(result.publicKey);}
		);
	});
}
//有NPC进入或者复活
function AddNpc(name,id,header){
	var NpcStr = '<li id="li_npc%%%id%%%"data-icon="false" class="ui-li-has-icon ui-first-child" onclick=NpcOnClick("%%%id%%%");><a href="#" class="ui-btn"><img src="/static/img/%%%header%%%.gif" class="ui-li-icon">%%%name%%%</a></li>'
	$("#ul_npc_players").append(NpcStr.replace("%%%name%%%", name).replace("%%%header%%%",header).replace(/%%%id%%%/g,id));
}
$(document).ready(function(){
	var h1 =$(window).height() 　              //浏览器时下窗口可视区域高度   
	var h2 =$(document).height()　           //浏览器时下窗口文档的高度   
	var h3 =$(document.body).height()　　　　　　//浏览器时下窗口文档body的高度   
	var h4 =$(document.body).outerHeight(true)　//浏览器时下窗口文档body的总高度 包括border padding margin   
	var w1 = $(window).width(); 　   //浏览器时下窗口可视区域宽度   
	var w2 = $(document).width();   //浏览器时下窗口文档对于象宽度   
	var w3 = $(document.body).width();　　　　　　//浏览器时下窗口文档body的高度   
	var w4 = $(document.body).outerWidth(true);　//浏览器时下窗口文档body的总宽度 包括border padding  
	console.log(w1,w2,w3,w4);
  	$("#main_div_game").height(h3-120);
  	$("#main_div_game").width(w3);
	var local = new Location();
	local.getLocation(function(longi,lati){
		drawMap(longi,lati);
		console.log(longi,lati)
		drawPlayer(longi,lati);
		drawMonster();
	});
	AddNpc("杀猪人","asd","mg");
});