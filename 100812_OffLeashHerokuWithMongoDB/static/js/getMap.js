navigator.geolocation.getCurrentPosition(
gotPosition,
errorGettingPosition,
  {'enableHighAccuracy':true,'timeout':10000,'maximumAge':0})

function gotPosition(obj){
console.log(obj )
  lati=obj.coords.latitude
  long=obj.coords.longitude
  
var map = mapbox.map('map');
  map.addLayer(mapbox.layer().id('markbreneman.map-srwqhs7g'));
  map.setZoomRange(0, 17);
  map.center({lat: lati, lon: long});
  map.zoom(17, true);
  map.ui.zoomer.add();
  map.ui.zoombox.add();
  map.ui.legend.add();
  map.ui.attribution.add();
  map.ui.refresh();
  map.interaction.auto();
}

function errorGettingPosition(err)
{
  if(err.code==1)
  {
    console.log("User denied geolocation.");
  }
  else if(err.code==2)
  {console.log("Position unavailable.");
  }
  else if(err.code==3)
  {
    console.log("Timeout expired.");
  }
  else
  {
    console.log("ERROR:"+ err.message);
  }

  lati=40.733815
  long=-73.993707
  var map = mapbox.map('map');
  map.addLayer(mapbox.layer().id('markbreneman.map-srwqhs7g'));
  map.setZoomRange(0, 17);
  map.center({lat: lati, lon: long});
  map.zoom(17, true);
  map.ui.zoomer.add();
  map.ui.zoombox.add();
  map.ui.legend.add();
  map.ui.attribution.add();
  map.ui.refresh();
  map.interaction.auto();

}