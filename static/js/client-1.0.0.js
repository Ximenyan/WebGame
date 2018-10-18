//import ScatterJS from '/static/js/client-map-1.0.0.29.js'
//import ScatterEOS from 'scatterjs-plugin-eosjs'

ScatterJS.plugins( new ScatterEOS() );
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
		Promise = ScatterJS.scatter.getIdentity()
		//console.log(ScatterJS.scatter.getIdentity())
	});
}
function AddNpc(name,id,header){
	var NpcStr = '<li id="li_npc%%%id%%%"data-icon="false" class="ui-li-has-icon ui-first-child" onclick=NpcOnClick("%%%id%%%");><a href="#" class="ui-btn"><img src="/static/img/%%%header%%%.png" class="ui-li-icon">%%%name%%%</a></li>'
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
	AddNpc("杀猪人","asd","us");
});