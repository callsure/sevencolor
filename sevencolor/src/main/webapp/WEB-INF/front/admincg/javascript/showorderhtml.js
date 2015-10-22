function FloatAdd(arg1,arg2){  
var r1,r2,m;  
try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
m=Math.pow(10,Math.max(r1,r2))  
return (arg1*m+arg2*m)/m;
}
function writeObj(obj){ 
    var description = ""; 
    for(var i in obj){   
        var property=obj[i];   
        description+=i+" = "+property+"\n";  
    }   
    alert(description); 
} 
function showhtml(json){
	_timestamp = json['d'];
	_tuimatime = json['t'];
	_tuimamode = json['m'];
	IN_WAPCG = in_wapcg;
	w1 = '12%';w2 = '22%';w3 = '16%';w4 = '15%';w5 = '15%';w6 = '10%';w7 = '10%';
	if(IN_WAPCG==1){
		ordernum=2;
		w1 = '';w2 = '';w3 = '35%';w4 = '30%';w5 = '35%';w6 = '';w7 = '';
	}
	var h='';
	h = '<form method="post" name=datamembers action="./index.php?action=ordertuima&doactionsend=soonorder">'
	+'<input type="hidden" name="formhash" value="'+_FORMHASH+'">'
	+'<input type="hidden" name="ordertuima_del" >';
	h+= '<table width="100%" style="border:none" border="0" cellpadding="0" cellspacing="0" class="soon_b_no" style="table-layout: fixed">';

	var i=0;
	var getgj=json['j'];
	var gj='';
	
	if(OldOrder==''){//第一次进入
		if(getgj!=''&&getgj!=null)OldOrder=getgj;
		gj=getgj;
		//alert('1='+OldOrder.length)
	}else{
		if(getgj==null||getgj==''){
			return false;//快打没有号码下注成功返回
		}else{
			if(OldOrder.length>=_ordernum)OldOrder.shift();
			if(getgj!=''&&getgj!=null){
				OldOrder = OldOrder.concat(getgj)
				//Array.prototype.push.apply(OldOrder, getgj);  
			}
			gj = OldOrder ;
		}
		
	}
	if(gj==null||gj==''){
		
	}else
	if(gj.length>_ordernum){
		var newArray=gj.slice(-10); 
		gj=newArray;
		OldOrder=newArray;
	}
	for ( var j in gj) {  
		val=gj[j];
		if(val['stattuima']==1){
			class1 ='class="soon_tuima"';
			tuima ="--";
			msg="退码";
		}else{
			msg="成功";
			class1 =(val['hotstat']==1 ? 'class="soon_hot"':'');
			if(_tuimamode==1){
			tuima =(( _timestamp - _tuimatime) > val['datetime'] || val['yicangprint']==1||val['yicangread']==1)   ? '--':"<input type=\"checkbox\" name=\"idarray[]\" value=\""+val['id']+"\" class=\"checkbox\" >";
			}else{
			tuima =((( _timestamp - _tuimatime) > val['datetime'] || val['yicangprint']==1||val['yicangread']==1)   ? '--':"<a href=\"javascript:void(0)\"  onclick=\"javascript:if(window.confirm('确定退掉该号码吗?')){ window.parent.parent._OldOrderPrint=[];location.href='index.php?action=ordertuima&doactionsend=soonorder&idarray="+val['id']+"'; }else{ return;} return false;\"><font style='color:#009900'>退码</font></a>"); 
			}
		}
		statsizi = val['statsizi']==1 || val['classid']==6 || val['classid']==7 ? "<span class=\"soon_b_f3\">现</span>":"";
		
		if (i==0){
			h+= '<tr class="soon_head" style="height:100%;line-height:23px;" >';
			if(IN_WAPCG!=1){h+= '<td width="'+w1+'">彩种</td><td width="'+w2+'">注单编号</td>';}
			h+= '<td width="'+w3+'">号码</td><td width="'+w4+'">赔率</td><td width="'+w5+'">金额</td>';
			if(IN_WAPCG!=1){h+= '<td width="'+w6+'">状态</td>';
			h+= '<td width="'+w7+'" >';
			if(_tuimamode==1){
				h+= '全选<input type="checkbox" name="chkall" onclick="checkall(this.form, \'idarray\')" class="checkbox">';
				h+= '<input class="button" style="padding: 0 1px;line-height: 22px;;height: 22px;height: 22px !important;" type="button" name="ordertuima_del_button" onclick="if(checkempty(this.form, \'idarray\')){window.parent.parent._OldOrderPrint=[];this.disabled=true;datamembers.ordertuima_del.value=\'ordertuima_del\';datamembers.submit();}" value="退码">';
			}else{ h+='操作';}}
			h+= '</td><tr>';	
		}
		h+= '<tr '+class1+' style="height:28px;line-height:19px;">';
			if(IN_WAPCG!=1){h+= '<td >七星彩</td><td >'+val['orderid']+'</td>';}
			h+= '<td class="soon_b_B soon_b_f2">'+val['number']+' '+statsizi+'</td><td  class="soon_b_B">'+val['frank']+'</td><td  class="soon_b_B soon_b_f1">'+val['money']+'</td>';
			if(IN_WAPCG!=1){h+= '<td >'+msg+'</td><td >'+tuima+'</td>';}
		h+= '</tr>';
		i++;
	}
		if (i < _ordernum){
			for (i;i< _ordernum;i++){
				h+='<tr  style="height:28px;line-height:19px;">';
				if(IN_WAPCG!=1){h+='<td></td><td >--</td>';}
				h+='<td class="soon_b_B soon_b_f2">--</td><td class="soon_b_B">--</td><td class="soon_b_B soon_b_f1">--</td>';
				if(IN_WAPCG!=1){h+='<td>--</td><td>--</td>';}
				h+='</tr>';
			}
		}
		h+= '</table></form>';
	return h;
}
function setprint(){
	//window.parent.parent._OldOrderPrint=[];
	setcookie("my_print", "1");
	if(navigator.userAgent.indexOf('Firefox') >= 0){
	window.print();//在IE11上会小，只在火狐上用
	}else{
	document.execCommand("print", false, null);
	}
	setprintselect();
}
function setprintselect(){
	if(window.parent.frames["main"].frames["soonorder"])window.parent.frames["main"].frames["soonorder"].$("number").select();	
}
function location_href(){
	window.location.href="index.php?action=left";
}
function setOut(){
	setTimeout("location_href();",600);
}

function set_order_print(joinstr,sTemp2,obj){

   //var joinstr = eval('('+arr+')');
	str=joinstr['p'];
	_orderid=str['o'];
	_oid=str['oid'];
	_datetime=str['d'];
	_user=str['u'];
	_sid=str['s'];
	_issueno_now=str['i'];
	_tradstat=str['t'];
	_mysendmode=str['m'];
	setwidth=_tradstat==1?'181':'178';
	_oidstr=_oid>0?'&oid='+_oid:'&orid='+_orderid;
	html='';
	onclick1='';onclick2='';onclick3='';
	//if(_mysendmode==1&&_tradstat==0){
		onclick1='XMLHttp.sendReq("GET","ajax.php?action=soonprintstat","sid='+_sid+'&inajax=1",post_selectMsg,""); ';
		
		onclick2=' <input  class="Noprint"  type=button value="清 空" style="height:20;width=60" onclick=\''+onclick1+'setOut();\' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	//}
	
	html += '<table width="'+setwidth+'" border="0" style="padding:1px 1px 1px 0px;background: #FFFFFF;" border: 0px solid #4b9ecc;" cellpadding="0" cellspacing="0" align=left>';
	html += '<tr><td >';
	//html += '<OBJECT id="WebBrowser" classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 height=0 width=0 class="Noprint"></OBJECT>';
	//html += '<input type=button value="页面设置" name="printset" id="printset" class="Noprint" onclick="WebBrowser.ExecWB(8,1);">';
	//html += '<input type=button value="打印预览" name="printpre" id="printpre" class="Noprint" onClick="WebBrowser.ExecWB(7,1);">';
	html += '<input type=button value="设置图示" name="printpre" id="printpre" class="Noprint" onClick="parent.main.location=\'index.php?action=membersetprint\';">';
	html += '';
	html += '<table width="170" border="0" cellspacing="0" cellpadding="0">'; 
	html += '<tr><td style="text-align:right;font-size:15px;">单位：元</td></tr>';
	html += '</table>';
	
	html += '<table  align="center" width="'+setwidth+'" cellpadding="0" cellspacing="0" class="tablebprint4" style="margin-bottom: 2px !important;">';
	html += '  <tr><td colspan=3 class="print2" style="text-align:center;color:red;"><b>七星彩</b></td></tr>';
	html += '  <tr><td colspan=3 class="print3">时间:'+_datetime+'<br>会员:'+_user+'<br>编号:'+_orderid+'</td></tr>';
	html += '  <tr class="print2"><td style="text-align:center;">号码</td><td style="text-align:center;">赔率</td><td style="text-align:center;">金额</td>';
	i=0;allmoney=0;
	var getgj=str['j'];
	var newstat=joinstr['s'];
	var pages=joinstr['pages'];
	var pagenum=str['n'][0];
	var gj='';
	
	if(pages>0){
			gj=getgj;		
	}else{//没点击分页显示
		if(pagenum==1&&joinstr['j']!=null)window.parent.parent._OldOrderPrint=[];
		if(newstat==0){ //转
			window.parent.parent._OldOrderPrint=getgj;
			gj=getgj;
		}else{
			var OldOrderPrint = window.parent.parent._OldOrderPrint;
			if(getgj==0){
				getgj=joinstr['j'];//获取单个快打显示
				
			}
			if(typeof OldOrderPrint == 'undefined' || OldOrderPrint.length==0){
				window.parent.parent._OldOrderPrint=getgj;
				gj=getgj;
			}else{
				if(getgj==null||getgj=='')return false;
				getNewOrder=joinstr['j'];
				if(getNewOrder==null||getNewOrder=='')return false;
				//OldOrderPrint = OldOrderPrint.concat(getNewOrder);
				Array.prototype.push.apply(OldOrderPrint, getNewOrder);  
				gj = OldOrderPrint ;
				window.parent.parent._OldOrderPrint=OldOrderPrint;
			}
		}
	}
	var nummoney=str['n']
	var strid='';
	var comm='';
	for ( var j in gj) {
		val=gj[j];
		if(val['stattuima']==1)continue;	
		statsizi = val['statsizi']==1  || val['classid']==6 || val['classid']==7 ? "<span class=\"soon_b_f3\" style=\"FONT-SIZE:15px;color:red;\">现</span>":"";
		/*html += '    <tr class="print2"> ';
		html += '       <td>'+val['number']+statsizi+'</td><td>1:'+val['frank']+'</td><td>'+val['money']+'</td>';
		html += '      </tr>  ';*/
		html += '    <tr bgcolor="#ffffff" class="print2"  style="height:28px;line-height:19px;"> ';
		html += '       <td style="text-align:center;">'+val['number']+statsizi+'</td><td style="text-align:center;">1:'+val['frank']+'</td><td style="text-align:center;">'+val['money']+'</td>';
		html += '      </tr>  ';
		i++;
		strid+=comm+val['id'];
		comm=',';
		allmoney = FloatAdd(allmoney,(val['money']-0));		
	}
	onclick3=' XMLHttp.sendReq("GET","ajax.php?action=memberprintstat'+_oidstr+'&strid='+strid+'","sid='+_sid+'&inajax=1",post_selectMsg,""); ';
	html += '   <tr class="print5">';
	html += '    <td colspan=3 >笔数'+i+' 总金额'+allmoney+'</td>';
	html += '  </tr>'; 
	html += '  <tr>';
	html += '    <td align=center style="text-align:center;" class="Noprint" colspan=3 >';
	html += '        '+onclick2;
	html += ' <input  class="Noprint" name="numprint" id="numprint"  type=button value="打 印" style="height:20;width=60" onclick=\'if(getcookie("my_print")==1){if(window.confirm("你已经打印过该票，还要打印吗？")){setprint();'+onclick3+'}else{ setprintselect();return;} }else{ setprint();'+onclick3+'}\';></td>';//'+onclick1+'
	html += '     </tr>';
	html += '</table><span style="font-size:15px;">第'+_issueno_now+' 期,3天內有效!!</span>';
	html += '	</td><tr>';
	if(sTemp2!=''){
	html += '<tr class="Noprint" ><td style="font-size:15px;" colspan=3><b>总笔数<font color=red>'+nummoney[0]+'</font> 总金额<font color=red>'+nummoney[1]+'</font><b></td><tr>';
	html += '<tr class="Noprint" ><td style="font-size:15px;" colspan=3>'+sTemp2+'</td><tr>';
	}
	html += '</table> ';

	return html;
}

function showprint(arr){
	joinstr = eval('('+arr+')');
	iniPage(0,joinstr,'');
	//$("showorderhtml").innerHTML=order_print(str);
	//var num=str['p']['n'][0];
}
function PrintPageAjax(url, vars, iCurrPage ,callbackFunction){
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
  request.open("GET", url, true); 
  request.onreadystatechange = function(){
    if (request.readyState == 4 && request.status == 200){
      if (request.responseText){         
          callbackFunction(iCurrPage,eval('('+request.responseText+')'),'');
      }
    }
  };
  request.send(vars);
}
function PrintPage(p){
	PrintPageAjax("./ajax.php?action=printshow&iCurrPage="+p,"inajax=1",p,iniPage);
}
function IssuenoLogPage(p){
	PrintPageAjax("./wap_ajax.php?action=issuenologpage&page1="+p,"inajax=1",p,IssuenoLogIniPage);
}
function IssuenoLogIniPage(iCurrPage,joinstr,obj){
	//alert(joinstr)
	//var join = eval('('+joinstr+')');
	
	var html = IssuenoLoghtml(joinstr);
	if(obj=='')$("showissuenohtml").innerHTML=html;
}
function iniPage(iCurrPage,joinstr,obj)
{

 var iPageSize = 500;
 var iProCount = joinstr['p']['n'][0];
 var b = ((iProCount%iPageSize)!=0);
 var iPageCount = parseInt(iProCount/iPageSize)+(b?1:0);//页
 if(iCurrPage==0)iCurrPage=iPageCount;
 if (iCurrPage > iPageCount) return false;
 iCurrPage = parseInt(iCurrPage);
 var sTemp2='';var statPage=0;endPage=0;
 if(iPageCount==1){
 
 }else if(iPageCount>1){
     //statPage = iCurrPage>0 ? ((iCurrPage-1)*iPageSize):1;
     //endPage = iCurrPage > 0 && iCurrPage != iPageCount ? iCurrPage * iPageSize:iProCount;
	 sTemp2 += "第";
	 for(var i=1;i<=iPageCount;i++){
	 	var css= (iCurrPage==i?"class=meunpage":"");
		sTemp2 += " <a href='Javascript:PrintPage("+i+")' "+css+">["+i+"]</a>";
	 }
	 sTemp2 += " 页";
 }

 if(obj==''){
	var gethtml = set_order_print(joinstr,sTemp2,obj);
	if(gethtml!=false)
 	$("showorderhtml").innerHTML=gethtml;
 }else{ 
	var gethtml = set_order_print(joinstr,sTemp2,obj);
	if(gethtml!=false)
 	obj.$("showorderhtml").innerHTML=gethtml;
 }
 setTimeout("window.document.body.scrollTop=window.document.body.scrollHeight;",300);
 //$("pageDir").innerHTML=sTemp2;
}
function IssuenoLoghtml(json){
	_mysendmode=json['m'];
	_tradstat=json['t'];
	var gj=json['l'];
	var pageurl=json['p'];
	var nummoney=json['n'];
	html='';tatolmoney=0;
	if(in_wapcg==1){
		var iPageCount=json['c'];
		i=1;tatolmoney=0;sbr='';
		for ( var j in gj) { 	
			val=gj[j];
			if(i>=4){ sbr='<br>';i=0;}
			//tatolmoney +=val['money']-0;
			tatolmoney = FloatAdd(tatolmoney,(val['money']-0));
			statsizi = val['statsizi']==1 || val['classid']==6 || val['classid']==7? "<span class=\"soon_b_f3\">现</span>":"";
			html +=val['number']+'='+val['money']+statsizi+'&nbsp;'+sbr;
			sbr='';
			i++;
		}
		html += '合计:'+tatolmoney+' ';
		if(pageurl!=''&&pageurl!=null){
		html +='<br>总笔数:'+nummoney[0]+'&nbsp;&nbsp;总金额:'+nummoney[1]+'';
		html +='<br>&nbsp;&nbsp;第 '+pageurl+' 页';
		}
		/*if(iPageCount>1){
			html +='<br>总笔数:'+nummoney[0]+'&nbsp;&nbsp;总金额:'+nummoney[1]+'';
			var sTemp2 = "第";
	 		for(var i=1;i<=iPageCount;i++){
	 			//var css= (iCurrPage==i?"class=meunpage":"");
				sTemp2 += " <a href='Javascript:PrintPage("+i+")' "+css+">["+i+"]</a>";
			}
			 sTemp2 += " 页";
			html +='<br>'+sTemp2+'';
		}*/
		return html==''?0:html;
	}
	if(_mysendmode==1 && _tradstat==1){
		html += '<table width="100%" style="border:none;border:1px;" align=center border="0" cellpadding="0" cellspacing="0"  style="table-layout: fixed">';
		
		i=1;tatolmoney=0;
		html += '<tr>';
		for ( var j in gj) { 	
			val=gj[j];
			if(val['delstat']==1)continue;
			statsizi = val['statsizi']==1 || val['classid']==6 || val['classid']==7? "<span class=\"soon_b_f3\">现</span>":"";
			class1 =(val['hotstat']==1 ? 'soon_hot':'');
			class2 =(val['delstat']==1 ? 'soon_tuima':'');
			html += '<td class="soon_b_B soon_b_f1 '+class1+' '+class2+'" style="width:14.5%;height:28px;line-height:19px;">';
			if(val['delstat']==0||val['delstat']==undefined)html += '<input type="checkbox" name="idarray[]" value="'+j+'-'+val['id']+'" class="checkbox">';
			html += val['number']+statsizi+'='+val['money']+'</td>';
			if (i==7){html += '</tr><tr>';i=0;}
			i++;
			//tatolmoney+=val['money']-0;
			tatolmoney = FloatAdd(tatolmoney,(val['money']-0));
		}
		for (i;i<=7;i++){
		 	html += '<td class="soon_b_B soon_b_f1 " style="width:14.5%;height:28px;line-height:19px;"></td>';
		}
		html += '<tr><td class="soon_b_B soon_b_f1" style="height:28px;line-height:19px;text-align:left;border-top:1px solid #000000" colspan=8>&nbsp;&nbsp;&nbsp;&nbsp;合计:'+tatolmoney+'</td></tr> ';

		html += '</table>';
	}else{
		i=1;
		//var menu_isseuno= {1:'超出4位',2:'号码出错',3:'没有号码',4:'信用不足',5:'没有号码',6:'超出单注最高',8:'超出单项最高',9:'下注金额不能低于',10:'用户缓存出错',11:'下注金额多出',12:'不能带小数点',13:'不能超出小数点位数',14:'单项大于上级单项',15:'未定义出错'};

		html += '<table width="100%" style="border:none" border="0" cellpadding="0" cellspacing="0" class="soon_b_no" style="table-layout: fixed">';
		for ( var j in gj) { 	
			val=gj[j];
			if(val['delstat']==0||val['delstat']==undefined){
				//tatolmoney +=val['money']-0; 
				tatolmoney = FloatAdd(tatolmoney,(val['money']-0));
			}else continue;
			
			statsizi = val['statsizi']==1 || val['classid']==6 || val['classid']==7? "<span class=\"soon_b_f3\">现</span>":"";
			class1 =(val['hotstat']==1 ? 'class="soon_hot"':'');
			class2 =(val['delstat']==1 ? 'class="soon_tuima"':'');
			html += '<tr '+class1+' '+class2+' title="'+val['datetime']+'" style="height:28px;line-height:19px;">'
				+'<td width="22%" class="soon_b_B soon_b_f2">'+val['number']+statsizi+'</td>'
				+'<td width="25%" class="soon_b_B soon_b_f1">'+val['money']+'</td>'
				+'<td width="23%">';
			    if(val['delstat']==1)html +='--'; else html +='<input type="checkbox" name="idarray[]" value="'+j+'-'+val['id']+'" class="checkbox">';
			html +='</td></tr>';
			//tatolmoney +=val['money'];
			i++; 
		}
	
		html +='<tr style="height:28px;line-height:19px;"><td class="soon_b_B " colspan=3 style="text-align:left;height:28px;line-height:19px;">&nbsp;&nbsp;笔数:'+(i-1)+'&nbsp;&nbsp;总金额:'+tatolmoney+'</td></tr>';
		if(pageurl!=''&&pageurl!=null){
		html +='<tr style="height:28px;line-height:19px;"><td class="soon_b_B " colspan=3 style="text-align:left;height:28px;line-height:19px;">&nbsp;&nbsp;总笔数:'+nummoney[0]+'&nbsp;&nbsp;总金额:'+nummoney[1]+'</td></tr>';
		html +='<tr ><td class="soon_b_B " colspan=3 style="text-align:left;height:38px;line-height:19px;">&nbsp;&nbsp;第 '+pageurl+' 页</td></tr>';
		}
		html += '</table>';
	}

	return html;
}
