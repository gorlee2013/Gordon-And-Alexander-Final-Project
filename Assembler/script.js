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
	let newLine;
	for(let i=0;i<arr.length;i++){
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
		// moves
		else if(newLine.indexOf("rrmovq")==0) // rrmovq rA, rB
		{
			machineCode+="20 ";
			newLine=newLine.replace("rrmovq","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("cmovle")==0) // cmovle rA, rB
		{
			machineCode+="21 ";
			newLine=newLine.replace("cmovle","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("cmovl")==0) // cmovl rA, rB
		{
			machineCode+="22 ";
			newLine=newLine.replace("cmovl","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("cmove")==0) // cmove rA, rB
		{
			machineCode+="23 ";
			newLine=newLine.replace("cmove","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("cmovne")==0) // cmovne rA, rB
		{
			machineCode+="24 ";
			newLine=newLine.replace("cmovne","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("cmovge")==0) // cmovge rA, rB
		{
			machineCode+="25 ";
			newLine=newLine.replace("cmovge","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("cmovg")==0) // cmovg rA, rB
		{
			machineCode+="26 ";
			newLine=newLine.replace("cmovg","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		// end of moves

		else if(newLine.indexOf("irmovq")==0) //irmovq V, rB
		{
			var pad = "";
			machineCode+="30 F"
			newLine=newLine.replace("irmovq","");
			var cmma = newLine.indexOf(",")
			var V = toHex(newLine.substring(0,cmma));
			newLine = newLine.substring(cmma + 1);
			reg1 = Register(newLine);
			newLine="";
			pad+=reg1;
			pad+=" " + V + " ";
			machineCode+=Padding(pad, 4);
		}
		/*
		console.log("1: " + machineCode);
		console.log("2: " + machineCode);
		console.log("3: " + machineCode);
		console.log("V: " + V);
		*/

		else if(newLine.indexOf("rmmovq")==0) //rmmovq rA, D(rB)
		{
			var pad = "";
			machineCode+="40 "
			newLine=newLine.replace("rmmovq","");
			var cmma = newLine.indexOf(",");
			reg1 = Register(newLine.substring(0,cmma));
			var p1 = newLine.indexOf("(");
			var p2 = newLine.indexOf(")");
			reg2 = Register(newLine.substring(p1+1,p2));
			var D = toHex(newLine.substring(cmma+1,p1));
			newLine="";
			pad+=reg1;
			pad+=reg2  + " " + D + " ";
			machineCode+=Padding(pad, 3);
		}

		else if(newLine.indexOf("mrmovq")==0) //mrmovq D(rB), rA
		{
			var pad = "";
			machineCode+="50 "
			newLine=newLine.replace("mrmovq","");
			var cmma = newLine.indexOf(",");
			var p1 = newLine.indexOf("(");
			var p2 = newLine.indexOf(")");
			reg2 = Register(newLine.substring(p1+1,p2));
			var D = toHex(newLine.substring(0,p1));
			reg1 = Register(newLine.substring(cmma+1));
			newLine = "";
			pad+=reg1;
			pad+=reg2  + " " + D + " ";
			machineCode+=Padding(pad,3);
		}
		// operations
		else if(newLine.indexOf("addq")==0) //addq rA, rB
		{
			var pad = "";
			machineCode+="60 "
			newLine=newLine.replace("addq","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("subq")==0) //subq rA, rB
		{
			var pad = "";
			machineCode+="61 "
			newLine=newLine.replace("subq","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("andq")==0) //andq rA, rB
		{
			var pad = "";
			machineCode+="62 "
			newLine=newLine.replace("andq","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("xorq")==0) //xorq rA, rB
		{
			var pad = "";
			machineCode+="63 "
			newLine=newLine.replace("xorq","");
			reg1 = Register(newLine);
			machineCode+=reg1;
			newLine = newLine.substring(5);
			reg2 = Register(newLine);
			machineCode+=reg2;
			newLine = newLine.substring(4);
			machineCode+=" 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		//end of operations
		// jumps
		else if(newLine.indexOf("jmp")==0) //jmp Dest
		{
			var pad = "";
			machineCode+="70 "
			newLine=newLine.replace("jmp","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		else if(newLine.indexOf("jle")==0) //jle Dest
		{
			var pad = "";
			machineCode+="71 "
			newLine=newLine.replace("jle","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		else if(newLine.indexOf("jl")==0) //jl Dest
		{
			var pad = "";
			machineCode+="72 "
			newLine=newLine.replace("jl","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		else if(newLine.indexOf("je")==0) //je Dest
		{
			var pad = "";
			machineCode+="73 "
			newLine=newLine.replace("je","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		else if(newLine.indexOf("jne")==0) //jne Dest
		{
			var pad = "";
			machineCode+="74 "
			newLine=newLine.replace("jne","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		else if(newLine.indexOf("jge")==0) //jge Dest
		{
			var pad = "";
			machineCode+="75 "
			newLine=newLine.replace("jge","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		else if(newLine.indexOf("jg")==0) //jg Dest
		{
			var pad = "";
			machineCode+="76 "
			newLine=newLine.replace("jg","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		//end of jumps

		else if(newLine.indexOf("call")==0) //call Dest
		{
			var pad = "";
			machineCode+="80 "
			newLine=newLine.replace("call","");
			var Dest = toHex(newLine);
			newLine = "";
			pad+=Dest + " ";
			machineCode+=Padding(pad,3);
		}
		else if(newLine.indexOf("ret")==0) // ret
		{
			machineCode+="90 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
			newLine=newLine.replace("ret","");
		}
		else if(newLine.indexOf("pushq")==0) //pushq rA
		{
			var pad = "";
			machineCode+="A0 "
			newLine=newLine.replace("pushq","");
			reg1 = Register(newLine);
			newLine = newLine.substring(4);
			machineCode+=reg1;
			machineCode+="F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf("popq")==0) //popq rA
		{
			var pad = "";
			machineCode+="B0 "
			newLine=newLine.replace("popq","");
			reg1 = Register(newLine);
			newLine = newLine.substring(4);
			machineCode+=reg1;
			machineCode+="F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ";
		}
		else if(newLine.indexOf(".pos")==0) // getting position
		{
			pos=0;
			newLine=newLine.replace(".pos","");
			if (newLine != ""){
			}
			while(/[0-9]|[A-F]|\x/.test(newLine.substring(0,1))){ //reg exp to get pos (can probably change to get whole number)
				pos += newLine.substring(0,1);
				newLine = newLine.substring(1);
			}
			while(pos*3>machineCode.length)
				machineCode+="00 ";	
		}
	else if(newLine.indexOf(".align")==0) // aligns to x byte boundary
		{
			newLine=newLine.replace(".align","");
			var alignBytes = parseInt(newLine);
			newLine = "";
			while(machineCode.length%(alignBytes*3)!=0)
				machineCode+="00 ";	
		if(newLine!=="")
		{
			document.getElementById("MachineCode").innerHTML = "Improper Input";
			return;
		}
	}
	else if(newLine.indexOf(".quad")==0) // aligns to x byte boundary
		{
			newLine=newLine.replace(".quad","");
			if(newLine.length%2!=0)
				newLine+="0";
			while(newLine!=""){
				machineCode+=newLine.substring(0,2)+" ";	
				newLine = newLine.substring(2);
			}
		}
		if(newLine!=="")
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

function Padding(string, n){ // add padding to 16 bytes (takes in characters already used n)
	var add = (48 - string.length - n);
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
