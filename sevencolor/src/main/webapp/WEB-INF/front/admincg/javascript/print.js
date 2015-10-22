//注册表路径    
var hkey_root,hkey_path,hkey_key;    
hkey_root="HKEY_CURRENT_USER";    
hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";   
     
//设置页眉页脚为空      
function PageSetup_Null(){      
    try{   
        var RegWsh = new ActiveXObject("WScript.Shell");      
         hkey_key1="header";   
         hkey_key2="footer";     
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key1,"");   
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key2,"");   
		 HKEY_Key="margin_top"; 
		 RegWsh.RegWrite(hkey_root+hkey_path+HKEY_Key,"0"); 
		 HKEY_Key="margin_bottom"; 
		 RegWsh.RegWrite(hkey_root+hkey_path+HKEY_Key,"0"); 
		 HKEY_Key="margin_left"; 
		 RegWsh.RegWrite(hkey_root+hkey_path+HKEY_Key,"0"); 
		 HKEY_Key="margin_right"; 
		 RegWsh.RegWrite(hkey_root+hkey_path+HKEY_Key,"0"); 

     }catch(e){}      
}   
  
//设置页眉页脚为默认值      
function PageSetup_Default(){      
    try{      
        var RegWsh = new ActiveXObject("WScript.Shell") ;      
         hkey_key1="header";      
         hkey_key2="footer";      
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key1,"&w&b页码，&p/");      
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key2,"&u&b&d");       
     }catch(e){}       
}      
   
function printReport(){    
     PageSetup_Null();//设置页眉页脚为空    
     window.print();//打印页面    
     PageSetup_Default();//设置页眉页脚为默认值     
}    
function printpr()
{
	var OLECMDID = 7;
	/* OLECMDID values:
	* 6 - print
	* 7 - print preview
	* 1 - open window
	* 4 - Save As
	*/
	var PROMPT = 1; // 2 DONTPROMPTUSER 
	var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
	document.body.insertAdjacentHTML("beforeEnd", WebBrowser); 
	WebBrowser1.ExecWB(OLECMDID, PROMPT);
	WebBrowser1.outerHTML = "";
}

PageSetup_Null();


/*var pkey_root,pkey_path,pkey_key1,pkey_key2;    
pkey_root="HKEY_CURRENT_USER";    
pkey_path="\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\aa.com\\";   
try{   
    var RegWsh = new ActiveXObject("WScript.Shell");      
     pkey_key1="www";   
     pkey_key2=pkey_key1+"\\http";   
     RegWsh.RegWrite(pkey_root+pkey_path,"");   
     RegWsh.RegWrite(pkey_root+pkey_path+pkey_key1,"");   
     RegWsh.RegWrite(pkey_root+pkey_path+pkey_key2,"2","REG_DWORD");   
	alert("写入成功");
 }catch(e){alert("写入注册表失败！");
 } */

