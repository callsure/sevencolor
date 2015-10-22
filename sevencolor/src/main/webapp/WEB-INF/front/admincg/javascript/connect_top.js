var current_time;
var entrance_content = '';
var load_time = '';
var min = '';

function hit(i,u){
	load_time = new Date().getTime();
	document.getElementById('list_'+i).innerHTML = '<font color=#000000>'+(load_time - current_time)+min+'</font>';
	
	if(min!=''){
		top.location=u;min='';
		alert('系统自动分配最快线路成功！');
	}
	min = '';
}

function list() {

	min = ' <font color=red>最优 </font>';
	//var x=event.x+document.body.scrollLeft;
	//var y=event.y+document.documentElement.scrollTop;

	entrance_content = '';
	for (var i=0;i<dArr.length;i++){
		entrance_content = entrance_content + "&nbsp;&nbsp;<a href='"+dArr[i]+"/index.php?inter_username="+inter_username+"&inter_str="+inter_str+"' target='_top'><font color=blue>路线"+(i+1)+"</font></a> : ";
		entrance_content = entrance_content + "<span id='list_"+i+"'><font color='grey'>测试中</font></span><br>";
		current_time = new Date().getTime();
		entrance_content = entrance_content + "<img border=0 style='visibility:hidden' height=0 width=0 src='"+dArr[i]+"/"+Imgurl+"test2.gif?"+Math.random()+"' onload='hit("+i+",\""+dArr[i]+"/index.php?inter_username="+inter_username+"&inter_str="+inter_str+"\");'>";
	}
	document.getElementById('entrance_content_td').innerHTML = entrance_content;
	//document.getElementById("result_tb").style.pixelLeft = x;
	//document.getElementById("result_tb").style.pixelTop = y + 15;
	//document.getElementById('result_tb').style.display='block';
}
function close_connect(){
	document.getElementById('result_tb').style.display='none';
}