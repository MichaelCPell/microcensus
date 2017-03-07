console.log(`Flag One!!`)
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
  size: {
        height: 320,
        // width: 350
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
    }
  }
});
