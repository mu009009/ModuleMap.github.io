console.log("plot");

var LevelReNumberCount = 0;
var LevelNoreNumberCount = 0;
var PreviousLevel = 0;
var LevelNumber = 1;

//Load the data about Module;
function ModuleDataLoad()
{
	queue()
	.defer(d3.csv,'data/ModuleInformation.csv',parse)
	.defer(d3.csv,'data/LevelInfo.csv',parseLevle)
	.await(dataLoaded);
}

ModuleDataLoad()

//Controling the data
function dataLoaded(err,module,Level)
{	
	var LevelInfo = Level;
	console.log(LevelInfo);
	var KeyBluePass = 0;
	var KeyGreenPass = 0;
	var BlueNumber = 0;
	var GreenNumber = 0;
	var PreviousSelectLevel = 0;
	var PreviousName = null;
	
	var Button = d3.select('#plot')
		.selectAll('btn')
		.data(module)
		.enter();
	
	//Get the width and the height of the target area;
	var h = document.getElementById('plot').offsetHeight;
	var w = document.getElementById('plot').offsetWidth;
	
	//The inital distance for each button from the top to its position
	//var heighpercentage = 0.33;
	var lowpercentage = 0.30;
	
	//The inital distance for each button from the left to its position
	var Leftpercentage = 0.3;
	
	//The height and the width for button
	var buttonHeight = 50;
	var buttonWidth = 50;
	var SubmitButtonWidth = 70;
	var SubmitButtonHeight = 40;
	
	//The blank for each button;
	var WidthBlank = 1;
	var HeightBlank = 1;
	
	//Draw the button with data and describe the click function
	var DrawButton = Button
		.append("button")
		.attr("class",function(d){
			if(d.Required == "TRUE")
				{
					return "btn btn-info "+d.Level;
				}
			else
				{
					return "btn btn-success "+d.Level;
				}
		})
		.attr("id",function(d){
			return d.Name;
		})
		.attr("name",function(d){
			return d.Name;
		})
		.attr("selected",0)
		.attr("type","button")
		.attr("value",function(d){
			return +d.Level;
		})
		.attr("Required",function(d){
			return d.Required;
		})	
		.style("width",buttonWidth + "px")
		.style("height",buttonHeight + "px")
		.style("position","absolute")
		.style("margin-top",function(d){
			if(d.Required == "TRUE")//Required is the attribution which will discribe if this module is elective or obligatory, obligatory means the true, and elective means the faluse
				{
					if(PreviousLevel!=d.Level)//Obligatory and the elective will draw in totally different way
						{
							LevelNoreNumberCount = 0;
							LevelReNumberCount = 0;
							PreviousLevel = d.Level;
							var WidthBlankValue = (h*lowpercentage - LevelReNumberCount*buttonHeight)
							LevelReNumberCount = LevelReNumberCount + 1;
							return WidthBlankValue + "px";
						}
					else
						{
							var WidthBlankValue = (h*lowpercentage - LevelReNumberCount*buttonHeight - HeightBlank );
							LevelReNumberCount = LevelReNumberCount + 1;
							return WidthBlankValue + "px";							
						}
				}
			else
				{
					if(PreviousLevel!=d.Level)
						{
							LevelReNumberCount = 0;
							LevelNoreNumberCount = 0;
							PreviousLevel = d.Level
							var HeightBlankValue = (h*lowpercentage + (LevelNoreNumberCount+1)*buttonHeight)
							LevelNoreNumberCount = LevelNoreNumberCount + 1;
							return HeightBlankValue + "px";
						}
					else
						{
							var HeightBlankValue = (h*lowpercentage + (LevelNoreNumberCount+1)*buttonHeight + HeightBlank * (LevelNoreNumberCount+1));
							LevelNoreNumberCount = LevelNoreNumberCount + 1;
							return  HeightBlankValue + "px";							
						}
				}
		})
		.style("margin-left",function(d){
			return ((d.Level-1)*buttonWidth+WidthBlank*(d.Level-1)+Leftpercentage*w)+"px";
		})
		.attr("disabled",function(d){
			for(var i=0;i<LevelInfo.length;i++)
				{
					if(d.Level==LevelInfo[i].Level)
						{
							if(d.Required == "TRUE")
								{
									if(LevelInfo[i].ReBlueNumber <= KeyBluePass)
										{
											return null;
										}
									else
										{
											return "disabled";//If the module can not be select at first, like need some pre request module or skills, or something other, than, that module will be disabled
										}	
								}
							else
								{
									if(LevelInfo[i].ReGreenNumber <= KeyGreenPass)
										{
											return null;
										}
									else
										{
											return "disabled";//If the module can not be select at first, like need some pre request module or skills, or something other, than, that module will be disabled
										}	
								}							
						}
				}
			return null;
		})
		.style("opacity",function(d){
			if(this.disabled)
				{
					return 0.2;
				}
			else
				{
					return 0.5;
				}
		})	
		.on("click",function(d){
			changeModule(d.Link);
			if(PreviousSelectLevel < d.Level)
				{
					PreviousSelectLevel = d.Level;
				}
			d3.select('#' + d.Name)
			.transition()
			.duration(500)			
			.style("background-color",function(d){
				if(PreviousName!=d.Name)
					{
						if(PreviousName!=null)
							{
								d3.select('#'+PreviousName)
								.transition()
								.duration(500)
								.style("background-color",null);
							}
//						return "rgb" + "(" +"255,106,106"+ ")"
						return "white";
					}
			});
			PreviousName = d.Name;			
		})
		.on("mouseover",function(){			
			console.log(document.getElementById(this.id).getAttribute('required'));
			
// Describe the Tooltip part------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			var ToolTip = d3.select("#Tooltip")
//			console.log(this);
			var LeftPosition = this.style.marginLeft.toString();
			var TopPosition = this.style.marginTop.toString();
			var pattern = "px";
			
			LeftPosition = LeftPosition.replace(new RegExp(pattern),"");
			TopPosition = TopPosition.replace(new RegExp(pattern),"");
			
			ToolTip = d3.select("#Tooltip")
			.transition()
			.duration(500)			
			.style("margin-left",function(){
//				var coordinates = [0, 0];
//				coordinates = d3.mouse(this);
//				var x = coordinates[0];				
//				return x+buttonWidth/2 + "px";
				var RightLeftPosition = +LeftPosition;
				console.log(RightLeftPosition);
				return  RightLeftPosition + buttonWidth + "px" ;
			})
			.style("margin-top",function(){
//				var coordinates = [0, 0];
//				coordinates = d3.mouse(this);
//				var y = coordinates[1];				
//				return y - buttonHeight/2 + "px";
				var RightTopPosition = +TopPosition;
				return RightTopPosition  + "px" ;				
			})
			.style("opacity",0.8)
			
			var HideText = d3.selectAll("text")
			.text("");
			
			var TipString;
			if(document.getElementById(this.id).getAttribute('required') == "TRUE")
				{
					if(LevelInfo[this.value-1].ReBlueNumber==0)
						{
							BlueNumber = (LevelInfo[this.value-1].ReBlueNumber+1 - KeyBluePass);
							if(BlueNumber<=0)
								{
									BlueNumber = 0;
								}
							TipString = "Need submit " +  BlueNumber + ",more Blue module,in Level " + (LevelNumber) + ",to unlock,the next Level";
						}
					else
						{
							BlueNumber = (LevelInfo[this.value-1].ReBlueNumber-KeyBluePass);
							if(BlueNumber<=0)
								{
									BlueNumber = 0;
								}
							TipString = "Need submit " + BlueNumber + ",more Blue module,in Level " + (LevelNumber) + ",to unlock,the next Level";
						}					
				}
			else
				{
					if(LevelInfo[this.value-1].ReGreenNumber==0)
						{
							GreenNumber = (LevelInfo[this.value-1].ReGreenNumber+1 - KeyGreenPass);
							if(GreenNumber<=0)
								{
									GreenNumber = 0;
								}
							TipString = "Need submit at least" + GreenNumber + ",more Green module,in Level " + (LevelNumber) + ",to unlock,the next Level";
						}
					else
						{
							GreenNumber = (LevelInfo[this.value-1].ReGreenNumber-KeyGreenPass);
							if(GreenNumber<=0)
								{
									GreenNumber = 0;
								}							
							TipString = "Need submit at least" + GreenNumber + ",more Green module,to unlock,in Level " + (LevelNumber) + ",to unlock,the next Level";
						}	
				}
			
			var text = d3.select("#Tooltip")
			.append("text")
			.attr("x",15)
			.attr("y",25)
			.style("font-size",12+"px")
//			.text(TipString);
			
			var NewString = TipString.split(",");
			
			text.selectAll("tspan")
			.data(NewString)
			.enter()
			.append("tspan")
			.attr("x",15)
			.attr("dy","1em")
			.text(function(d){
				return d;
			});
			
			console.log(ToolTip);	
		})
		.on("mouseout",function(){

			var TipStringII = "Need submit " +  BlueNumber + ",more Blue module" + ",and need submit " + GreenNumber + ",more Green module,in Level "+ (LevelNumber) + ",to unlock,the next Level";
			var NewString = TipStringII.split(",");
			
//			var Hide = d3.select("#Tooltip")
//			.transition()
//			.duration(500)
//			.style("opacity",0)
			
			var HideText = d3.selectAll("text")
			.text("");
			
			var Showagain = d3.select('#Tooltip')
			.append("text")
			.attr("x",15)
			.attr("y",25)
			.style("font-size",12+"px")
			
			Showagain.selectAll("tspan")
			.data(NewString)
			.enter()
			.append("tspan")
			.attr("x",15)
			.attr("dy","1em")
			.text(function(d){
				return d;
			});
			
			var ChangePosition = d3.select('#Tooltip')
			.transition()
			.duration(500)
			.style("opacity",0.8)
			.style("margin-left",0+"px")
			.style("margin-top",0+"px")			
		})
	
	console.log(DrawButton[0][0].__data__);
	console.log(DrawButton);
	
	var ReloadButton = d3.select('#plot')
		.append("button")
		.attr("class","btn btn-warning")
		.attr("type","button")
		.attr("value","Change Source")
		.attr("selected",1)
		.style("width",SubmitButtonWidth + "px")
		.style("height",SubmitButtonHeight + "px")
		.style("margin-left",88 + "%")
		.style("padding-left",1.5+"px")
		.style("position","absolute")
		.text("Restart")
		.style("font-size",14 + "px")
		.on("click",function(){
			window.location.reload();
		});		
	
	var SubmitButton = d3.select('#plot')
		.append("button")
		.attr("class","btn btn-warning")
		.attr("type","button")
		.attr("value","Change Source")
		.attr("selected",1)	
		.style("width",SubmitButtonWidth + "px")
		.style("height",SubmitButtonHeight + "px")
		.style("margin-left",93 + "%")
		.style("padding-left",1.5+"px")
		.style("position","absolute")
		.text("Submit")
		.style("font-size",14 + "px")
		.on("click",function(){
			
			console.log(document.getElementById(PreviousName).getAttribute("selected"));
			d3.select("#"+PreviousName)
			.attr("selected",function(){
				if(document.getElementById(PreviousName).getAttribute("selected")==0)
					{
						if(document.getElementById(PreviousName).getAttribute("Required") == "TRUE")
							{
								KeyBluePass = KeyBluePass + 1;
								return 1;	
							}
						else
							{
								KeyGreenPass = KeyGreenPass + 1;
								return 1;	
							}
					}
				else
					{
						return 1;
					}
			})
			.style("opacity",1)
			
			console.log(KeyBluePass);
			console.log(KeyGreenPass);
			
			if(PreviousSelectLevel>0)
				{
					if(LevelInfo[PreviousSelectLevel-1].ReBlueNumber <= KeyBluePass)
						{
							if(LevelInfo[PreviousSelectLevel-1].ReGreenNumber <= KeyGreenPass)
								{
										var NameString = ".btn.btn-info"+'.'+(PreviousSelectLevel+1).toString();
											$(NameString)
											.attr("disabled",null);

											var NameAString = ".btn.btn-success"+'.'+(PreviousSelectLevel+1).toString();
											$(NameAString)
											.attr("disabled",null);

											d3.selectAll('.btn')
											.style("opacity",function(d){
												console.log(this.getAttribute("selected"));
													if(this.getAttribute("selected") == 1)
														{
															return 1;
														}
													else if(this.disabled)
														{
															return 0.2;
														}
													else if(!this.disabled)
														{
															return 0.5;
														}
														})

										KeyBluePass = 0;
										KeyGreenPass = 0;
										LevelNumber = LevelNumber + 1;
									
										if((PreviousSelectLevel+1)>7)
										   {
											   window.location.href = "https://docs.google.com/forms/d/1PKCxIjLPtBtsXLbYSDMN_nCFz8gjZdh5Uv5k5-fWgEY/viewform?c=0&w=1&usp=mail_form_link";
										   }
								}
						}
				}
		});
}

function changeModule(ModuleAddress)
{
//	document.getElementById("moduleDetail").src = ModuleAddress;
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

function parseLevle(d)
{
	var ModuleLevel = {}			

	ModuleLevel.Level = +d.Level;
	ModuleLevel.ReBlueNumber = +d.BlueRequiredNo;
	ModuleLevel.ReGreenNumber = +d.GreenRequiredNo;
	ModuleLevel.Des = d.Description;
			
	return ModuleLevel;

}



