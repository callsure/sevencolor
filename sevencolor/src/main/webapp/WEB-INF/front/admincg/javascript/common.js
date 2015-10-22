/*
	$RCSfile: common.js,v $
	$Revision: 1.103 $
	$Date: 2008-5-24 09:16:52 $
*/
var lang = new Array();
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

function $(id) {
	return document.getElementById(id);
}

Array.prototype.push = function(value) {
	this[this.length] = value;
	return this.length;
}

function checkall(form, prefix, checkall) {
	var checkall = checkall ? checkall : 'chkall';
	for(var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if(e.name && e.name != checkall && (!prefix || (prefix && e.name.match(prefix)))) {
			e.checked = form.elements[checkall].checked;
		}
	}
}
function checkall2(form, prefix, checkall) {
	var checkall = checkall ? checkall : 'chkall';
	var olchecked=document.getElementsByName(prefix);
	for(var i=0;i<olchecked.length;i++) {
		var e = olchecked[i];
		if(e.name && e.name != checkall && (e.name==prefix)) {
			e.checked = form.elements[checkall].checked;
		}
	}
}
function doane(event) {
	e = event ? event : window.event;
	if(is_ie) {
		e.returnValue = false;
		e.cancelBubble = true;
	} else if(e) {
		e.stopPropagation();
		e.preventDefault();
	}
}

function fetchCheckbox(cbn) {
	return $(cbn) && $(cbn).checked == true ? 1 : 0;
}
var _ziyou=0;
function getcookie(name) {
	var name = _ziyou + "_" + name;
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}



function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}

function setcopy(text, alertmsg){
	if(is_ie) {
		clipboardData.setData('Text', text);
		alert(alertmsg);
	} else if(prompt('Press Ctrl+C Copy to Clipboard', text)) {
		alert(alertmsg);
	}
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function mb_strlen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
	}
	return len;
}

function setcookie(name,value)
{
   var argv=setcookie.arguments;
   var argc=setcookie.arguments.length;
   var expires=(2<argc)?argv[2]:getExpDate(1000,0,0);
   var path=(3<argc)?argv[3]:'/';
   var domain=(4<argc)?argv[4]:null;
   var secure=(5<argc)?argv[5]:false;
   document.cookie=_ziyou + "_" + name+"="+escape(value)+((expires==null)?"":("; expires="+expires))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
}
function getExpDate(days, hours, minutes)
{
	var expDate = new Date();
	if(typeof(days) == "number" && typeof(hours) == "number" && typeof(hours) == "number")
	{
		expDate.setDate(expDate.getDate() + parseInt(days));
		expDate.setHours(expDate.getHours() + parseInt(hours));
		expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
		return expDate.toGMTString();
	}
}
function strlen(str) {
	return (is_ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}

function updatestring(str1, str2, clear) {
	str2 = '_' + str2 + '_';
	return clear ? str1.replace(str2, '') : (str1.indexOf(str2) == -1 ? str1 + str2 : str1);
}

function toggle_collapse(objname, noimg) {
	var obj = $(objname);
	obj.style.display = obj.style.display == '' ? 'none' : '';
	if(!noimg) {
		var img = $(objname + '_img');
		img.src = img.src.indexOf('_yes.gif') == -1 ? img.src.replace(/_no\.gif/, '_yes\.gif') : img.src.replace(/_yes\.gif/, '_no\.gif')
	}
	var collapsed = getcookie('ziyou_collapse');
	collapsed =  updatestring(collapsed, objname, !obj.style.display);
	setcookie('ziyou_collapse', collapsed, (collapsed ? 86400 * 30 : -(86400 * 30 * 1000)));
}

function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}



function updatesecqaa() {
	var x = new Ajax();
	x.get('ajax.php?action=updatesecqaa&inajax=1', function(s) {
		$('secquestion').innerHTML = s;
	});
}

function _attachEvent(obj, evt, func) {
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(obj.attachEvent) {
		obj.attachEvent("on" + evt, func);
	}
}

function setInputSel(id){
	$(arguments[0]).className = arguments[1] + '_' + arguments[2];
}

function enter_keyCode(e){

	if(event.keyCode==13)event.keyCode=9;
}
var credits_use_js=0;
var credits_remaining=0;
var _isfpfrankhotzhuan=0;
/*function saveAward(number, money,my_frank,sizixian) {
	var my_Award_arr = new Array();

	var Award = number+','+money+','+(my_frank!=undefined ?my_frank:'')+','+frank.__ishotstat+','+sizixian;
	my_Award = getcookie('my_Award');
	my_Award_arr = my_Award.split('|');
	var len = my_Award_arr.length;
	//if (len>=(_waitnumber+1)) my_Award_arr.shift(my_Award_arr);
	my_Award_arr.push(Award);
	my_Award = my_Award_arr.join('|');

	if(my_Award!="")
	setcookie('my_Award', my_Award );
	

}

function getAward() {
	credits_use_js=0;
	setcookie('credits_use_js', 0 );
	my_Award = getcookie('my_Award');
	my_Award_arr = my_Award.split('|');
	var Award_html = '';
	//for(i=(my_Award_arr.length-1);i>0;i--) {
	if(my_Award_arr=="")return '';
	
	for(i=0;i<=(my_Award_arr.length-1);i++) {
		
		var game = my_Award_arr[i].split(',');
		if(game[0] != undefined && game[1] !=undefined){
			credits_use_js +=(game[1]-0);
			var hotcss='';
			if(game[3]>0)hotcss = ' class="soon_hot" ';
			var fp_html='',sizixian_html='';
			fp_html = _isfpfrankhotzhuan!=1 ? '<td class="soon_b_B">'+(game[2]!=undefined&&game[2]!=''?game[2]:"&nbsp;")+'</td>':"";
			sizixian_html=(game[4]==1?'<span style="color: red;width:15px;" id="showszx_'+i+'">现</span>':'');
			Award_html += '<table width="100%" border="0" cellpadding="0" cellspacing="0"  style="table-layout: fixed"><tr '+hotcss+'><td class="soon_b_B soon_b_f2">'+game[0]+''+sizixian_html+'</td>'+fp_html+'<td class="soon_b_B soon_b_f1">'+game[1]+'</td><td><a href="#" onclick="delAward('+i+');return false;">删除</td><tr></table>';
		}
	}
	setcookie('credits_use_js', credits_use_js );
	return Award_html;
			
}
var _waitnumber=0
var _cachehot=0
function getAward_array() {
	credits_use_js=0;
	setcookie('credits_use_js', 0 );
	var my_Award_arr =my_Award_new_arr = new Array();
	my_Award = getcookie('my_Award');
	if(my_Award!=""){
		my_Award_arr =  my_Award.split('|');
		my_Award_new_arr =  my_Award.split('|');
	}

	var len = Math.floor(my_Award_arr.length-1);
	var getlength=0;
	if (len >= _waitnumber){
		getlength = Math.floor(len - _waitnumber);
	}else{
		return false;
	}
	if(len==0 && _waitnumber==0){
		my_Award_arr['number_money']=get_number_award+","+get_money_award+","+get_sizixian;
		return my_Award_arr;
	}
	var comm=" ";
	my_Award_arr['number_money']="";
	for(i=0;i<=getlength;i++) {
		var game = my_Award_arr[i].split(',');
		if(game[0] != '' && game[1] !='' && game[0] != undefined && game[1] !=undefined){
			my_Award_new_arr.splice(0,1);
			my_Award_arr['number_money']+=comm+game[0]+","+game[1]+","+game[4];
			comm="|";
			credits_use_js +=(game[1]-0);
		}else{
			my_Award_new_arr.splice(0,1);
		}
		
	}
	setcookie('credits_use_js', credits_use_js );
	if(my_Award_new_arr!="" && _waitnumber>0){
		my_Award = my_Award_new_arr.join('|');
		setcookie('my_Award', my_Award);
	}else{
		setcookie('my_Award', '');
	}
	
	return my_Award_arr;
}


function delAward(delid) {
	var my_Award_arr = new Array();
	var my_Award_arr_new = new Array();
	my_Award = getcookie('my_Award');
	my_Award_arr = my_Award.split('|');
	my_Award_arr.splice(delid,1)
	my_Award = my_Award_arr.join('|');
	setcookie('my_Award', my_Award);
	my_Award_Parent();
}

function getAward_Rcedits_use() {
	if (window.parent.frames["menu"].$('my_rcedits_use')) {
		var credits_remaining_now = credits_remaining - credits_use_js;
		var get_rcedit_use=0;
		if(credits_remaining_now>0){
			get_rcedit_use=credits_remaining_now;
		}
		window.parent.frames["menu"].$('my_rcedits_use').innerHTML=get_rcedit_use;
	}
}

function my_Award_Parent(){
	if (window.parent.parent.frames["menu"].$('my_Award')) {
		var Award = getAward();
		window.parent.parent.frames["menu"].$('my_Award').innerHTML=Award;
	}
}*/

function KeyPressNumber(number){
	/*e = number||event; 
	if(e.keyCode == 88){
		e.keyCode =120;
		return true;
	}else if(e.keyCode == 43){
		e.keyCode =120;
		return true;
	 }else if(e.keyCode == 45){
		e.keyCode =120;
		return true;
	 }else if(e.keyCode == 42){
		e.keyCode =120;
		return true;
	 }
	if((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !=120&& e.keyCode !=13){
	alert(e.keyCode+"只可输入数字或字符(小写 X,请注意不要错按了大写键!)"); $('number').select();return false;
	}*/
}
function JHshNumberText()
{
if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) 
|| (window.event.keyCode == 13) || (window.event.keyCode == 46) 
|| (window.event.keyCode == 45)))
{
window.event.keyCode = 0 ;
}
} 

String.prototype.Trim = function(){
return this.replace(/(^\s*)|(\s*$)/g, "");
}
function hover1(obj){
	obj.className='hover1';
}
function hover2(obj){
	obj.className='hover';
}

function selecthover(color) { 
	alert(color.style.backgroundColor)
	  color.style.backgroundColor = color.style.backgroundColor=='#ececec'? '#ffffff':'#ececec';

	//obj.className=(obj.className=='hover3'?'':'hover3'); 
}
if(is_ie==6.0){
	try{document.execCommand("BackgroundImageCache", false, true);}catch(e){};
}
var _styles='';
var in_wapcg='';
/*document.oncontextmenu = function(e) {
    if ( e && e.button == 2 && e.preventDefault )
        e.preventDefault();
    else
        window.event.returnValue = false;
}
*/
function shotzhuan(n,s,y){
	num = $("allnum_"+s).value-0;
	if($("c_"+n).className=='trcolorodd'){
		$("c_"+n).className='';
		$("r_"+n).className='';
		$("n_"+s+"_"+n).value='';
		$("allnum_"+s).value=num>0?num-1:0;	
	}else{
		if(num>9){
			alert("选择的数量不能超出10！");
			return false;
		}
		$("n_"+s+"_"+n).value=y!='n'?y:n;
		$("c_"+n).className='trcolorodd';
		$("r_"+n).className='trcolorodd';
		$("allnum_"+s).value=num+1;
	}
}

function inputlimit(obj,s){
	if(s==1){
		obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
		obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是.   
		obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.   
		obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");	
	}else if(s==2){
		obj.value = obj.value.replace(/[^\d]/g,"");  //清除“数字”以外的字符   
	}
}
function loadIf(t,s){
	if(is_ie==false){
		if(s==1)
		t.style.height=document.body.clientHeight-95;
		else
		t.style.height=document.body.clientHeight;
	}
}

function updateseccode() {
	//alert('dd'))
	type = seccodedata[2];
	var rand = Math.random();

	if(type == 2) {
		$('seccodeimage').innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + seccodedata[0] + '" height="' + seccodedata[1] + '" align="middle">'
			+ '<param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="seccode.php?update=' + rand + '" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="bgcolor" value="#ffffff" />'
			+ '<embed src="seccode.php?update=' + rand + '" quality="high" wmode="transparent" bgcolor="#ffffff" width="' + seccodedata[0] + '" height="' + seccodedata[1] + '" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
	} else {

		$('seccodeimage').innerHTML = '<img id="seccode" onclick="updateseccode()" width="' + seccodedata[0] + '" height="' + seccodedata[1] + '" src="seccode.php?update=' + rand + '" class="absmiddle" alt="" />';
		$('seccodeverify').focus();
	//alert(type+"w"+seccodedata[0]+"q"+seccodedata[1]+"w"+rand)
	}
}

/*function loadJs(file){	
	var scriptTag = document.getElementById('loadScript');	
	var head = document.getElementsByTagName('head').item(0);	
	if(scriptTag) head.removeChild(scriptTag);	
	script = document.createElement('script');	
	script.src = file;	
	script.type = 'text/javascript';
	script.id = 'loadScript';
	head.appendChild(script);
}*/