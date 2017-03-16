console.log(data)

$(".address").html(data["address"]);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

var chart = c3.generate({
  bindto: '#chart',
  // size: {
  //       height: 320
  // },
  data: {
    columns: [
      ["House Value",
      data["years"]["1990"]["median"], data["years"]["1995"]["median"], data["years"]["2000"]["median"], data["years"]["2005"]["median"], data["years"]["2010"]["median"], data["years"]["2015"]["median"]]
    ]
  },
  color: {
      pattern: ['#D49D2E', '#60A0BE', '#E0601B', '6D3F94']
  },
  axis: {
    x: {
      type: 'category',
      categories: ['1990', '1995', '2000', '2005','2010','2015']
    },
    y: {
        label: {
            text: 'Value in 2017 USD ($)',
            position: 'outer-middle'
        }
    }
  },
  tooltip: {
        format: {
            title: function (d) { return 'Data ' + d; },
            value: function (value, ratio, id) {
                var format = id === 'data1' ? d3.format(',') : d3.format('$');
                return format(value);
            }
        }
    }
});

// Percent Change Table

var firstChangeValue =
(data["years"]["1995"]["median"] - data["years"]["1990"]["median"])/data["years"]["1990"]["median"]
var secondChangeValue =
(data["years"]["2000"]["median"] - data["years"]["1995"]["median"])/data["years"]["1995"]["median"]
var thirdChangeValue =
(data["years"]["2005"]["median"] - data["years"]["2000"]["median"])/data["years"]["2000"]["median"]
var fourthChangeValue =
(data["years"]["2010"]["median"] - data["years"]["2005"]["median"])/data["years"]["2005"]["median"]
var fifthChangeValue =
(data["years"]["2015"]["median"] - data["years"]["2010"]["median"])/data["years"]["2010"]["median"]


$("#90to95").html(Math.round(firstChangeValue * 10000)/100);
$("#95to00").html(Math.round(secondChangeValue * 10000)/100);
$("#00to05").html(Math.round(thirdChangeValue * 10000)/100);
$("#05to10").html(Math.round(fourthChangeValue * 10000)/100);
$("#10to15").html(Math.round(fifthChangeValue * 10000)/100);
