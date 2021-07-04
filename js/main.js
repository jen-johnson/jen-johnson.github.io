/* Leaflet Proportional Symbols Example */

//GOAL: Proportional symbols representing attribute values of mapped features

//Step 1: Create the Leaflet map
function createMap(){
    //create the map
    var map = L.map('mapid', {
        center: [20, 0],
        zoom: 2
    });

    //add OSM base tilelayer
//    L.tileLayer('https://api.mapbox.com/styles/v1/jennamj13/ckn9mlygj0bwy17p5e6villpa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamVubmFtajEzIiwiYSI6ImNrbXAwcmFpeDBidG8ycHQ5cTV3eHltZGcifQ.XOONew0p_zpFabjGHU8aXQ', {
//maxZoom: 18,
//attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//}).addTo(map);
    
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamVubmFtajEzIiwiYSI6ImNrbXAwcmFpeDBidG8ycHQ5cTV3eHltZGcifQ.XOONew0p_zpFabjGHU8aXQ'
}).addTo(map);

var grayscale =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamVubmFtajEzIiwiYSI6ImNrbXAwcmFpeDBidG8ycHQ5cTV3eHltZGcifQ.XOONew0p_zpFabjGHU8aXQ'
}).addTo(map);
    
var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}).addTo(map);

var Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	maxZoom: 13
}).addTo(map);

var iconmarker = L.icon({
    iconUrl:'img/icon.png',
    iconSize:     [20, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})
    
var china     = L.marker([36.56, 103.8],{icon:iconmarker}).bindPopup('CO2 emssions in China increased by 44% in the ten years.'),
    india    = L.marker([22.8,79.61],{icon:iconmarker}).bindPopup('CO2 emssions in India increased by 63% in the ten years.'),
    US    = L.marker([45.679547, -112.461],{icon:iconmarker}).bindPopup('CO2 emssions in the United States decreased by 19% in the ten years.'),
    Indonesia    = L.marker([-2.21505, 117.2401],{icon:iconmarker}).bindPopup('CO2 emssions in Indonesia increased by 43% in the ten years.');
    Pakistan   = L.marker([29.9497515, 69.33957937],{icon:iconmarker}).bindPopup('CO2 emssions in Pakistan increased by 11% in the ten years.');
    Brazil    = L.marker([-10.787777, -53.097831],{icon:iconmarker}).bindPopup('CO2 emssions in Brazil increased by 21% in the ten years.');
    Nigeria    = L.marker([9.59411452, 8.08943895],{icon:iconmarker}).bindPopup('CO2 emssions in Nigeria decreased by 6% in the ten years.');
    Bangladesh   = L.marker([23.86731158, 90.23812743],{icon:iconmarker}).bindPopup('CO2 emssions in Bangladesh increased by 72% in the ten years.');
    Russia    = L.marker([61.98052209, 96.68656112],{icon:iconmarker}).bindPopup('CO2 emssions in Russian Federation increased by 3% in the ten years.');
    Mexico   = L.marker([23.94753724, -102.5234517],{icon:iconmarker}).bindPopup('CO2 emssions in Mexico decreased by 11% in the ten years.');
    Japan    = L.marker([37.59230135, 138.0308956],{icon:iconmarker}).bindPopup('CO2 emssions in Japan decreased by 7% in the ten years.');
    Ethiopia    = L.marker([8.62278679, 39.60080098],{icon:iconmarker}).bindPopup('CO2 emssions in Ethiopia increased by 105% in the ten years.');
    Phillippines   = L.marker([11.77536778, 122.8839325],{icon:iconmarker}).bindPopup('CO2 emssions in Philippines increased by 53% in the ten years.');
    Egypt    = L.marker([26.49593, 29.861900],{icon:iconmarker}).bindPopup('CO2 emssions in Egypt increased by 9% in the ten years.');
    Vietnam    = L.marker([16.64602, 106.2991],{icon:iconmarker}).bindPopup('CO2 emssions in Vietnam increased by 69% in the ten years.');
var cities = L.layerGroup([china, india, US, Indonesia, Pakistan, Brazil, Nigeria, Bangladesh, Russia, Mexico, Japan, Ethiopia, Phillippines, Egypt, Vietnam]);
    cities.addTo(map)


    var overlayMaps = {
    "Percent Change (CO2)": cities,
};
    var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets,
    "Esri Gray Canvas": Esri_WorldGrayCanvas,
    "Esri World Shaded Relief": Esri_WorldShadedRelief
};
L.control.layers(baseMaps, overlayMaps).addTo(map);

L.control.scale().addTo(map);

getData(map);
//    var emissions = getData(map);
};


//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = 280;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
};

//Example 1.2 line 1...Popup constructor function
function Popup(properties, attribute, layer, radius){
    this.properties = properties;
    this.attribute = attribute;
    this.layer = layer;
    this.year = attribute.split("_")[1];
    console.log(this.year)
    this.population = this.properties[attribute];
    this.content = "<p><b>Country:</b> " + this.properties.City + "</p><p><b>CO2 Emissions in " + this.year + ":</b> " + this.population + " metric tons.</p>";

    this.bindToLayer = function(){
        this.layer.bindPopup(this.content, {
            offset: new L.Point(0,-radius)
        });
    };
};

//function to convert markers to circle markers
function pointToLayer(feature, latlng, attributes){
    //Assign the current attribute based on the first index of the attributes array
    var attribute = attributes[0];

    //create marker options
    var options = {
        fillColor: "#80c904",
        color: "#80c904",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    //Example 1.3 line 1...in pointToLayer()
    //create new popup
    var popup = new Popup(feature.properties, attribute, layer, options.radius);

    //add popup to circle marker
    popup.bindToLayer();

    //event listeners to open popup on hover and fill panel on click
    layer.on({
        mouseover: function(){
            this.openPopup();
        },
        mouseout: function(){
            this.closePopup();
        }//,
    //  click: function(){
    //      $("#panel").html(panelContent);
    //  }
    });

    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};


//build an attributes array from the data
function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;
    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("Pop") > -1){
            attributes.push(attribute);
        };
    };

    return attributes;
};

//Add circle markers for point features to the map
function createPropSymbols(data, map, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

//Step 10: Resize proportional symbols according to new attribute values
function updatePropSymbols(map, attribute){
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            //access feature properties
            var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);

            //Example 1.3 line 6...in UpdatePropSymbols()
            var popup = new Popup(props, attribute, layer, radius);

            //add popup to circle marker
            popup.bindToLayer();
        };
    });

    updateLegend(map, attribute);
};


function createLegend(map, attributes){
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legend-control-container');

            //add temporal legend div to container
            $(container).append('<div id="temporal-legend" font-display=bold>')

            //Example 3.5 line 15...Step 1: start attribute legend svg string
            var svg = '<svg id="attribute-legend" width="160px" height="60px" fill="#fff">';

            // //array of circle names to base loop on
            // var circles = ["max", "mean", "min"];

            //object to base loop on...replaces Example 3.10 line 1
            var circles = {
                max: 20,
                mean: 40,
                min: 60
            };

            // //Step 2: loop to add each circle and text to svg string
            // for (var i=0; i<circles.length; i++){
            //     //circle string
            //     svg += '<circle class="legend-circle" id="' + circles[i] + 
            //     '" fill="#F47821" fill-opacity="0.8" stroke="#000000" cx="30"/>';

            //     //text string
            //     svg += '<text id="' + circles[i] + '-text" x="65" y="60"></text>';
            // };

            //loop to add each circle and text to svg string
            for (var circle in circles){
                //circle string
                svg += '<circle class="legend-circle" id="' + circle + '" fill="#80c904" fill-opacity="0.8" stroke="#000000" cx="30"/>';

                //text string
                svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
            };

            //close svg string
            svg += "</svg>";
            console.log(svg);

            //add attribute legend svg to container
            $(container).append(svg);

            return container;
        }
    });

    map.addControl(new LegendControl());

    updateLegend(map, attributes[0]);
};

//Calculate the max, mean, and min values for a given attribute
function getCircleValues(map, attribute){
    //start with min at highest possible and max at lowest possible number
    var min = Infinity,
        max = -Infinity;

    map.eachLayer(function(layer){
        //get the attribute value
        if (layer.feature){
            var attributeValue = Number(layer.feature.properties[attribute]);

            //test for min
            if (attributeValue < min){
                min = attributeValue;
            };

            //test for max
            if (attributeValue > max){
                max = attributeValue;
            };
        };
    });

    //set mean
    var mean = (max + min) / 2;

    //return values as an object
    return {
        max: max,
        mean: mean,
        min: min
    };
};

//Example 3.7 line 1...Update the legend with new attribute
function updateLegend(map, attribute){
    //create content for legend
    var year = attribute.split("_")[1];
    var content = "CO2 Emissions per Capita " + year;

    //replace legend content
    $('#temporal-legend').html(content);

    //get the max, mean, and min values as an object
    var circleValues = getCircleValues(map, attribute);

    for (var key in circleValues){
        //get the radius
        var radius = calcPropRadius(circleValues[key]);

        //Step 3: assign the cy and r attributes
        $('#'+key).attr({
            cy: 59 - radius,
            r: radius
        });

        //Step 4: add legend text
        $('#'+key+'-text').text(Math.round(circleValues[key]*100)/100 + " metric tons");
    };
};

function createSearchControl(map, attribute){
    var markersLayer = new L.LayerGroup();	//layer contain searched elements
	
	map.addLayer(markersLayer);

	var controlSearch = new L.Control.Search({
		position:'topright',		
		layer: markersLayer,
		initial: false,
		zoom: 12,
		marker: false
	});

	map.addControl( controlSearch );

                              };

//Step 1: Create new Leaflet control
function createSequenceControls(map, attributes){
    var SequenceControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function (map) {
            // create the control container div with a particular class name
            var container = L.DomUtil.create('div', 'sequence-control-container');

            //create range input element (slider)
            $(container).append('<input class="range-slider" type="range">');

            //add skip buttons
            $(container).append('<button class="skip" id="reverse" title="Reverse"><img src="img/reverse.png"></button>');
            $(container).append('<button class="skip" id="forward" title="Forward"><img src="img/forward.png"></button>');
//            $('#reverse').html('<img src="img/reverse.png">');
            $('#forward').html('<img src="img/forward.png">');

            //disable any mouse event listeners for the container
            L.DomEvent.disableClickPropagation(container);

            return container;
        }
    });

    map.addControl(new SequenceControl());

	//set slider attributes
	$('.range-slider').attr({
		max: 9,
		min: 0,
		value: 0,
		step: 1
	});

	//replace button content with images

//	$('#reverse').html('<img src="img/reverse.png">');
//	$('#forward').html('<img src="img/forward.png">');

	//click listener for buttons
	$('.skip').click(function(){

		//get the old index value
		var index = $('.range-slider').val();

		//increment or decriment depending on button clicked
		if ($(this).attr('id') == 'forward'){
			index++;
			//if past the last attribute, wrap around to first attribute
			index = index > 9 ? 0 : index;
		} else if ($(this).attr('id') == 'reverse'){
			index--;
			//if past the first attribute, wrap around to last attribute
			index = index < 0 ? 9 : index;
		};

		//update slider
		$('.range-slider').val(index);

		//pass new attribute to update symbols
		updatePropSymbols(map, attributes[index]);
	});

	//input listener for slider
	$('.range-slider').on('input', function(){
		//get the new index value
		var index = $(this).val();

		//pass new attribute to update symbols
		updatePropSymbols(map, attributes[index]);
	});
};


	
//Import GeoJSON data
function getData(map){
    //load the data
    $.ajax("data/emission.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);

            createPropSymbols(response, map, attributes);
            createSequenceControls(map, attributes);
            createLegend(map, attributes);

        }
    });
};


$(document).ready(createMap);
