function computeMachineCode(){
	let inputCode = document.getElementById("textbox").value;
	let machineCode="";
	var hasMain = 0;
	var hasStack = 0;
	var ValidInstruction;
	var reg1, reg2;
	var exit = 0;
	var arr = inputCode.split("\n");
	let newLine;
	for(let i=0;i<arr.length;i++){
		newLine = arr[i];
		validInstruction = 0;
		//while(newLine== ""){
			//inputCode += inputCode.replace("\n","");
			//newLine += inputCode.substring(0,inputCode.indexOf("\n"));
		//}
		if(newLine.indexOf("Main:")!=-1)
		{
			hasMain=1;
			newLine=newLine.replace("Main:","");
		}
		if(newLine.indexOf("Stack:")!=-1)
		{
			hasStack=1;
			newLine=newLine.replace("Stack:","");
		}
		if(newLine.indexOf("halt")!=-1)
		{
			machineCode+="00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
			newLine=newLine.replace("halt","");
		}
		else if(newLine.indexOf("nop")!=-1)
		{
			machineCode+="10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
			newLine=newLine.replace("nop","");
		}
		else if(newLine.indexOf("rrmovl ")!=-1)
		{
			machineCode+="20 ";
			newLine=newLine.replace("rrmovl ","");
			reg1 = Register(newLine);
			if(reg1!=-1){
				machineCode+=reg1;
				 newLine = newLine.substring(6);
			}
			reg2 = Register(newLine);
			if(reg2!=-1){
				machineCode+=reg2;
				 newLine = newLine.substring(5);
			}

			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}


		if(newLine!=="")
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
		return A;
	else if(string.indexOf("%r11")==0)
		return B;
	else if(string.indexOf("%r12")==0)
		return C;
	else if(string.indexOf("%r13")==0)
		return D;
	else if(string.indexOf("%r14")==0)
		return E;
	else return F; //no register
}
