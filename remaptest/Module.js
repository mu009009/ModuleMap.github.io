console.log("Module");

var LevelReNumberCount = 0;
var LevelNoreNumberCount = 0;
var PreviousLevel = 0;

//Load the data about Module;
function ModuleDataLoad()
{
	queue()
	.defer(d3.csv,'data/CSV File/ModuleInformation.csv',parse)
	.await(dataLoaded);
}

ModuleDataLoad()

//Controling the data
function dataLoaded(err,module)
{
	var Button = d3.select('#ModulePart')
		.selectAll('btn')
		.data(module)
		.enter();
	
	//Get the width and the height of the target area;
	var h = document.getElementById('ModulePart').offsetHeight;
	var w = document.getElementById('ModulePart').offsetWidth;
	
	//The inital distance for each button from the top to its position
	//var heighpercentage = 0.33;
	var lowpercentage = 0.30;
	
	//The inital distance for each button from the left to its position
	var Leftpercentage = 0.3;
	
	//The height and the width for button
	var buttonHeight = 30;
	var buttonWidth = 30;
	
	//The blank for each button;
	var WidthBlank = 1;
	var HeightBlank = 1;
	
	//Draw the button with data and describe the click function
	var DrawButton = Button
		.append("button")
		.attr("class",function(d){
			if(d.Required == "TRUE")
				{
					return "btn btn-info";
				}
			else
				{
					return "btn btn-success";
				}
		})
		.attr("type","button")
		.attr("value","Change Source")
		.style("width",buttonWidth + "px")
		.style("height",buttonHeight + "px")
		.style("position","absolute")
		.style("margin-top",function(d){
			if(d.Required == "TRUE")
				{
					if(PreviousLevel!=d.Level)
						{
							LevelReNumberCount = 0;
							PreviousLevel = d.Level;
							var WidthBlankValue = (h*lowpercentage - LevelReNumberCount*buttonHeight)
							LevelReNumberCount = LevelReNumberCount + 1;
							return WidthBlankValue + "px";
						}
					else
						{
							console.log(PreviousLevel);
							var WidthBlankValue = (h*lowpercentage - LevelReNumberCount*buttonHeight - HeightBlank );
							LevelReNumberCount = LevelReNumberCount + 1;
							return WidthBlankValue + "px";							
						}
				}
			else
				{
					if(PreviousLevel!=d.Level)
						{
							LevelNoreNumberCount = 0;
							PreviousLevel = d.Level
							var HeightBlankValue = (h*lowpercentage + (LevelNoreNumberCount+1)*buttonHeight)
							LevelNoreNumberCount = LevelNoreNumberCount + 1;
							return HeightBlankValue + "px";
						}
					else
						{
							console.log(PreviousLevel);
							var HeightBlankValue = (h*lowpercentage + (LevelNoreNumberCount+1)*buttonHeight + HeightBlank * LevelNoreNumberCount);
							LevelNoreNumberCount = LevelNoreNumberCount + 1;
							return  HeightBlankValue + "px";							
						}
				}
		})
		.style("margin-left",function(d){
			return ((d.Level-1)*buttonWidth+WidthBlank*(d.Level-1)+Leftpercentage*w)+"px";
		})
		.on("click",function(d){
			changeModule(d.Link);
		})
}

function changeModule(ModuleAddress)
{
	document.getElementById("moduleDetail").src = ModuleAddress;
}

// Change data to the Object
function parse(d)
{
	var Module = {}
	
	Module.Level = +d.Level;
	Module.Link = d.Resource;
	Module.Name = d.ModuleName;
	Module.Id = +d.ModuleID;
	Module.Required = d.Required;
	
	return Module;
}



