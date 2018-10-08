

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
});