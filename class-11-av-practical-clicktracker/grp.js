'use strict';
var ctx = document.getElementById('chart').getContext('2d');
var data = [12,4,9,3,100,55,31]; var labelColors = ['blue', 'red', 'orange', 'purple', 'green', 'yellow', 'salmon'];
var chartData = {   type: 'bar',   data:{     labels:labelColors,     datasets: [{       label: '# of Votes / Color',       data: data,       backgroundColor: labelColors,     }],   },   options: {     scales: {       yAxes:[{         ticks:{           beginAtzero: true         }       }]     }   } }; 
  // chartData.options.scales.yAxes[0].ticks.beginAtZero = true; var myChart = new Chart(ctx,chartData);
