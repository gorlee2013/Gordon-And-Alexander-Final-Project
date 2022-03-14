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
	let mem = new Array(1600); // not implemented yet
	for(let i=0;i<arrLength;i++){
		newLine = arr[i];
		newLine = newLine.replace(/\s+/g, "");
		validInstruction = 0;
		//while(newLine== ""){
			//inputCode += inputCode.replace("\n","");
			//newLine += inputCode.substring(0,inputCode.indexOf("\n"));
		//}
		if(newLine.indexOf("Main:")==0) // Main:
		{
			hasMain=1;
			newLine=newLine.replace("Main:","");
		}
		if(newLine.indexOf("Stack:")==0) // Stack:
		{
			hasStack=1;
			newLine=newLine.replace("Stack:","");
		}
		if(newLine.indexOf("halt")==0) // halt
		{
			machineCode+="00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
			newLine=newLine.replace("halt","");
		}
		else if(newLine.indexOf("nop")==0) // nop
		{
			machineCode+="10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
			newLine=newLine.replace("nop","");
		}
		else if(newLine.indexOf("rrmovq")==0) // rrmovl
		{
			machineCode+="20 ";
			newLine=newLine.replace("rrmovq","");
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
		else if(newLine.indexOf("irmovq")==0) //irmovl
		{
			machineCode+="30 F"
			newLine=newLine.replace("irmovq","");
			var cmma = newLine.indexOf(",")
			var V = toHex(newLine.substring(0,cmma));
			newLine = newLine.substring(cmma + 1);
			reg1 = Register(newLine);
			newLine="";
			machineCode+=reg1;
			machineCode+=" " + V + " ";
			machineCode=Padding(machineCode);
		}
		/*
		console.log("1: " + machineCode);
		console.log("2: " + machineCode);
		console.log("3: " + machineCode);
		console.log("V: " + V);
		*/

		else if(newLine.indexOf("rmmovq")==0) //rmmovl
		{
			machineCode+="40 "
			newLine=newLine.replace("rmmovq","");
			var cmma = newLine.indexOf(",");
			reg1 = Register(newLine.substring(0,cmma));
			var p1 = newLine.indexOf("(");
			var p2 = newLine.indexOf(")");
			reg2 = Register(newLine.substring(p1+1,p2));
			console.log("Reg1: " + reg1)
			console.log("Reg2: " + reg2)
			console.log("Reg12: " + reg1 + reg2)
			console.log("RegM12: " + machineCode + reg1 + reg2)


			var D = toHex(newLine.substring(cmma+1,p1));
			newLine="";
			machineCode+=reg1;
			machineCode+=reg2  + " " + D + " ";
			machineCode=Padding(machineCode);
		}

		else if(newLine.indexOf(".pos")==0) // getting position
		{
			newLine=newLine.replace(".pos","");
			if (newLine != ""){
			}
			while(/[0-9]|[A-F]|\x/.test(newLine.substring(0,1))){ //reg exp to get pos (can probably change to get whole number)
				pos += newLine.substring(0,1);
				newLine = newLine.substring(1);
			}
		}


		if(newLine!=="") // improper input will not be replaced with ""
		{
			document.getElementById("MachineCode").innerHTML = "Improper Input";
			return;
		}
	}

	document.getElementById("MachineCode").innerHTML = machineCode;

}
function toHex (string){ // convert value to hex with 1 byte spacing
	if(string.indexOf("$")== 0)
		string = string.substring(1);
	var n = +string;
	n = n.toString(16); //number = parseInt(hexString, 16); to reverse
	console.log("not spaced: " + n);
	if (n.length%2==1) {
		n = n + "0"
	}
  n = n.replace(/.{1,2}(?=(.{2})+$)/g, '$& '); // add space every 2 characters (1 byte)
	console.log("spaced: " + n);
	return n;
}

function Padding(string){ // add padding to 16 bytes (does not add space to beginning)
	var add = (48 - string.length);
	while ((add-3) >= 0){
		string += "00 ";
		add = add-3;
	}
	return string;
}

function Register(string) // get register number
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
