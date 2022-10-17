require(["esri/config","esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer",
      "esri/widgets/BasemapToggle", 
      "esri/widgets/Compass", 
      "esri/widgets/Editor", 
      "esri/widgets/Measurement", 
      "esri/widgets/LayerList",
      "esri/Basemap",
      "esri/layers/VectorTileLayer",
      "esri/layers/TileLayer",
      "esri/widgets/Widget",
      "esri/core/watchUtils",
      "esri/widgets/Expand",
      "esri/renderers/SimpleRenderer",
      "esri/widgets/Legend",
      "esri/widgets/Attachments",
      "esri/symbols/WebStyleSymbol",
      "esri/widgets/Search"], function (esriConfig,Map, MapView, FeatureLayer, BasemapToggle, Compass, Editor, Measurement, LayerList, Basemap, VectorTileLayer, TileLayer, Widget, watchUtils, Expand, SimpleRenderer, Legend, Attachments, WebStyleSymbol, Search) {

        esriConfig.apiKey = "AAPK2dc099197bf6460395e2b804d689e2b1W_oi4RgvmUIGuDs4e83Vo8JEr1o_A1dZz53SJelHJUMw7VuHL_4c_uKhrQvqK_aH";

  const vectorTileLayer = new VectorTileLayer({
    portalItem: {
      id: "9696d912500d40b7b07680c04f3f82d1" // Forest and Parks Canvas
    },
    opacity: .75
  });

  const imageTileLayer = new TileLayer({
    portalItem: {
      id: "9696d912500d40b7b07680c04f3f82d1" // World Hillshade
    }
  });

  const basemap = new Basemap({
    baseLayers: [

      imageTileLayer,
      vectorTileLayer

    ]
  });

 
 
 
 
  const beachSymbol = new WebStyleSymbol({
  name: "beach",
  styleName: "Esri2DPointSymbolsStyle"
});
  let citiesRenderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: beachSymbol
};

const poiSymbol = new WebStyleSymbol({
  name: "star",
  styleName: "Esri2DPointSymbolsStyle"
});
let poiRenderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: poiSymbol
};       




      
      const snorkel = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Geog_777_P2_gdb/FeatureServer/0"
      });
// const apikey = YOUR_API_KEY ;
  const map = new Map({
    basemap: basemap,
    // layers: [snorkel, layer]
  });



  const view = new MapView({
    container: "viewDiv",
    map: map,

    center: [-64.737114,18.338432],
    zoom: 12.8

  });
  const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-navigation"
     });
     view.ui.add(basemapToggle,"bottom-right");

     const compass = new Compass({
            view: view
        })
        view.ui.add(compass, "top-left");

        
        const featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Geog_777_P2_gdb/FeatureServer/0",
          SimpleRenderer:citiesRenderer,
          popupTemplate: {
            title: "Snorkeling",
            lastEditInfoEnabled: false,
            // actions: [
            //   {
            //     id: "find-brewery",
            //     image: "https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/",
            //     title: "More Information"
            //   }
            // ],
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "name"
                  },
                  {
                    fieldName: "description",
                    label: "description"
                  },
                  {
                    fieldName: "Photos and Files"
                  },
                  {
                    fieldName: "Rating"
                  },
                 
                ]
              },
              {
                // You can also set a descriptive text element. This element
                // uses an attribute from the featurelayer which displays a
                // sentence giving the total amount of trees value within a
                // specified census block. Text elements can only be set within the content.
                type: "text", // TextContentElement
                text: "There are {description} trees within census block {name}"
              },
              {
                // You can set a attachment element(s) within the popup as well.
                // Similar to text and media elements, attachments can only be set
                // within the content. Any attachmentInfos associated with the feature
                // will be listed in the popup.
                type: "attachments" // AttachmentsContentElement
              }
              // {
              //   type:"media",
              //   mediaInfos:[
              //    {title:"<b> Picture</b>",
              //   type:"image",
              //   // sourceURL:
              //   //         "https://www.sunset.com/wp-content/uploads/96006df453533f4c982212b8cc7882f5-800x0-c-default.jpg"} 
              //  } ]


              // }
            ]
          }
        });

        map.add(featureLayer);
      
        const hikingLayer = new FeatureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Hiking_Trails/FeatureServer",
          // SimpleRenderer:citiesRenderer,
          popupTemplate: {
            title: "{name}",
            lastEditInfoEnabled: false,
            // actions: [
            //   {
            //     id: "find-brewery",
            //     image: "https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/",
            //     title: "More Information"
            //   }
            // ],
           
            content: [
            {
                // You can also set a descriptive text element. This element
                // uses an attribute from the featurelayer which displays a
                // sentence giving the total amount of trees value within a
                // specified census block. Text elements can only be set within the content.
                type: "text", // TextContentElement
                text: "{descriptio}"
              },
              {
              
                type: "fields",
                fieldInfos: [
                 
                  {
                    fieldName: "length",
                    label: "Length (miles)"
                  },
                  {
                    fieldName: "Difficulty"
                  },
                  {
                    fieldName: "Rating"
                  },
                 
                ]
              },
              
              {
                // You can set a attachment element(s) within the popup as well.
                // Similar to text and media elements, attachments can only be set
                // within the content. Any attachmentInfos associated with the feature
                // will be listed in the popup.
                type: "attachments" // AttachmentsContentElement
              }
              // {
              //   type:"media",
              //   mediaInfos:[
              //    {title:"<b> Picture</b>",
              //   type:"image",
              //   // sourceURL:
              //   //         "https://www.sunset.com/wp-content/uploads/96006df453533f4c982212b8cc7882f5-800x0-c-default.jpg"} 
              //  } ]


              // }
            ]
          }
        });

        map.add(hikingLayer);
      
        const usviLayer = new FeatureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/The_USVI_National_Park/FeatureServer",
          renderer: citiesRenderer,
          // SimpleRenderer:citiesRenderer,
          popupTemplate: {
            title: "{name}",
            lastEditInfoEnabled: false,
            // actions: [
            //   {
            //     id: "find-brewery",
            //     image: "https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/",
            //     title: "More Information"
            //   }
            // ],
           
            content: [
            {
                // You can also set a descriptive text element. This element
                // uses an attribute from the featurelayer which displays a
                // sentence giving the total amount of trees value within a
                // specified census block. Text elements can only be set within the content.
                type: "text", // TextContentElement
                text: "<b>Visiters say: </b>{comment}"
              },
              
              
              {
                // You can set a attachment element(s) within the popup as well.
                // Similar to text and media elements, attachments can only be set
                // within the content. Any attachmentInfos associated with the feature
                // will be listed in the popup.
                type: "attachments" // AttachmentsContentElement
              }
              // {
              //   type:"media",
              //   mediaInfos:[
              //    {title:"<b> Picture</b>",
              //   type:"image",
              //   // sourceURL:
              //   //         "https://www.sunset.com/wp-content/uploads/96006df453533f4c982212b8cc7882f5-800x0-c-default.jpg"} 
              //  } ]


              // }
            ]
          }
        });

        map.add(usviLayer);

//INSERT UNIQUE VALUE POI STUFF HERE



        const boundary = new FeatureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/The_USVI_National_Park/FeatureServer/1",
          // SimpleRenderer:citiesRenderer,
          
        });

        map.add(boundary);
      const editor = new Editor({
        view: view
      });
      // Add widget to the view
      // view.ui.add(editor, "top-right");

      const bgExpand = new Expand({
  view: view,
  content: editor
});

// Add the expand instance to the ui

view.ui.add(bgExpand, "bottom-left");

const searchWidget = new Search({
          view: view
        });

        // Add the search widget to the top right corner of the view
        view.ui.add(searchWidget, {
          position: "bottom-left"
        });

let legend = new Legend({
  view: view,
  style: "card"
});

// view.ui.add(legend, "bottom-right");
const layerList = new LayerList({
          view: view,
          listItemCreatedFunction: (event) => {
            const item = event.item;
            if (item.layer.type != "group") {
              // don't show legend twice
              item.panel = {
                content: "legend",
                open: true
              };
            }
          }
        });
        

        const legExpand = new Expand({
  view: view,
  content: layerList
});
view.ui.add(legExpand, "bottom-left");

const sqlExpressions = ["Choose a SQL where clause...", "type = 1"]
      // UI
      const selectFilter = document.createElement("select");
      selectFilter.setAttribute("class", "esri-widget esri-select");
      selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next W00; font-size: 1em;");

      sqlExpressions.forEach(function(sql){
        let option = document.createElement("option");
        option.value = sql;
        option.innerHTML = sql;
        selectFilter.appendChild(option);
      });
//view.ui.add(selectFilter, "bottom-left");

      //       const queryLayer = new FeatureLayer({
      //   url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/USVI_Points_of_Interest_/FeatureServer",
      //   outFields: ["*"],
      //   popupTemplate: {
      //     title: "{name}",
      //     content: "Description: {Descriptio}. Land value: {Roll_LandValue}"
      //   },
      //   definitionExpression: "1=0"
      // });
      // map.add(queryLayer);
      //     // Server-side filter
      //     function setFeatureLayerFilter(expression) {
      //       queryLayer.definitionExpression = expression;
      //     }
      //     selectFilter.addEventListener('change', function (event) {
      //       setFeatureLayerFilter(event.target.value);
      //     });
  });