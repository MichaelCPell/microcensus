window.printReport = function(){
  chart1.resize({
    height: 200,
    width: 300
  });

  chart2.resize({
    height: 200,
    width: 300
  });

  chart3.resize({
    height: 200,
    width: 300
  });

  chart4.resize({
    height: 250,
    width: 350
  });

  chart5.resize({
    height: 250,
    width: 350
  });

  $("#map").css("height", "180px")

  setTimeout(function(){window.print()}, 1000)
}

//

var chart1 = c3.generate({
  bindto: '#chart1',
    data: {
      json: [data["race"]],
       keys: {
        value: ['White', 'Black or African American', 'Asian']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#E29A2F', '#58B5B4', '#C94292']
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

var chart2 = c3.generate({
  bindto: '#chart2',
    data: {
      json: [data["latino"]],
       keys: {
        value: ['Latino', 'Non-Latino']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#52B4B4', '#6A479C']
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

var chart3 = c3.generate({
  bindto: '#chart3',
    data: {
      json: [data["population"]],
       keys: {
        value: ['0To25', '25To65', '65Plus']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#6FA9D4', '#A33E54', '#E69E87']
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

var chart4 = c3.generate({
  bindto: '#chart4',
    data: {
      json: [data["homes"]],
       keys: {
        value: ['Owner Occupied', 'Renter Occupied']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#F16224', '#27668D']
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

var chart5 = c3.generate({
  bindto: '#chart5',
    data: {
      json: [data["education"]],
       keys: {
        value: ['Did Not Finish High School', 'High School or GED', 'Bachelor\'s degree', 'Master\'s or Professional', 'Doctorate degree']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#6FA9D4', '#74AA41', '#C82F91', '#E39924', '#6A479C']
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

$(".address").html(data["address"]);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

document.getElementById("total-population").innerHTML = Math.floor(data["population"]["total"]);

document.getElementById("median-household-income").innerHTML = data["median_income"];

document.getElementById("number-of-homes").innerHTML = Math.floor(data["housing"]["numberOfHouseholds"]);


document.getElementById("median-home-value").innerHTML = data["housing"]["median"];

//
