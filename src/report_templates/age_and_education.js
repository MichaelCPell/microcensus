window.printReport = function(){
  chart1.resize({
    height: 260,
    width: 400
  });

  chart2.resize({
    height: 260,
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

//

//

$(".address").html(data["address"]);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

//
