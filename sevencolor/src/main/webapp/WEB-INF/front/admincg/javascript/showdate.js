/*
* 时间处理工具函数
* */	   
//取得中文日期 
function chTime(param){ 	
  var myDate = new Date(param*1000);      
  return myDate.toLocaleDateString();	  
}
//取得当前年	
function getThisYear(param){
  var myDate = new Date(param*1000);
  return myDate.getFullYear()>9?myDate.getFullYear():("0"+myDate.getFullYear());
}	
//取得当前月	
function getThisMonth(param){
  var myDate = new Date(param*1000);
  var month = myDate.getMonth()+1;
  return month>9?month:("0"+month);
}	
//取得当前日	
function getThisDate(param){
//try{
	var myDate = new Date(param*1000);
	return myDate.getDate()>9?myDate.getDate():("0"+myDate.getDate());
//}catch(e){}
}	 	  
//取得当前小时	
function getThisHour(param){
  var myDate = new Date(param*1000);
  return myDate.getHours()>9?myDate.getHours():("0"+myDate.getHours());
}		  
//取得当前分钟
function getThisMinute(param){
  var myDate = new Date(param*1000);
  return myDate.getMinutes()>9?myDate.getMinutes():("0"+myDate.getMinutes());
}
//取得当前秒
function getThisSecond(param){
  var myDate = new Date(param*1000);
  return myDate.getSeconds()>9?myDate.getSeconds():("0"+myDate.getSeconds());	
}

/*
* 处理期号开始时间和结束时间
* */
function sellBegAndEndTime(){
var sellBegTime = $('sellBegTime').getAttribute('sellBegTime');
var sellEndTime = $('sellEndTime').getAttribute('sellEndTime');
$('sellBegTime').innerHTML=chTime(sellBegTime)+'&nbsp;&nbsp;'+getThisHour(sellBegTime)+'点'+getThisMinute(sellBegTime)+'分'+getThisSecond(sellBegTime)+'秒';
$('sellEndTime').innerHTML=chTime(sellEndTime)+'&nbsp;&nbsp;'+getThisHour(sellEndTime)+'点'+getThisMinute(sellEndTime)+'分'+getThisSecond(sellEndTime)+'秒';
}

//剩余时间调用	 	  
function startTime(stars){	  		    	
setInterval("activeTime()",1000);
}
//校准时间
_systemTime = (Math.floor(_systemTime) > 0 ) ? _systemTime : 0
var loadnow = new Date();
var cracktime = _systemTime - Math.floor(loadnow.getTime()/1000);	
/*
* 剩余时间
* sellEndTime,systemTime
**/
var upSec=0;

function activeTime(){
 _sellBegTime = (Math.floor(_sellBegTime) > 0 ) ? _sellBegTime : 0
 _sellEndTime = (Math.floor(_sellEndTime) > 0 ) ? _sellEndTime : 0
 _systemTime = (Math.floor(_systemTime) > 0 ) ? _systemTime : 0
 var openclosestr= (_openstart==1 ? "离停盘" : "离开盘")
 var upSec = _systemTime - _sellBegTime;
 if(upSec < 0){
	$('timeTag').innerHTML="<strong color='red'>已封盘，尚未开盘!</strong>";
	return false;
 }
 var restTime1 = _sellEndTime-_systemTime;
 _systemTime++;

 if($('timeTag')){

	if(_systemTime !=0 && restTime1>0){
		var restTime = restTime1/3600;
		var restHour = restTime % 24;	    
		var restDay = restTime / 24;
		var restMin = (restTime1%3600)/60;
		var restSec = (restTime1%3600)%60;    	
		$ ('timeTag').innerHTML=openclosestr+"时间："+(Math.floor(restDay)>0 ? Math.floor(restDay)+'天':'')+(Math.floor(restHour)>0?Math.floor(restHour)+'小时':'')+(Math.floor(restMin)>0?Math.floor(restMin)+'分':'')+Math.floor(restSec)+'秒';	
		 if(restTime1 < 0){
			$('timeTag').innerHTML="<strong color='red'>已封盘，尚未开盘!</strong>";//升级成功！
		 }
	 }else if( restTime1==0){
		 newsinfo();
	 }else if( restTime1<=0){
		$('timeTag').innerHTML="<strong color='red'>已封盘，尚未开盘!</strong>";
		
	 }else{
		$('timeTag').innerHTML="<strong color='red'>已封盘，尚未开盘!</strong>";
	}
 }
 
}
