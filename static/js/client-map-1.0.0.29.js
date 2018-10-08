/**
*	网关：1.0.0.13
*	网络管理：判断玩家网络、地域的合法性
**/
//网关
var local_socket;
//经纬度
var longitude = 0;
var latitude = 0;
//地图
var G_map;
var G_convertor;//坐标转换
/*绘制背景地图*/
function drawMap(longitude, latitude){
    //alert(string(longitude));
	// 百度地图API功能
	G_map = new BMap.Map("main_div_game");
	var point = new BMap.Point(longitude,latitude);
	G_convertor = new BMap.Convertor();
    var pointArr = [];
    pointArr.push(point);
	
	var map_style = [
          {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                              "lightness": 100,
                              "saturation": -100
                    }
          },
          {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                              "lightness": 47
                    }
          },
          {
                    "featureType": "manmade",
                    "elementType": "geometry",
                    "stylers": {
                              "lightness": 28
                    }
          },
          {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "lightness": 82
                    }
          },
          {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "lightness": -76
                    }
          },
          {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                              "lightness": 63,
                              "saturation": -100
                    }
          },
          {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                              "color": "#444444ff",
                              "lightness": -1
                    }
          },          
			{
                    "featureType": "all",
                    "elementType": "labels",
                    "stylers": {
                              "color": "#ffffff00"
                    }
          }
];
	var translateCallback = function (data){
    	if(data.status === 0) {
			G_map.centerAndZoom(data.points[0], 15);
			G_map.disableDragging();//禁止拖动
			G_map.disableDoubleClickZoom();//禁止放大
			G_map.disablePinchToZoom();//禁止放大
			G_map.disableScrollWheelZoom();//禁止放大
			G_map.setMapStyle({styleJson:map_style});
      	}
    };
    G_convertor.translate(pointArr, 1, 5, translateCallback);
};
/*绘制主角*/
function drawPlayer(longitude, latitude){
	var pt = new BMap.Point(longitude, latitude);
	var myIcon = new BMap.Icon("../../static/img/fox.gif", new BMap.Size(150,78));
	var pointArr = [];
    pointArr.push(pt);
	var translateCallback = function (data){
    	if(data.status === 0) {
		var marker2 = new BMap.Marker(data.points[0],{icon:myIcon});  // 创建标注
		var name = new BMap.Label("叶芊芊",{offset:new BMap.Size(53,-15)});
		marker2.setLabel(name);
		marker2.addEventListener("click",function(){ 
			//$("#PlayerInfoPanel").panel("open");
		});
		G_map.addOverlay(marker2);              // 将标注添加到地图中
      	}
    };
    G_convertor.translate(pointArr, 1, 5, translateCallback);
};
/*绘制怪物*/
function drawMonster(){
	var data = [[104.03,30.72], [104.011,30.71], [104.02,30.72], [104.03,30.71]];
	var myMonster = new BMap.Icon("../../static/img/m1.gif", new BMap.Size(23,36));
	//myMonster.setImageSize(new BMap.Size(69,110));
	var pointArr = [];
    for (var i = 0; i < data.length; i++) {
		var point_m = new BMap.Point(data[i][0], data[i][1]);
		pointArr.push(point_m);	
    }
	var translateCallback = function (data){
    	if(data.status === 0) {
			for(var j = 0; j < data.points.length; j++)
			{
    			var monster = new BMap.Marker(data.points[j], {icon:myMonster});  // 初始化PointCollection
				var label = new BMap.Label("神教徒",{offset:new BMap.Size(-5,-20)});
				monster.setLabel(label);
				monster.addEventListener("click",function(){ 
				//var jsonObj = { event_type: 0, result: {event:"click the monster!"}};
				//local_socket.send(JSON.stringify(jsonObj));
				//$("#MonsterInfoPanel").panel("open");
				});
    	G_map.addOverlay(monster);  // 添加Overlay		
			}
      	}
    };
    G_convertor.translate(pointArr, 1, 5, translateCallback);
};
function Location(){};
Location.prototype.longitude = 0;
Location.prototype.latitude = 0;
/*取地址*/
Location.prototype.getLocation = function(callback){
  var options = {
    enableHighAccuracy: true,
    maximumAge: 1000
  };
  //this.callback = Object.prototype.toString.call(callback) =="[object Function]" ?
  //  callback : 
  //  function(address){
  //    alert(address.province + address.city);
  //    console.log("getocation(callbackFunction) 可获得定位信息对象");
  //  };
  var self = this;
  if (navigator.geolocation) {
    //浏览器支持geolocation
    navigator.geolocation.getCurrentPosition(function(position){
    //经度
    var longit = position.coords.longitude;
    //纬度
    var latit = position.coords.latitude;
	this.longitude = longit;
	this.latitude = latit;
	console.log(longit,latit);
	console.log(longitude,latitude);
	callback(longit,latit);
	//var jsonObj = { event_type: 0, result: {longitude:longitude,latitude:latitude}};
	//local_socket.send(JSON.stringify(jsonObj));
	//navigator.geolocation.watchPosition(self.showPosition);
    //self.loadMapApi(self.longitude,self.latitude);
    //drawMap(longitude,latitude);
    }, self.onError, options);
  } else {
    //浏览器不支持geolocation
  }
};
/*实时*/
Location.prototype.showPosition = function(position){
	drawMap(position.coords.longitude,position.coords.latitude);
};
/*获取城市*/
Location.prototype.loadMapApi = function(longitude, latitude){
  var self = this;
  var oHead = document.getElementsByTagName('HEAD').item(0);
  var oScript= document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src="http://api.map.baidu.com/getscript?v=2.0&ak=A396783ee700cfdb9ba1df281ce36862&services=&t=20140930184510";
  oHead.appendChild(oScript);
  oScript.onload = function(date){
    var point = new BMap.Point(longitude, latitude);
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function(rs) {
      var addComp = rs.addressComponents;
      self.callback(addComp);
    });
  }
};
/*错误类型*/
Location.prototype.onError = function(error) {
  switch (error.code) {
    case 1:
      alert("位置服务被拒绝");
      break;
    case 2:
      alert("暂时获取不到位置信息");
      break;
    case 3:
      alert("获取信息超时");
      break;
    case 4:
      alert("未知错误");
      break;
  }
};
//==================初始化=======================
$(document).ready(function () {
	var local = new Location();
	local.getLocation();
	drawMap(longitude,latitude);
	//drawPlayer(104.02,30.715);
	drawMonster();
});