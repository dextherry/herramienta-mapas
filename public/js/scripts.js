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
  var pjmap_1 = [[-12.0716307, -76.9839603], [-12.0705815, -76.9836599], [-12.0684412, -76.9836599], [-12.0665947, -76.9840462], [-12.0652517, -76.9844324], [-12.0636989, -76.9847328], [-12.0634471, -76.9824154], [-12.0608871, -76.9787676], [-12.0592923, -76.9757206], [-12.0581591, -76.9720728], [-12.055725, -76.9670946], [-12.047338610782685, -76.94666950089822], [-12.0510597, -76.9561949], [-12.0406091, -76.9607439], [-12.040693, -76.9614306], [-12.0408404, -76.9627002], [-12.0416168, -76.9649532], [-12.0387208, -76.9664124], [-12.0406305, -76.9710901], [-12.0385949, -76.9722918], [-12.0325505, -76.964778], [-12.0312493, -76.9629326], [-12.0302084, -76.9603571], [-12.0302189, -76.9600352], [-12.0309534, -76.9596168], [-12.0316564, -76.959413], [-12.0324119, -76.9590696], [-12.0328107, -76.9588765], [-12.0325274, -76.9582113], [-12.0320657, -76.9572565], [-12.0319188, -76.9569131], [-12.033776, -76.9561299], [-12.0351053, -76.9555851], [-12.0339721, -76.9525596], [-12.0331326, -76.9498988], [-12.0362385, -76.9487401], [-12.0406875, -76.9468089], [-12.046388814290882, -76.944383511324], [-12.0445369, -76.9399444], [-12.0463416, -76.9377128], [-12.0477686, -76.937584], [-12.0497412, -76.9386998], [-12.0503288, -76.9374124], [-12.0518816, -76.9377557], [-12.0532247, -76.9378845], [-12.0577993, -76.9378415], [-12.0577993, -76.9363395], [-12.0591003, -76.9358674], [-12.0607061, -76.9379113], [-12.0615753, -76.938369], [-12.061458, -76.9398666], [-12.0635735, -76.9438797], [-12.0641197, -76.9435887], [-12.064682, -76.9450084], [-12.062694, -76.946138], [-12.062956, -76.951161], [-12.063507, -76.95209], [-12.0652937, -76.9536192], [-12.068143, -76.958456], [-12.0629233, -76.96071], [-12.0651258, -76.9671375], [-12.0668465, -76.9703991], [-12.0688609, -76.974476], [-12.0715887, -76.9809563], [-12.0716307, -76.9839603]]




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
      console.log("Clic dentro del polígono", lat + "," + lng);
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