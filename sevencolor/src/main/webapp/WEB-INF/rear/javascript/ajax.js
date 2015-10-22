var XMLHttp = {
    _objPool: [],
    _getInstance: function ()
     {
         for (var i = 0; i < this._objPool.length; i ++)
         {
             if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4)
             {
                 return this._objPool[i];
             }
         }
        // IE5中不支持push方法
        this._objPool[this._objPool.length] = this._createObj();
         return this._objPool[this._objPool.length - 1];
     },
    _createObj: function ()
     {
         if (window.XMLHttpRequest)
         {
             var objXMLHttp = new XMLHttpRequest();
         }
         else
         {
             var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
             for(var n = 0; n < MSXML.length; n ++)
             {
                try
                {
                     var objXMLHttp = new ActiveXObject(MSXML[n]);
                     break;
                 }
                catch(e)
                 {
                 }
             }
          }          
        // mozilla某些版本没有readyState属性
        if (objXMLHttp.readyState == null)
         {
            objXMLHttp.readyState = 0;
            objXMLHttp.addEventListener("load", function ()
                 {
					
                    objXMLHttp.readyState = 4;
                     if (typeof objXMLHttp.onreadystatechange == "function")
                     {
                        objXMLHttp.onreadystatechange();
                     }
                 },  false);
         }
         return objXMLHttp;
     },
	showLoading : function() {
		if(this.objname && (this._getInstance().readyState != 4 || this._getInstance().status != 200)) {
	
			$(this.objname).innerHTML = '<span><img src="' + IMGDIR + '/loading.gif">  Loading... </span>';
		}
	},
	objname:null,

   // 发送请求(方法[post,get], 地址, 数据, 回调函数)
    sendReq: function (method, url, data, callback,id)
     {
        
		var objXMLHttp = this._getInstance();
        with(objXMLHttp)
         {
            try
            {

                // 加随机数防止缓存
                if (url.indexOf("?") > 0)
                 {
                    url += "&randnum=" + Math.random();
                 }
                 else
                 {
                    url += "?randnum=" + Math.random();
                 }
				this.objname=id;
				//setTimeout(function(){XMLHttp.showLoading()}, 500);
                open(method, url, true);
                
                // 设定请求编码方式
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                send(data);
                onreadystatechange = function ()
                 {
                     if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304))
                     {
                        callback(objXMLHttp,id);
                     }else{
						// $(id).innerHTML = '<span>Loading... </span>';
					 }
                 }
             }
            catch(e)
             {
                alert(e);
             }
         }
     }
}; 
function post_selectMsg(str,id){

}
function post_soonMsg_trad(str,id){
	
}
var _styles = '',htmlstrnum=1;
function post_soonMsg(str,id){
	var arr = str.responseText;
	var s_arr = arr.split("!@#%");
	var erroe = s_arr[0];	
	var htmlstr = s_arr[1];
	_styles = s_arr[10];
	_sendmode = s_arr[11];
	//if(htmlstrnum==1){ htmlstr=undefined;}
	//setcookie("my_print", "");
	if(htmlstr==undefined){
		if(htmlstrnum==3){
			setcookie('my_Award', '');
			htmlstr="登录超时，请返回重新登录!!"+htmlstrnum;
			alert(htmlstr)
			window.parent.location.href='index.php?action=logout'			
		}else{
			//htmlstr="登录超时!"+htmlstrnum;
			//alert(htmlstr)
			XMLHttp.sendReq("POST","ajax.php?action=resetOrder","inajax=1",post_soonMsg,"showorderhtml");
		}
		htmlstrnum++;
		return;
	}else if(erroe==4){ 
		setcookie('my_Award', '');
		alert(htmlstr)
		window.parent.location.href='index.php?action=logout'
		//showorderhtml(htmlstr);
		return;
	}else if(erroe==5){ 
		alert(htmlstr);return ;
	}
	htmlstrnum=1;
	//_waitnumber = Math.floor(s_arr[2]);
	//if((_styles!='v2_trad_1'&&_styles!='v2_trad'&&_styles!='trad')&&_sendmode==0&&in_wapcg!=1)showwaitnumbernn(_waitnumber);
	if(erroe==1){
		showissuenohtml(htmlstr)
	}else if(erroe==2){
		showissuenohtml(s_arr[3])
		showorderhtml(htmlstr,s_arr[8],s_arr[9]);
	}else{
		showorderhtml(htmlstr,s_arr[8],s_arr[9]);
	}
	if(s_arr[4]!=0){
		eval("_cachehot = "+s_arr[4]+";");
	}
	//var returnnumber=s_arr[10];//返回号码
	//setreturnnumber(returnnumber);
	rcedits(s_arr[5],s_arr[6],s_arr[7])

}
var _chuhuo_styles='',chuhuohtmlstrnum=1;
function post_chuhuoMsg(str,id){
	var arr = str.responseText;
	var s_arr = arr.split("!@#%");
	var erroe = s_arr[0];	
	var htmlstr = s_arr[1];
	_chuhuo_styles = s_arr[10];
	_sendmode = s_arr[11];
	//if(htmlstrnum==1){ htmlstr=undefined;}
	if(s_arr[0]==101){
		alert("出货金额不能大于实货金额"+s_arr[14])
	}else if(htmlstr==undefined){
		if(chuhuohtmlstrnum==3){
			htmlstr="登录超时，请返回重新登录!!"+htmlstrnum;
			alert(htmlstr)
			window.parent.location.href='index.php?action=logout'			
		}
		chuhuohtmlstrnum++;
		return;
	}else if(erroe==4){ 
		alert(htmlstr)
		window.parent.location.href='index.php?action=logout'
		return;
	}else if(erroe==5){
		alert(htmlstr);return ;
	}else if(erroe==6){
		alert(htmlstr);window.close();return false;
	}
	chuhuohtmlstrnum=1;
	$("showorderhtml").innerHTML=htmlstr;
	

}

var chuhuo_money_total_all=0;
function showchuhuomoney(obj,id){//开服过后显示状态
	var str = obj.responseText.split('!@#%');
	if(str[1]){
		document.getElementById("chuhuo_money_total"+id).innerHTML=str[1];
		if(document.getElementById("chuhuo_bishu_total"+id))document.getElementById("chuhuo_bishu_total"+id).innerHTML=str[2];
		chuhuo_money_total_all=(chuhuo_money_total_all-0)+(str[1]-0);
		
	}else if(str[0]==0){
		document.getElementById("chuhuo_money_total"+id).innerHTML="统计失败";
	}
}
function chuhuo_money_total_all_func(){
	if(document.getElementById("chuhuo_money_total_all_1"))document.getElementById("chuhuo_money_total_all_1").innerHTML=chuhuo_money_total_all;
}

function showorderhtml(arr,s_arr8,s_arr9){
	var str = eval('('+arr+')');
	if(in_wapcg!=1&&_sendmode==1&&(_styles=='trad'||_styles=='v2_trad'||_styles=='v2_trad_1')){//2组风格左边打印部分
		var objmenu = window.parent.parent.frames["menu"];
		if(objmenu){
			//objmenu.$("showorderhtml").innerHTML=order_print(str);
			iniPage(0,str,objmenu);
		}		
	}else{
		var objmain = in_wapcg!=1 ? window.parent.frames["main"] : false;
		//var str_left = str.split('@@@');
		//str = str_left[0];
		if(objmain){
			var objorder = objmain.frames["soonorder"];
			if(objorder){
				var gethtml = showhtml(str);
				if(gethtml!=false)
				objorder.$("showorderhtml").innerHTML=gethtml;
				objorder.CountMoney._show();//更新计算器
				objorder.$('number').select();
				objorder.$("countnum").innerHTML=s_arr8>0 ? s_arr8 : 0;
				objorder.$("countmoney").innerHTML=s_arr9>0 ? s_arr9 : 0;			
			}
		}else{
			var gethtml = showhtml(str);
			if(gethtml!=false)
			$("showorderhtml").innerHTML=gethtml;
			//CountMoney._show();//更新计算器
			$("countnum").innerHTML=s_arr8>0 ? s_arr8 : 0;
			$("countmoney").innerHTML=s_arr9>0 ? s_arr9 : 0;			
		}
		if(in_wapcg!=1){//1组风格左边打印部分
			var objmenu_left = window.parent.parent.frames["menu"].$("showorderhtml");
			if(objmenu_left){	
				//objmenu_left.innerHTML=order_print(str);
				iniPage(0,str,window.parent.parent.frames["menu"]);			
			}
		}
	}
}
function rcedits(leavings,use,now){
	if(in_wapcg==1){
		$("my_rcedits_use").innerHTML=use;
		$("my_credits_remaining").value=leavings;
	}else{
	var objmenu = window.parent.parent.frames["menu"];
	if(objmenu){
		objmenu.$("my_rcedits_leavings").innerHTML=leavings;
		objmenu.$("my_rcedits_use").innerHTML=use;
		objmenu.$("my_rcedits").innerHTML=now;
		objmenu.document.body.scrollTop=objmenu.document.body.scrollHeight;
	}
	var objmain = window.parent.parent.frames["main"];
	if(objmain){
		if(objmain.frames["soonorder"]){
			objmain.frames["soonorder"].$("my_credits_remaining").value=leavings;
		}
	}
	}
}
function showissuenohtml(arr){
	if(arr==''||arr==null)return false;//没有亭压 则停止
	var str = eval('('+arr+')');
	if(in_wapcg!=1){
	if(window.parent.frames["soonnotsucceed"]){
		window.parent.frames["soonnotsucceed"].$("showissuenohtml").innerHTML=IssuenoLoghtml(str);
	}else if(window.parent.frames["main"]){
		if(window.parent.frames["main"].frames["soonnotsucceed"]){
			window.parent.frames["main"].frames["soonnotsucceed"].$("showissuenohtml").innerHTML=IssuenoLoghtml(str);
		}
	}
	}else{
		if(str!=0)
		$("showissuenohtml").innerHTML=IssuenoLoghtml(str);
	}
}
/*function showwaitnumbernn(waitnumber){
	if(waitnumber>0){
		waitsendstr('');
		soonsendstr("发送到待<br>下注号码");
	}else{
		waitsendstr('none');
		soonsendstr("确认下注");
	}
}*/
function soonsendstr(str){
	if(window.parent.frames["main"]){
		if(window.parent.frames["main"].frames["soonorder"]){
			window.parent.frames["main"].frames["soonorder"].$("soonsendstr").innerHTML=str;
			//window.parent.frames["main"].frames["soonorder"].$("soonsendstr").innerHTML="发送到待<br>下注号码";
		}
	}else{
		$("soonsendstr").innerHTML=str;
		//$("soonsendstr").innerHTML="发送到待<br>下注号码";
	}
}
function waitsendstr(str){
	if(window.parent.parent.frames["menu"]){
		window.parent.parent.frames["menu"].$("waitsendstr").style.display=str;
	}
}

/*function setreturnnumber(n){
	var my_Award_arr =my_Award_new_arr = new Array();	
	var gn = n.split('|');

	my_Award = getcookie('my_Award');
	if(my_Award!=""){
		my_Award_arr =  my_Award.split('|');
	}
	var len = Math.floor(my_Award_arr.length-1);

	if(_waitnumber<=len){
		for(i=0;i<=len;i++) {
			var game = my_Award_arr[i].split(',');
			var isn=true;
			for(j=0;j<= Math.floor(gn.length-1);j++) {
				if(gn[j]=='')continue;
				if(gn[j]==game[0]){isn=false;gn[j]=gn[j]+"0";break;}
			}
			Award='';
			if(isn&&game[0]!=''&&game[1]!=undefined){
				Award= game[0]+','+game[1]+','+game[2]+','+game[3];
				my_Award_new_arr.push(Award);
			}
		}
	}
	my_Award = my_Award_new_arr.join('|');
	if(my_Award!=""){
		setcookie('my_Award', my_Award );
		my_Award_Parent();//刷新
	}
}*/