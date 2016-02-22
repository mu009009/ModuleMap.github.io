console.log('ModuleLevel');

//Load the data about Rank;
function ModuleLevelDataLoad()
{
	queue()
	.defer(d3.csv,'data/CSV File/LevelInfo.csv',parse)
	.await(dataLoaded);
}

ModuleLevelDataLoad();

//Controling the data
function dataLoaded(err,moduleLevel)
{
	console.log(moduleLevel);
}

// Change data to the Object
function parse(d)
{
	var ModuleLevel = {}
	
	ModuleLevel.Level = +d.Level;
	ModuleLevel.ReNumber = +d.RequiredNo;
	ModuleLevel.NoreNumber = + d.NonRequireNo;
	
	return ModuleLevel;
}


//Export the data to other function so that easy to draw the pictures.