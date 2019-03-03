var mymap;
var lyrOSM;
var lyrPlayers;
var lyrMarkerCluster;
var lyrSearch;
var ctlAttribute;
var ctlSidebar;
var ctlEasyButton;
var ctlLayers
var objBasemaps;
var objOverlays;
var arPlayerNames = [];
var zoomHome;




    $(document).ready(function(){
        
        // Initialize Map
        
        mymap=L.map('mapdiv', {center:[38.7,-100.8], zoom:4,zoomControl:false});
        lyrOSM =L.tileLayer('https://api.mapbox.com/styles/v1/arraraza/cjanik8r6emw42slm9pwkw211/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJyYXJhemEiLCJhIjoiY2lwcTVyemEwMDViMWZ3bmNwNzd5ZnBuaiJ9.oKGKIzA2cio0rr4gSmG4WQ');
        mymap.addLayer(lyrOSM);
        
        zoomHome = L.Control.zoomHome();
        zoomHome.addTo(mymap);
        
        ctlSidebar = L.control.sidebar('side-bar').addTo(mymap);
            setTimeout(function () {
                ctlSidebar.show();
            }, 500);
        
        ctlEasyButton = L.easyButton('<img src ="img/menu.png">', function(){ ctlSidebar.toggle();}).addTo(mymap);
        
        // Initialize Layer
        lyrMarkerCluster = L.markerClusterGroup();
        lyrPlayers = L.geoJSON(players,{pointToLayer:returnPlayerMarker});
        /*lyrPlayers.on('data:loaded', function(){
                    arPlayerNames.sort(function(a,b){return a-b});
            */
                    $("#txtFindPlayer").autocomplete({
                        minLength: 3,
                        source:arPlayerNames
                    });
        //});
        
        lyrMarkerCluster.addLayer(lyrPlayers);
        lyrMarkerCluster.addTo(mymap);
            
        objBasemaps = {
            "Mapbox": lyrOSM
        }
        
        
        objOverlays = {
            "View Players as Points":lyrPlayers,
            "View Players as Clusters": lyrMarkerCluster
        }
        
         ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(mymap);
        
        ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(mymap)
        ctlAttribute.addAttribution('Mapbox');
        
        
        
    console.log('on load complete')
        
    
       
    });

    // Layer functions
    
         function returnPlayerMarker(json, latlng){
                var att = json.properties;
                
                att.index = att.first_name + " " + att.last_name;
                arPlayerNames.push(att.name);
             
                return L.circle(latlng, {radius:500, color:'darkred',fillColor:'red', fillOpacity:0.5}).bindPopup("<b>"+att.index+"</b>"+
                            "<br>"+ "Position: "+att.position_+
                            "<br>"+"College: "+att.schoolName +
                            "<br>"+"Hometown: " +att.city +", "+att.state_abbr+
                            "<br>"+"High School: "+att.highschool +
                            "<br>"+"HS Graduation: "+att.recruitYea+
                            "<br>"+"National Rank: "+att.rank+ 
                            "<br>"+"Rivals Profile: "+'<a href ="'+att.prospect_u+'" target="_blank">Link</a>'
                           ).bindTooltip("<b>"+att.index+"</b>"+
                            "<br>"+ "Position: "+att.position_+
                            "<br>"+"College: "+att.schoolName +
                            "<br>"+"Hometown: " +att.city +", "+att.state_abbr+
                            "<br>"+"High School: "+att.highschool +
                            "<br>"+"HS Graduation: "+att.recruitYea+
                            "<br>"+"National Rank: "+att.rank+ 
                            "<br>"+"Rivals Profile: "+'<a href ="'+att.prospect_u+'" target="_blank">Link</a>'
                           );
            };

        
        $("#txtFindPlayer").on('keyup paste', function(){
                var val = $("#txtFindPlayer").val();
                
                testLayerAttribute(arPlayerNames, val, "Player Name", "#divFindPlayer", "#divPlayerError", "#btnFindPlayer");
            });

            $("#btnFindPlayer").click(function(){
                var val = $("#txtFindPlayer").val();
                var lyr = returnLayerByAttribute(lyrPlayers,'name',val);
                if (lyr) {
                    if (lyrSearch) {
                        lyrSearch.remove();
                    }
                    
                    lyrSearch = L.circle(lyr.getLatLng(), {radius:800, color:'blue', weight:10, opacity:.9, fillOpacity:0}).addTo(mymap);
                    mymap.setView(lyr.getLatLng(),12);
                    var att = lyr.feature.properties;
                    $("#divPlayerData").html("<b>"+att.index+"</b>"+
                            "<br>"+ "Position: "+att.position_+
                            "<br>"+"College: "+att.schoolName +
                            "<br>"+"Hometown: " +att.city +", "+att.state_abbr+
                            "<br>"+"High School: "+att.highschool +
                            "<br>"+"HS Graduation: "+att.recruitYea+
                            "<br>"+"National Rank: "+att.rank+
                            "<br>"+"Rivals Profile: "+'<a href ="'+att.prospect_u+'" target="_blank">Link</a>');
                    $("#divPlayerError").html("");
                } else {
                    $("#divPlayerError").html("Select a Player");
                }
                
            });
            
            $("#lblPlayer").click(function(){
                $("#divPlayerData").toggle(); 
           
            });

 
 
// **** General Functions
console.log(arPlayerNames)
     function returnLayerByAttribute(lyr,att,val) {
                var arLayers = lyr.getLayers();
                console.log(arLayers.length)
                for (i=0;i<arLayers.length-1;i++) {
                    var ftrVal = arLayers[i].feature.properties[att];
                    if (ftrVal==val) {
                        return arLayers[i];
                    }
                }
                return false;
            }
            
            function testLayerAttribute(ar, val, att, fg, err, btn) {
                if (ar.indexOf(val)<0) {
                    $(fg).addClass("has-error");
                    $(err).html("Select player from list");
                    $(btn).attr("disabled", true);
                } else {
                    $(fg).removeClass("has-error");
                    $(err).html("");
                    $(btn).attr("disabled", false);
                }
            }
        
        