function ShowAdrs(no){
	var ch = new Array();

/* 文字コード(http://charset.7jp.net/sjis.html)から-2した値 */	
	ch[0]="114,96,113,105,44,109,112,97,102,62,101,107,95,103,106,44,97,109,107"; /* 執行部アドレス */
	ch[1]="114,96,113,105,44,109,112,97,102,44,95,98,62,101,107,95,103,106,44,97,109,107"; /* 広報アドレス */
	ch[2]="114,96,113,105,98,112,62,101,107,95,103,106,44,97,109,107"; /* なんだっけ */

	var s="",moji="";
	var num;
	var str=new Array();
	str=ch[no].split(",");

	for(var i=0;i<str.length;i++){
		num = parseInt(str[i]);
		s +=String.fromCharCode(num+2);
	}
	document.write("<a href=\"mai"+"lto:"+s+"\">"+s+"</a>");
}