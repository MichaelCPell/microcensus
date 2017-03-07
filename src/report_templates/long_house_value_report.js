$(".address").html(data["address"]);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

var chart = c3.generate({
  bindto: '#chart',
  size: {
        height: 320
  },
  data: {
    columns: [
      ["House Value", data["1990"]["median"], data["2000"]["median"], data["2010"]["median"]]
    ]
  },
  color: {
      pattern: ['#D49D2E', '#60A0BE', '#E0601B', '6D3F94']
  },
  axis: {
    x: {
      type: 'category',
      categories: ['1990', '2000', '2010']
    },
    y: {
        label: {
            text: 'Value in 2017 USD ($)',
            position: 'outer-middle'
        }
    }
  }
});


var firstChangeValue = (data["2000"]["median"] - data["1990"]["median"])/data["1990"]["median"]
var secondChangeValue = (data["2010"]["median"] - data["2000"]["median"])/data["2000"]["median"]

$("#90to00").html(Math.round(firstChangeValue * 10000)/100);
$("#00to10").html(Math.round(secondChangeValue * 10000)/100);