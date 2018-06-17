//Activation function
function Activation(n) {
	//remove activation for other



	var elems = document.getElementsByClassName("active");
	for (var i = elems.length -1 ; i >= 0; i--){
		elems[i].classList.remove("active");
	}
	//Activating pressed button.
	var m = n.toString();
	var elemM = document.getElementById(m);
	elemM.classList.add('active');
	elemM.classList.remove('hover');

}

//Hover function
function hover(n){
	if(n.classList.contains('active'))
		return;
	n.classList.add('hover');
}
function Nohover(n){
	n.classList.remove('hover');
}


//Movement tools
function MoveTool(){
	Activation(0);

}

function RotateTool(){
	Activation(1);

}

function ZoomTool(){
	Activation(2);

}





//Block tools
function AddBlock(){
	Activation(3);

}

function ChangeBlock(){
	Activation(4);

}




//Export tool
function ExportFile(){
	Activation(5);

}
