c3.generate({
  bindto: '#chart',
  size: {
        height: 320,
        // width: 350
  },
  data: {
    type: 'pie',
    json: data,

    keys: {
        value: ['White', 'Black or African American', 'Asian', 'Other']
    }
  },
  color: {
      pattern: ['#D49D2E', '#60A0BE', '#E0601B', '6D3F94']
  },
});


console.log("Almost there")
