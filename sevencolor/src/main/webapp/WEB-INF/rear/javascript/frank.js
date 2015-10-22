function ajax_f(url, vars, callbackFunction){
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
  request.open("GET", url, true); 
  request.onreadystatechange = function(){
    if (request.readyState == 4 && request.status == 200){
      if (request.responseText){         
          callbackFunction(request.responseText);
      }
    }
  };
  request.send(vars);
}
var frank={
	__numbercount:0,
	__numbersym_tatol:0,
	__classid:0,
	__parentid:0,
	__ishot:0,
	__gethot:function (number){
		var strnumber='',oldnumber='';
		if(_cachehot!='')
		for(var i in _cachehot){
			strnumber = number.toUpperCase( );
			oldnumber = _cachehot[i]['number'].toUpperCase( );
			if(String(strnumber) == String(oldnumber)){
				var my_frank = String(_cachehot[i]['frank']);
				var my_huishui= String(_cachehot[i]['huishui']);
				var my_stat= String(_cachehot[i]['stat']);
				var getfrank='';
				if(this.__numbercount>0){
					if(my_frank.indexOf("/")!=-1){
						var frankarray = my_frank.split("/");
						getfrank = frankarray[(this.__numbercount-1)];
					}
					my_frank = getfrank ? getfrank : my_frank;
				}
				this.__frankhot=my_frank;
				this.__ishot=1;//掩藏不显示的热门码
				if(my_stat!=1||my_stat==''||my_stat==0)this.__ishotstat=1;
				return my_frank;break;
			}
		}
		return "";
	},
	fixclass_redw:1,//二定位
	fixclass_sandw:4,//三定位
	fixclass_sidw:5,//四定位
	fixclass_rezi:6,//二字显
	fixclass_sanzi:7,//三字显
	fixclass_sizi:107,//四字显
	__hotfor:function (){
		var frankhot=0,huishuihot=0,huishuiselect=0,classid=0,parentid=0,bili=0;
		frankhot = this.__frankhot;
		huishuihot = this.__huishuihot ;
		huishuiselect = this.__huishuiselect;
		classid = this.__classid;
		parentid = this.__parentid;
		if(classid==this.fixclass_rezi){//两字现
			bili = 10;
		}else if (classid==this.fixclass_sanzi){//三字现
			bili = this.__numbercount==3 ? 100 : 50;
		}else if (classid==this.fixclass_sizi){//四字现
			if(this.__numbercount==1){bili = 400;}
			else if (this.__numbercount==2){bili = 800;}
			else if (this.__numbercount==3){bili = 1600;}
			else if (this.__numbercount==4){bili = 6800;}
		}else{
			if(this.fixclass_redw==classid||parentid==this.fixclass_redw){//二定位
				bili = 100;
			}else if (this.fixclass_sandw==classid||parentid==this.fixclass_sandw){//三定位
				bili = 1000;
			}else{
				bili = 10000;
			}			
		}
		getfrankhot = ((frankhot-0) + (huishuihot * bili-0)) - huishuiselect * bili;
		//alert(classid+"=="+bili+"=="+frankhot+"=="+huishuihot+"=="+huishuiselect);
		return getfrankhot;		
		
	},
	__getfrankajax:0,
	__getfrank:function (number){
		this.__frankhot = 0;
		this.__huishuihot = 0;
		this.__huishuiselect = 0;
		this.__ishot=0;
		this.__ishotstat=0;
		var my_frank = 0;
		/*var my_frank = this.__gethot(number);
		if(my_frank==""){
			my_frank = this.__getclassfrank(number);
		}*/
		my_frank = this.__getclassfrank(number);
		this.__gethot(number);
		if(this.__ishot==1){
			my_frank = this.__hotfor();
		}
		return my_frank;
	},
	__frankhot:0,
	__huishuihot:0,
	__huishuiselect:0,
	__getclassfrank:function (number){
			var my_classid = this.__classid;
			my_frank = String(_cacheuser[my_classid]['f']);
			this.__huishuihot = String(_cacheuser[my_classid]['s0']);
			
			this.__huishuiselect = String(_cacheuser[my_classid]['s']);
			var getfrank='';
			if(this.__numbercount>0){
				if(my_frank.indexOf("/")!=-1){
					var frankarray = my_frank.split("/");
					getfrank = frankarray[(this.__numbercount-1)];
				}
				my_frank = getfrank ? getfrank : my_frank;
			}
			return my_frank;

	},
	__NumberGoClass : function (num){
		this.__classid=0;
		this.__numbersym_tatol=0;
		if(num!=''){
			num = num.replace(/[\d]/g,"口");
			num = num.toUpperCase();
			for(var i in _cacheclass){
				var classname = _cacheclass[i]['classname'];
				var parentid = _cacheclass[i]['parentid'];
				if(parentid>0 && classname==num){ 
					this.__classid=_cacheclass[i]['id'];
					this.__parentid = _cacheclass[i]['parentid'];
					break;
				}else if(classname==num){
					this.__classid=_cacheclass[i]['id'];
					this.__parentid = _cacheclass[i]['parentid'];
					break;
				}
				//alert(_cacheclass[i]['classname'])
			}
		}

		if(this.__classid<=0){
			var classid=0;
			var lennumber = num.length;
			if( lennumber==2){
				classid=6;//二字现
			}else if (lennumber==3){
				classid=7;//三字现
			}else if (this.__numbersym_tatol==1){
				classid=4;//三定位
			}else if (this.__numbersym_tatol==2){
				classid=1;//二定位
			}else if (lennumber==4&&$('sizixian').checked){
				classid=107;//四字显
			}else if (lennumber==4&&this.__numbersym_tatol==0){
				classid=5;//四位
			}else{
				classid=0;
			}
			this.__classid=classid;
		}
		return this.__classid;
	},
	__ShowNumberCount : function (num){
		this.__numbercount=1;	
		if(num){
			var count=0;
			var len = num.length-1;
			for (var j=0;j<=len;j++){
				for (var i=0;i<=len;i++){
					if(i!=j  && num[j]==num[i]){
						if(count>0)this.__numbercount++;
						count++;
						break;
					}
				}
			}
		}
	},
	__CheckMoney:function (val_new,number){
		this.__classid = this.__NumberGoClass(number);
		var val_old=_cacheuser[this.__classid]['o'];
		val_new = val_new-0;
		val_old = val_old-0;
		if(val_new> val_old){
			alert(number + '不能超出单注上限 ' + val_old);if($('money'))$('money').select();
			return false;
		}
	},
	__CheckMoneyLeast:function (money){				
		var money_least;
		
		for(var i in _cacheclass){
			var cid = _cacheclass[i]['id'];
			if(this.__classid == cid ){ 
				money_least = _cacheclass[i]['money_least'];break;
			}
		}
		var money_arr = new Array();
		var money_least_arr = new Array();
		money=money+"";
		money_least=money_least+"";
		if(money.indexOf(".")!=-1){
			money_arr = money.split(".");
		}

		if(money_least.indexOf(".")!=-1){
			money_least_arr = money_least.split(".");
		}
		var money_least_get = money_least_arr[1];
		var money_get = money_arr[1];
		
		var money_least_len = money_least_get !='' && money_least_get !=undefined ? money_least_get.length : 0;
		var money_len =       money_get !='' && money_get !=undefined ? money_get.length:0;
		money = money=='' ? 0 : money;
		money_least = money_least-0;
		money = money-0;
		if(money_least > money || money==0){
			alert('下注金额不能低于 ' + money_least);$('money').select();
			return false;
		}else if(money_least_len==0 && money_len>0){
			alert('金额不能带小数点 ');$('money').select();
			return false;
		}else if(money_least_len > 0 && money_len > 0 && money_least_len!=money_len ){
			alert('金额不能超出小数点位数 ');$('money').select();
			return false;
		}
		return true;
	}
}


var get_number_award,get_money_award=0;
var getnumbersym = 0;
var numbersym = "X";
function numbersplit(number){

	frank.__numbersym_tatol=0;
	get_number_award="";
	get_money_award="";
	getnumbersym=0;
	if(number == '' || number==null)return false;
	var n_length = number.length;
	var texisnumber_arr = new Array();

	j=0;
	for(var i=1;i<=number.length;i++){							
		getnum = number.substring(i-1, i);  // 获取子字符串。 
		if(i<=4){
			getnum = getnum.replace('x',numbersym);
			if(isNaN(getnum) && getnum!=numbersym){
				return 1;
			}
			get_number_award+=String(getnum);
			texisnumber_arr[j]=String(getnum);
			j=j+1;
			if(getnum==numbersym){
				getnumbersym=getnumbersym+1;
				frank.__numbersym_tatol++;
			}
		}else{
			if(isNaN(getnum)){
				return 2;
			}	
			get_money_award+=String(getnum);
		}
	}
	if(get_number_award.length==1){
		return 1;
	}
	if(getnumbersym>2){
		return 3;
	}else if(getnumbersym>0){
		if(get_number_award.length<4)return 3;
	}
	texisnumber(texisnumber_arr);

}
function texisnumber(number){
	var leg = number.length;
	var nstr = number+"";
	var getnstr= nstr.indexOf("X")+0;
	if(leg<=3||($('sizixian').checked&&getnstr==-1)){
		var number_now=number.sort();
		var num="";
		var numarray = new Array();

		for (i=0;i<=number_now.length-1 ;i++ )
		{
			num+=number_now[i];
			numarray[i]=number_now[i];
		}

		$('number').value=num;
		
		if(numarray!=null)
		frank.__ShowNumberCount(numarray);
	}
}

function sNumber(number) 
{ 
	if(number=='')return;
	numbersplit(number)
	return false; 
} 
function sNumber13(number) 
{ 
	if (event.keyCode == 13) 
	{ 
	if(number=='')return;
	numbersplit(number)
	return false; 
	}
} 

