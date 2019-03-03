var mymap;
var lyrOSM;
var lyrPlayers;
var lyrMarkerCluster;
var lyrSearch;
var ctlAttribute;
var ctlSidebar;
var ctlEasyButton;
var ctlLayers
var objOverlays;
var arPlayerNames = [];




    $(document).ready(function(){
        
        // Initialize Map
        
        mymap=L.map('mapdiv', {center:[38.7,-100.8], zoom:4});
        lyrOSM =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
        mymap.addLayer(lyrOSM);
        
        ctlSidebar = L.control.sidebar('side-bar').addTo(mymap);
            setTimeout(function () {
                ctlSidebar.show();
            }, 500);
        
        ctlEasyButton = L.easyButton('<img src ="img/menu.png">', function(){ ctlSidebar.toggle();}).addTo(mymap);
        
        // Initialize Layer
        lyrMarkerCluster = L.markerClusterGroup();
        lyrPlayers = L.geoJSON(players,{pointToLayer:returnPlayerMarker});
        lyrMarkerCluster.addLayer(lyrPlayers);
        lyrMarkerCluster.addTo(mymap);
            
        
        
        
        objOverlays = {
            "2005 Players":lyrPlayers
        }
        
        
        
        ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(mymap)
        ctlAttribute.addAttribution('OSM');
        
        
        
    console.log('on load complete')
        
    
    var searchCtrl = L.control.fuseSearch()
    searchCtrl.addTo(map);
    
    });

    // Layer functions
    
         function returnPlayerMarker(json, latlng){
                var att = json.properties;
                
                att.index = att.first_name + " " + att.last_name;
                arPlayerNames.push(att.index);
                return L.circle(latlng, {radius:500, color:'red',fillColor:'yellow', fillOpacity:0.5}).bindPopup("<b>"+att.index+"</b>"+
                            "<br>"+ "Position: "+att.position_+
                            "<br>"+"College: "+att.schoolName +
                            "<br>"+"Hometown: " +att.city +", "+att.state_abbr+
                            "<br>"+"High School: "+att.highschool +
                            "<br>"+"HS Graduation: "+att.recruitYea+
                            "<br>"+"Rivals Profile: "+'<a href ="'+att.prospect_u+'" target="_blank">Link</a>'
                           );
            };

        
        

 
 
// **** General Functions

        
        
        
