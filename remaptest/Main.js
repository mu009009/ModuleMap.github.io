console.log("Main");

//Get the Height of the window
var windowHeight = window.innerHeight;

//Set the percentage heigh of the Mid part.
var marginTopForMidPart = 0.25

//Get the width blank 
var WidthBlank = document.getElementById('ProfeilePart').offsetWidth * 0.20;
console.log("My screen is 15.6 inches, 1920*1080");
console.log("");
console.log("The Left Part Width: " + document.getElementById('ProfeilePart').offsetWidth + "px");
console.log("The Left Part Height: " + document.getElementById('ProfeilePart').offsetHeight + "px");
console.log("");
console.log("The Mid Top Part Width: " + document.getElementById('ModulePart').offsetWidth + "px");
console.log("The Mid Top Part Height: " + document.getElementById('ModulePart').offsetHeight + "px");
console.log("");
console.log("The Mid Bottom Part Width: " + document.getElementById('ResourceScreen').offsetWidth + "px");
console.log("The Mid Bottom Part Height: " + document.getElementById('ResourceScreen').offsetHeight + "px");
console.log("");
console.log("The Right Part Width: " + document.getElementById('SkillPart').offsetWidth + "px");
console.log("The Right Part Height: " + document.getElementById('SkillPart').offsetHeight + "px");
console.log("");
console.log("The Blank: " + WidthBlank + "px");

//Set the blank heiht between each col-md;
var BlankHieght = WidthBlank;

//Set the inital height of the Mid top part;
d3.select('#ModulePart')
.style("height",windowHeight * (marginTopForMidPart) + "px");

//Set the inital height of the Mid bottom part;
d3.select('#ResourceScreen')
.style("margin-top",windowHeight * (marginTopForMidPart) + BlankHieght +"px")
.style("height", windowHeight * (1-marginTopForMidPart) - BlankHieght+ "px");

//Change the size for each part when the Size of window changed.
window.onresize = function(){
	
		windowHeight = window.innerHeight;
		
		//The height of the Mid top part
		d3.select('#ModulePart')
		.style("height",windowHeight * (marginTopForMidPart - BlankHieght) + "px");
		
		//The height of the Mid bottom part
		d3.select('#ResourceScreen')
		.style("margin-top",windowHeight * marginTopForMidPart +"px")
		.style("height", windowHeight * (1-marginTopForMidPart) + "px");
	
    }