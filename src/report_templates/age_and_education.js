document.getElementById("address").innerHTML = data["address"];
c3.generate({
  bindto: '#chart1',
    data: {
        json: [data["education"]["sum"]],
        keys: {
            value: ['Regular high school diploma', 'GED or alternative credential', 'Some college, less than 1 year', 'Some college, 1 or more years, no degree', 'Associate\'s degree', 'Bachelor\'s degree', 'Master\'s degree', 'Professional school degree', 'Doctorate degree', 'Did Not Finish High School']
        },
        type: 'bar'
    },
    color: {
        pattern: ['#A12821', '#27668D', '#75AB36', '#E39920', 'A33E54','#27668D', '#31B2A1','#F56223', '#53B5B5', '#E79F87']
      }
});

c3.generate({
  bindto: '#chart2',
    data: {
        json: [data["age"]["male"]],
        keys: {
            value: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+']
        },
        type: 'bar'
    },
    color: {
        pattern: ['#27668D', '#75AB36', '#E39920', 'A33E54','#27668D', '#31B2A1','#F56223', '#53B5B5', '#E79F87']
      }
});

c3.generate({
  bindto: '#chart3',
    data: {
        json: [data["age"]["female"]],
        keys: {
            value: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+']
        },
        type: 'bar'
    },
    color: {
        pattern: ['#27668D', '#75AB36', '#E39920', 'A33E54','#27668D', '#31B2A1','#F56223', '#53B5B5', '#E79F87']
      }
});


c3.generate({
  bindto: '#chart4',
    data: {
        json: [data["age"]["total"]],
        keys: {
            value: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+']
        },
        type: 'bar'
    },
    color: {
        pattern: ['#27668D', '#75AB36', '#E39920', 'A33E54','#27668D', '#31B2A1','#F56223', '#53B5B5', '#E79F87']
      }
});
