//Activation function
function Activation(n) {
	//remove activation for other
	var Active = true;

	var elems = document.getElementsByClassName("active");
	for (var i = elems.length -1 ; i >= 0; i--){
		elems[i].classList.remove("active");
	}
	//Activating pressed button.
	var m = n.toString();
	var elemM = document.getElementById(m);
	elemM.classList.add('active');
	elemM.classList.remove('hover');
	return(Active);
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
	Active = Activation(2);
	var elems = document.getElementsByClassName('zoom');
	if(Active){
			for (var i = 0; i < elems.length; i++){
				elems[i].classList.remove("active");
			}
	}


}





//Building tools
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



//Interface tools

function Toggle_Wire(){


}

function Toggle_Grid(){


}



//Zoom tools
function zoomIn(){


}

function zoomOut(){


}



//Drawing tools
function LineTool(){


}

function CircleTool(){


}

function BoxTool(){


}

function FreeLineTool(){


}
