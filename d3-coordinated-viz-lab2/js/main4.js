
//First line of main.js...wrap everything in a self-executing anonymous function to move to local scope
(function(){

//this will name the variable
var attrArray = ["NativeAmerican", "Asian", "Black", "Hispanic", "White", "Unknown"]; //list of attributes
var expressed = attrArray[0]; //initial attribute

//chart frame dimensions
var chartWidth = window.innerWidth * 0.5,
    chartHeight = 473,
    leftPadding = 25,
    rightPadding = 2,
    topBottomPadding = 5,
    chartInnerWidth = chartWidth - leftPadding - rightPadding,
    chartInnerHeight = chartHeight - topBottomPadding * 2,
    translate = "translate(" + leftPadding + "," + topBottomPadding + ")";

//create a scale to size bars proportionally to frame and for axis
var yScale = d3.scaleLinear()
    .range([chartHeight - 10, 0])
    .domain([0, 1550*1.1]); // csv first column max = 88



window.onload = setMap();

//set up choropleth map
function setMap(){
    
    //map frame dimensions
    var width = window.innerWidth * 0.4,
        height = 460;

    //sets up container for Georgia map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection centered on France
    var projection = d3.geoAlbers()
        .center([-83.43,33])
        .rotate([0, 0])
        .parallels([0, 180])
        .scale(5700)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    //use Promise.all to load data , csv, then topojsons
    var promises = [];
    promises.push(d3.csv("data/GA_voters.csv")); 
    console.log("csv loaded")
    promises.push(d3.json("data/states.topojson")); 
    promises.push(d3.json("data/Counties_Georgia.topojson")); //after promise.all it will run callback
    Promise.all(promises).then(callback);
//defines callback function
    function callback(data){
//defining data
        [csvData, usa, georgia] = data;
        console.log("heres data", data) //checks that it loaded right
        console.log("here's georgia",georgia) //check that georgia is there
        //adds graticules - this function will be defined below
        setGraticule(map, path);

        //translate europe TopoJSON
     var states = topojson.feature(usa, usa.objects.states);
      console.log("Here is states",states)
        var Counties_Georgia = topojson.feature(georgia, georgia.objects.Counties_Georgia).features;
        console.log(Counties_Georgia)

        //add states to the map
        var countries = map.append("path")
            .datum(states)
            .attr("class", "states")
            .attr("d", path);
        
       

        //join csv data to GeoJSON enumeration units
      Counties_Georgia = joinData(Counties_Georgia, csvData);
        console.log("Did it work?", Counties_Georgia)
        //create the color scale
       var colorScale = makeColorScale(csvData);

        //add enumeration units to the map
       setEnumerationUnits(Counties_Georgia, map, path, colorScale);

        //add coordinated visualization to the map
      setChart(csvData, colorScale);

        // dropdown
     createDropdown(csvData);

    };
}; //end of setMap()


function setGraticule(map, path){
    //...GRATICULE BLOCKS FROM MODULE 8
    //create graticule generator
    var graticule = d3.geoGraticule()
        .step([5, 5]); //place graticule lines every 5 degrees of longitude and latitude

    //create graticule background
    var gratBackground = map.append("path")
        .datum(graticule.outline()) //bind graticule background
        .attr("class", "gratBackground") //assign class for styling
        .attr("d", path) //project graticule

    //create graticule lines	
    var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
        .data(graticule.lines()) //bind graticule lines to each element to be created
            .enter() //create an element for each datum
        .append("path") //append each element to the svg as a path element
        .attr("class", "gratLines") //assign class for styling
        .attr("d", path); //project graticule lines
};

function joinData(Counties_Georgia, csvData){
    //...DATA JOIN LOOPS FROM EXAMPLE 1.1
    //loop through csv to assign each set of csv attribute values to geojson region
    for (var i=0; i<csvData.length; i++){
        var csvRegion = csvData[i]; //the current region
        var csvKey = csvRegion.NAME10; //the CSV primary key

        //loop through geojson regions to find correct region
        for (var a=0; a<Counties_Georgia.length; a++){

            var geojsonProps = Counties_Georgia[a].properties; //the current region geojson properties
            var geojsonKey = geojsonProps.NAME10; //the geojson primary key

            //where primary keys match, transfer csv data to geojson properties object
            if (geojsonKey == csvKey){

                //assign all attributes and values
                attrArray.forEach(function(attr){
                    var val = parseFloat(csvRegion[attr]); //get csv attribute value
                    geojsonProps[attr] = val; //assign attribute and value to geojson properties
                });
            };
        };
    };


    return Counties_Georgia;
};

//Example 1.6 Natural Breaks color scale
function makeColorScale(data){
    var colorClasses = [
        "#FFa07A",
        "#FF4500",
        "#FF6347",
        "#FF8C00",
        "#FFA500",
        "#FFBF00"
    ];

    //create color scale generator
    var colorScale = d3.scaleThreshold()
        .range(colorClasses);

    //build array of all values of the expressed attribute
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed]);
        domainArray.push(val);
    };

    //cluster data using ckmeans clustering algorithm to create natural breaks
    var clusters = ss.ckmeans(domainArray, 6);
    //reset domain array to cluster minimums
    domainArray = clusters.map(function(d){
        return d3.min(d);
    });
    //remove first value from domain array to create class breakpoints
    //console.log(domainArray);
    domainArray.shift();

    //assign array of last 4 cluster minimums as domain
    colorScale.domain(domainArray);
    //console.log(domainArray);

    return colorScale;
};


//function to test for data value and return color
function choropleth(props, colorScale){
    //make sure attribute value is a number
    var val = parseFloat(props[expressed]);
    console.log(val)
    //if attribute value exists, assign a color; otherwise assign gray
    if (typeof val == 'number' && !isNaN(val)){
        return colorScale(val);
    } else {
        return "#CCC";
    };
};


function setEnumerationUnits(Counties_Georgia, map, path, colorScale){
    //...REGIONS BLOCK FROM MODULE 8
    //add France regions to map
    var regions = map.selectAll(".regions")
        .data(Counties_Georgia)
        .enter()
        .append("path")
        .attr("class", function(d){
            return "regions " + d.properties.NAME10;
        })
        .attr("d", path)
        .style("fill", function(d){
            return choropleth(d.properties, colorScale);
        })
        .on("mouseover", function(d){
            highlight(d.properties);
        })
        .on("mouseout", function(d){
            dehighlight(d.properties);
        })
        .on("mousemove", moveLabel);
    
    //below Example 2.2 line 16...add style descriptor to each path
    var desc = regions.append("desc")
    .text('{"stroke": "#000", "stroke-width": "0.5px"}');
};

//function to create coordinated bar chart
function setChart(csvData, colorScale){

    //create a second svg element to hold the bar chart
    var chart = d3.select("body")
        .append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("class", "chart");

    //create a rectangle for chart background fill
    var chartBackground = chart.append("rect")
        .attr("class", "chartBackground")
        .attr("width", chartInnerWidth)
        .attr("height", chartInnerHeight)
        .attr("transform", translate);


    //set bars for each province
    var bars = chart.selectAll(".bar")
        .data(csvData)
        .enter()
        .append("rect")
        .sort(function(a, b){
            return b[expressed]-a[expressed]
        })
        .attr("class", function(d){
            return "bar " + d.NAME10;
        })
        .attr("width", chartInnerWidth / csvData.length - 1)
        .on("mouseover", highlight)
        .on("mouseout", dehighlight)
        .on("mousemove", moveLabel);

    //below Example 2.2 line 31...add style descriptor to each rect
    var desc = bars.append("desc")
    .text('{"stroke": "none", "stroke-width": "0px"}');

    //create a text element for the chart title
    var chartTitle = chart.append("text")
        .attr("x", 40)
        .attr("y", 40)
        .attr("class", "chartTitle")
        .text("Number of " + expressed + " voters per GA county");

    //create vertical axis generator
    var yAxis = d3.axisLeft()
        .scale(yScale);

    //place axis
    var axis = chart.append("g")
        .attr("class", "axis")
        .attr("transform", translate)
        .call(yAxis);

    //create frame for chart border
    var chartFrame = chart.append("rect")
        .attr("class", "chartFrame")
        .attr("width", chartInnerWidth)
        .attr("height", chartInnerHeight)
        .attr("transform", translate);

    //set bar positions, heights, and colors
    updateChart(bars, csvData.length, colorScale);
};

//Example 1.1 line 1...function to create a dropdown menu for attribute selection
function createDropdown(csvData){
    //add select element
    var dropdown = d3.select("body")
        .append("select")
        .attr("class", "dropdown")
        .on("change", function(){
            changeAttribute(this.value, csvData)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Attribute");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(attrArray)
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d){ return d });
};

//Example 1.4 line 14...dropdown change listener handler
function changeAttribute(attribute, csvData){
    //change the expressed attribute
    expressed = attribute;


    // change yscale dynamically
    csvmax = d3.max(csvData, function(d) { return parseFloat(d[expressed]); });
    
    yScale = d3.scaleLinear()
        .range([chartHeight - 10, 0])
        .domain([0, csvmax*1.1]);

    //updata vertical axis 
    d3.select(".axis").remove();
    var yAxis = d3.axisLeft()
        .scale(yScale);

    //place axis
    var axis = d3.select(".chart")
        .append("g")
        .attr("class", "axis")
        .attr("transform", translate)
        .call(yAxis);
    

    //recreate the color scale
    var colorScale = makeColorScale(csvData);

    //recolor enumeration units
    var regions = d3.selectAll(".regions")
        .transition()
        .duration(1000)
        .style("fill", function(d){
            return choropleth(d.properties, colorScale)
        });

    //re-sort, resize, and recolor bars
    var bars = d3.selectAll(".bar")
        //re-sort bars
        .sort(function(a, b){
            return b[expressed] - a[expressed];
        })
        .transition() //add animation
        .delay(function(d, i){
            return i * 20
        })
        .duration(500);

    updateChart(bars, csvData.length, colorScale);
};

//function to position, size, and color bars in chart
function updateChart(bars, n, colorScale){
    //position bars
    bars.attr("x", function(d, i){
            return i * (chartInnerWidth / n) + leftPadding;
        })
        //size/resize bars
        .attr("height", function(d, i){
            return 463 - yScale(parseFloat(d[expressed]));
        })
        .attr("y", function(d, i){
            return yScale(parseFloat(d[expressed])) + topBottomPadding;
        })
        //color/recolor bars
        .style("fill", function(d){
            return choropleth(d, colorScale);
        });
    
    //chart title text
    var chartTitle = d3.select(".chartTitle")
        .text("Population of " + expressed + " Voters (by County)");
};

//function to highlight enumeration units and bars
function highlight(props){
    //change stroke
    var selected = d3.selectAll("." + props.NAME10)
        .style("stroke", "yellow")
        .style("stroke-width", "3");
    
    setLabel(props);
};

//function to reset the element style on mouseout
function dehighlight(props){
    var selected = d3.selectAll("." + props.NAME10)
        .style("stroke", function(){
            return getStyle(this, "stroke")
        })
        .style("stroke-width", function(){
            return getStyle(this, "stroke-width")
        });
    
    //below Example 2.4 line 21...remove info label
    d3.select(".infolabel")
        .remove();

    function getStyle(element, styleName){
        var styleText = d3.select(element)
            .select("desc")
            .text();

        var styleObject = JSON.parse(styleText);

        return styleObject[styleName];
    };
};

//function to create dynamic label
function setLabel(props){
    //label content
    var labelAttribute = "<h1>" + props[expressed] +
        "</h1><b> Number of " + expressed + " Voters</b>";

    //create info label div
    var infolabel = d3.select("body")
        .append("div")
        .attr("class", "infolabel")
        .attr("id", props.NAME10 + "_label")
        .html(labelAttribute);

    var regionName = infolabel.append("div")
        .attr("class", "labelname")
        .html(props.name);
};

//function to move info label with mouse
//Example 2.8 line 1...function to move info label with mouse
function moveLabel(){
    //get width of label
    var labelWidth = d3.select(".infolabel")
        .node()
        .getBoundingClientRect()
        .width;

    //use coordinates of mousemove event to set label coordinates
    var x1 = d3.event.clientX + 10,
        y1 = d3.event.clientY - 75,
        x2 = d3.event.clientX - labelWidth - 10,
        y2 = d3.event.clientY + 25;

    //horizontal label coordinate, testing for overflow
    var x = d3.event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1; 
    //vertical label coordinate, testing for overflow
    var y = d3.event.clientY < 75 ? y2 : y1; 

    d3.select(".infolabel")
        .style("left", x + "px")
        .style("top", y + "px");
};

})(); //last line of main.js