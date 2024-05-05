//var myPolygon;
let unionCoordinates
function initialize() {
  // Map Center
  var myLatLng = new google.maps.LatLng(-12.0574925, -77.1226315);
  // General Options
  var mapOptions = {
    zoom: 12,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.RoadMap
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  // Polygon Coordinates
  var pjmap_1 = [
    
    [-12.0624945,-77.0971266],
    [-12.0627463,-77.0984141],
    [-12.0629141,-77.1012465],
    [-12.0633548,-77.1061603],
    [-12.0633758,-77.1081344],
    [-12.0641732,-77.1121256],
    [-12.0644459,-77.1141855],
    [-12.0649915,-77.1167604],
    [-12.0652051,-77.1189106],
    [-12.0654885,-77.1194361],
    [-12.0655581,-77.1191637],

    [-12.0677194,-77.1158592],
    [-12.0726295,-77.1033708],
    [-12.0739438,-77.1004803],
    [-12.0731331,-77.099208],
    [-12.0708039,-77.0985643],
    [-12.06816,-77.0977918],
    [-12.0663974,-77.0972768],
    [-12.0624945,-77.0971266],
    [-12.0624945,-77.0971266],
    [-12.0620558,-77.0939356],
    [-12.0618459,-77.0909959],
    [-12.0615495,-77.0882064],
    [-12.0611849,-77.0884478],
    [-12.060878,-77.0886114],
    [-12.060596,-77.0888],
    [-12.0601856,-77.0888018],
    [-12.057016,-77.088898],
    [-12.0560595,-77.088547],
    [-12.055655,-77.088402],
    [-12.0539637,-77.0882225],
    [-12.0519151,-77.0879972],
    [-12.0515636,-77.087973],
    [-12.0510941,-77.0849395],
    [-12.0507163,-77.0829224],
    [-12.0494992,-77.0831155],
    [-12.0485759,-77.0832443],
    [-12.048366,-77.0851755],
    [-12.0464144,-77.0855188],
    [-12.0463515,-77.086935],
    [-12.0468761,-77.0925784],
    [-12.0469391,-77.0940804],
    [-12.0472957,-77.0956469],
    [-12.0473588,-77.097063],
    [-12.0474121,-77.0982271],
    [-12.0478851,-77.0981895],
    [-12.0483949,-77.0982057],
    [-12.0513747,-77.0982486],
    [-12.0546903,-77.0977551],
    [-12.0624945,-77.0971266]
  ]

  var pjmap_2 = [
 




    
  ]




  function domap(coors) {
    let newcoors = coors.map((el => {
      return new google.maps.LatLng(el[0], el[1])
    }))
    return newcoors
  }





  let polygons = [


    [[...pjmap_1]],
    [[...pjmap_1]],
    [[...pjmap_1]],

    // [[...pjmap_2]],
  ]


  console.log("polloooo", JSON.stringify(polygons))
  let unionPolygon = turf.multiPolygon(polygons); // El primer polígono es una unión temporal

  console.log("polloooo2", unionPolygon)
  for (let i = 2; i < polygons.length; i++) {
    unionPolygon = turf.union(unionPolygon, turf.polygon(polygons[i]));
  }
  console.log("polloooo3", unionPolygon)
  unionCoordinates = unionPolygon.geometry.coordinates[0];

  console.log("unionCoordinates", JSON.stringify(unionCoordinates)); // El conjunto de coordenadas del polígono resultante
















  pjmap_1 = domap(pjmap_1)
  // pjmap_2 = domap(pjmap_2)
  console.log("veamos")
  let mapunionCoordinates = domap(unionCoordinates)

  // Styling & Controls
  myPolygon = new google.maps.Polygon({
    paths: [
      pjmap_1,
      // pjmap_2,
      // mapunionCoordinates
    ],
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });

  myPolygon.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);

  google.maps.event.addListener(myPolygon, 'click', function (event) {
    if (google.maps.geometry.poly.containsLocation(event.latLng, myPolygon)) {
      // El clic ocurrió dentro del polígono
      // Aquí puedes ejecutar la función que desees
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      document.getElementById('info').value = "Clic dentro del polígono: " + lat + "," + lng
    }
  });

}

//Display Coordinates below map
function getPolygonCoords(a) {
  console.log("quepasa1", a)
  var len = myPolygon.getPath().getLength();
  var htmlStr = "";
  for (var i = 0; i < len; i++) {
    htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
    //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
  }
  document.getElementById('info').innerHTML = htmlStr;
}


function copyToClipboard(text) {

  document.getElementById('info').value = JSON.stringify(unionCoordinates)
  // window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}