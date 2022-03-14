function computeMachineCode(){
	let inputCode = document.getElementById("textbox").value;
	let machineCode="";
	var hasMain = 0;
	var hasStack = 0;
	var ValidInstruction;
	var reg1, reg2;
	var exit = 0;
	var pos = "";
	var arr = inputCode.split("\n");
	var arrLength = arr.length;
	let newLine;
	for(let i=0;i<arrLength;i++){
		newLine = arr[i];
		newLine = newLine.replace(/\s+/g, "");
		validInstruction = 0;
		//while(newLine== ""){
			//inputCode += inputCode.replace("\n","");
			//newLine += inputCode.substring(0,inputCode.indexOf("\n"));
		//}
		if(newLine.indexOf("Main:")==0)
		{
			hasMain=1;
			newLine=newLine.replace("Main:","");
		}
		if(newLine.indexOf("Stack:")==0)
		{
			hasStack=1;
			newLine=newLine.replace("Stack:","");
		}
		if(newLine.indexOf("halt")==0)
		{
			machineCode+="00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
			newLine=newLine.replace("halt","");
		}
		else if(newLine.indexOf("nop")==0)
		{
			machineCode+="10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
			newLine=newLine.replace("nop","");
		}
		else if(newLine.indexOf("rrmovl")==0)
		{
			machineCode+="20 ";
			newLine=newLine.replace("rrmovl","");
			reg1 = Register(newLine);
			if(reg1!="F"){
				machineCode+=reg1;
				 newLine = newLine.substring(5);
			}
			reg2 = Register(newLine);
			if(reg2!="F"){
				machineCode+=reg2;
				 newLine = newLine.substring(4);
			}
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("irmovl")==0)
		{
			machineCode+="30 ";

			newLine=newLine.replace("rrmovl","");
			var inputValue = parseInt(newLine.subString(0,newLine.indexOf(",")));
			var hexValue = "";
			while(inputValue>0){
				hexValue += inputValue%16;
				inputValue = Math.floor(inputValue/16);
			}
			for(int i = hexValue.length();i<=8;i++)
				hexValue+=0;
			reg1 = Register(newLine);
			if(reg1!="F"){
				machineCode+="F"+reg1+" ";
				 newLine = newLine.substring(newLine.indexOf(","+4);
			}
			 for(int i=0;i<4;i++)
				 machineCode+=hexValue.substring(i*2+1,i*2+2)+hexValue.substring(i*2,i*2+1)+" ";
			
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 ";
		}




		else if(newLine.indexOf(".pos")==0) // getting position
		{
			newLine=newLine.replace(".pos","");
			if (newLine != ""){
			}
			while(/[0-9]|[A-F]|\x/.test(newLine.substring(0,1))){
				pos += newLine.substring(0,1);
				newLine = newLine.substring(1);
			}
		}


		if(newLine!==""||newLine.substring(length-1,1)!=":") // improper input will not be replaced with "", or input could be a loop: which is ignored
		{
			document.getElementById("MachineCode").innerHTML = "Improper Input";
			return;
		}
	}

	document.getElementById("MachineCode").innerHTML = machineCode;

}
function Register(string)
{
	if(string.indexOf("%rax")== 0)
		return 0;
	else if(string.indexOf("%rcx")==0)
		return 1;
	else if(string.indexOf("%rdx")==0)
		return 2;
	else if(string.indexOf("%rbx")==0)
		return 3;
	else if(string.indexOf("%rsp")==0)
		return 4;
	else if(string.indexOf("%rbp")==0)
		return 5;
	else if(string.indexOf("%rsi")==0)
		return 6;
	else if(string.indexOf("%rdi")==0)
		return 7;
	else if(string.indexOf("%rcx")==0)
		return 8;
	else if(string.indexOf("%rdx")==0)
		return 9;
	else if(string.indexOf("%r10")==0)
		return "A";
	else if(string.indexOf("%r11")==0)
		return "B";
	else if(string.indexOf("%r12")==0)
		return "C";
	else if(string.indexOf("%r13")==0)
		return "D";
	else if(string.indexOf("%r14")==0)
		return "E";
	else return "F"; //no register
}
