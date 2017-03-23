window.printReport = function(){
  chart1.resize({
    height: 260,
    width: 400
  });

  chart2.resize({
    height: 360,
    width: 400
  });

  $("#map").css("height", "180px")

  setTimeout(function(){window.print()}, 1000)
}

//

var array = []
for(var key in data["age"]["male"]){
  array.push(data["age"]["male"][key])
}
array.unshift("male")

var array2 = []
for(var key in data["age"]["female"]){
  array2.push(data["age"]["female"][key])
}
array2.unshift("female")


var chart1 = c3.generate({
	bindto: '#chart1',
  data: {
    columns: [
      array,
      array2
    ],
    type: 'bar',
  },

  axis: { x: {
  	type: 'category',
    categories: Object.keys(data["age"]["male"])
  }},
});

//


var chart2 = c3.generate({
  bindto: '#chart2',
    data: {
      json: [data["education"]["sum"]],
       keys: {
        value: ['Regular high school diploma', 'GED or alternative credential', 'Some college, less than 1 year', 'Some college, 1 or more years, no degree', 'Associate\'s degree', 'Bachelor\'s degree', 'Master\'s degree', 'Professional school degree', 'Doctorate degree', 'Did Not Finish High School']
      },
      type: 'bar'
      },
      color: {
      pattern: ['#E39920', '#53B5B5', '#CD249A', '#F56223', '#6FAAD6','#A33E54', '#27668D','#75AB36', '#6E37B6', '#E79F87']
      },
      size: {
        height: 380
      },
      tooltip: {
      grouped: false,
      format: {
          title: function (d) { return 'Data'},
          value: function (value, ratio, id) {
              var format = id === 'data1' ? d3.format(',') : d3.format('');
              return format(value);
          }
    }
  }
});


$("title").html(`Age and Education Report for ${data["address"]}`);
$(".address").html(data["address"]);

if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

var zoomLevel = 13;
var map = L.map('map').setView([35.7796, -78.6382], zoomLevel);
if(data.geometry.radius > 15000){
  zoomLevel = 10;
}else if(data.geometry.radius > 8000){
  zoomLevel = 11;
}else if(data.geometry.radius > 3000){
  zoomLevel = 12;
}else if(data.geometry.radius > 1000){
  zoomLevel = 13;
}
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
if(data.geometry.type == "Point"){
  var marker = L.marker([data.geometry.coordinates[1], data.geometry.coordinates[0]]).addTo(map);
  var shapeLayer = L.circle([data.geometry.coordinates[1], data.geometry.coordinates[0]], data.geometry.radius).addTo(map);
  map.setView(marker.getLatLng(), zoomLevel);
}else if(data.geometry.type == "polygon" || data.geometry.type == "Polygon"){
  var shapeLayer = L.geoJSON(data.geometry.geometry).addTo(map);
  map.fitBounds(shapeLayer.getBounds());
}