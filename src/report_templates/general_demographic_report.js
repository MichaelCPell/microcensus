




c3.generate({
  bindto: '#chart',
  size: {
        height: 320,
        // width: 350
  },
  data: {
    type: 'pie',
    json: data.one,

    keys: {
        value: ['White', 'Black or African American', 'Asian', 'Other']
    }
  },
  color: {
      pattern: ['#D49D2E', '#60A0BE', '#E0601B', '6D3F94']
  },
});


c3.generate({
  bindto: '#chart2',
  size: {
        height: 320,
        // width: 350
  },
  data: {
    type: 'pie',
    json: data.two,

    keys: {
        value: ['White', 'Black or African American', 'Asian', 'Other']
    }
  },
  color: {
      pattern: ['#D49D2E', '#60A0BE', '#E0601B', '6D3F94']
  },
});
