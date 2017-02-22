'use strict';

function newElement(elType, elAttribute, elAttributeName, elParentId, elText){
  var el = document.createElement(elType);
  el.setAttribute(elAttribute, elAttributeName);
  el.textContent = elText;
  var parentEl = document.getElementById(elParentId);
  parentEl.appendChild(el);
}

function newImgInputEl(elSrc, elId){
  var parentEl = document.getElementById('img-selector');
  var currentEl = document.getElementById(elId);
  parentEl.removeChild(currentEl);
  var el = document.createElement('input');
  el.setAttribute('type', 'image');
  el.setAttribute('src', elSrc);
  el.setAttribute('id', elId);
  el.setAttribute('class', 'img-option');
  parentEl.appendChild(el);
}

function imgObject(name, pathTo) {
  this.name = name,
  this.pathTo = pathTo,
  this.numShown = 0,
  this.numClicked = 0;
}

imgObject.prototype.percentClick = function(){
  var percentage = 100 * (this.numClicked / this.numShown);
  this.percentage = percentage;
};

var bag = new imgObject('bag', 'imgs/bag.jpg');
var banana = new imgObject('banana', 'imgs/banana.jpg');
var bathroom = new imgObject('bathroom', 'imgs/bathroom.jpg');
var boots = new imgObject('boots', 'imgs/boots.jpg');
var breakfast = new imgObject('breakfast', 'imgs/breakfast.jpg');
var bubblegum = new imgObject('bubblegum', 'imgs/bubblegum.jpg');
var chair = new imgObject('chair', 'imgs/chair.jpg');
var cthulhu = new imgObject('cthulhu', 'imgs/cthulhu.jpg');
var dogDuck = new imgObject('dogDuck', 'imgs/dog-duck.jpg');
var dragon = new imgObject('dragon', 'imgs/dragon.jpg');
var pen = new imgObject('pen', 'imgs/pen.jpg');
var petSweep = new imgObject('petSweep', 'imgs/pet-sweep.jpg');
var scissors = new imgObject('scissors', 'imgs/cissors.jpg');
var shark = new imgObject('shark', 'imgs/hark.jpg');
var sweep = new imgObject('sweep', 'imgs/weep.png');
var tauntaun = new imgObject('tauntaun', 'imgs/tauntaun.jpg');
var unicorn = new imgObject('unicorn', 'imgs/unicorn.jpg');
var usb = new imgObject('usb', 'imgs/usb.gif');
var waterCan = new imgObject('waterCan', 'imgs/water-can.jpg');
var wineGlass = new imgObject('wineGlass', 'imgs/wine-glass.jpg');

var imgs = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass];

//Intialize percentage methods--------------------V
function calcPercentages() {
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].percentClick();
  }
}
//-------------------------------------------------A

// random number generator
function randomImgNum(){
  var ranNum = Math.floor(Math.random() * imgs.length);
  return ranNum;
}

var displayImgs = [99, 99, 99];
var votes = 0;

//assign threee new random numbers into the displayImgs array
function pickImgNums() {
  for (var i = 0; i < displayImgs.length; i++){
    var num = 0;
    do{
      var repeatNum = false;
      num = randomImgNum();
      for (var j = 0; j < displayImgs.length; j++){
        if (num === displayImgs[j]) {
          repeatNum = true;
        }
      }
    }while(repeatNum);
    displayImgs[i] = num;
  }
}

//Select the three images based on numbers from array
console.log(displayImgs);

function createImgInputs(){
  for(var i = 0; i < displayImgs.length; i++){
    var imgNum = displayImgs[i];
    newImgInputEl(imgs[imgNum].pathTo, 'option' + (i + 1));
    imgs[imgNum].numShown++;
  }
}

pickImgNums();
createImgInputs();
//Create a start button
// function startBtn() {
//   newElement('legend', 'class', 'legends', 'start-btn', 'Ready to start?');
//   newElement('button', 'type', 'submit', 'start-btn', 'Start');
// }

// var startSurvey = document.getElementById('start-btn');
// startSurvey.addEventListener('submit', submitStart);
//
// function submitStart(event){
//   event.preventDefault();
//   event.stopPropagation();
//
//   votes++;
//   console.log(votes);
//   pickImgNums();
//   createImgInputs();
// };
// console.log(votes);
// votes++;
//---------------------------------------------|

//print out numClicked values--------------------V
function printNumClicks() {
  for (var i = 0; i < imgs.length; i++) {
    // console.log(imgs[i].name + ' was clicked ' + imgs[i].numClicked + ' times.');
    newElement('li', 'class', 'click-li', 'clicks-ul', imgs[i].name + ' was clicked ' + imgs[i].numClicked + ' times.');
  }
}
//-----------------------------------------------A

  // var newVote1 = document.getElementById('option1');
  // newVote1.addEventListener('click', voteCast);
  //
  // var newVote2 = document.getElementById('option2');
  // newVote2.addEventListener('click', voteCast);
  //
  // var newVote3 = document.getElementById('option3');
  // newVote3.addEventListener('click', voteCast);

var newVote = document.getElementById('img-selector');
newVote.addEventListener('click', voteCast);

function voteCast(event){
  event.preventDefault();
  event.stopPropagation();

  var target = event.target;
  var targetSrc = target.getAttribute('src');
  for(var i = 0; i < imgs.length; i++){
    if (imgs[i].pathTo == targetSrc){
      //console.log(imgs[i].numShown);
      imgs[i].numClicked++;
      //console.log(imgs[i].numClicked);
      break;
    }
  }
  //console.log(targetSrc);
  // randomImgNum();
  console.log(displayImgs);
  console.log(votes);
  votes++;
  if (votes < 26) {
    pickImgNums();
    createImgInputs();
  } else if (votes == 26){
    calcPercentages();
    printNumClicks();
    newElement('canvas', 'id', 'click-chart', 'canvases', '');
    newElement('canvas', 'id', 'percent-chart', 'canvases', '');
    chartWorkPlease();
  }
}
//charts------------------------------------V
function chartWorkPlease(){
  var ctx = document.getElementById('click-chart').getContext('2d');
  var pct = document.getElementById('percent-chart').getContext('2d');

  var clickData = [];
  var labelNames = [];
  var percentageData = [];
  var chartColors = [];

  function pushChartArrs() {
    for (var i = 0; i < imgs.length; i++) {
      labelNames.push(imgs[i].name);
      clickData.push(imgs[i].numClicked);
      percentageData.push(imgs[i].percentage);
    }
  }
  pushChartArrs();
  // console.log(clickData);
  // console.log(labelNames);

//----------Click chart---------------------V
  var clickChart = {
    type: 'bar',
    data: {
      labels: labelNames,
      datasets: [{
        label: 'Number of clicks',
        data: clickData,
        backgroundColor: 'white'
      }],
    },
    options: {
      legend: {labels:{fontColor:'#fff'}},
      scales: {
        yAxes: [{
          ticks: {
            fontColor:'#fff',
            beginAtZero:true
          }
        }],
        xAxes:[{
          ticks: {
            fontColor:'#fff'
          }
        }]
      }
    }
  };
//------------------------------------------A

//-------% chart---------------------V
  var percChart = {
    type: 'polarArea',
    data: {
      labels: labelNames,
      datasets: [{
        label: 'Percentage of Clicks',
        data: percentageData,
        backgroundColor: 'white'
      }],
    },
    options: {
      legend: {labels:{fontColor:'#fff'}},
      scales: {
        yAxes: [{
          ticks: {
            fontColor:'#fff',
            beginAtZero:true
          }
        }],
        xAxes:[{
          ticks: {
            fontColor:'#fff'
          }
        }]
      }
    }
  };
//-------------------------------------------A
  var myChart = new Chart(ctx, clickChart);
  var myChart = new Chart(pct, percChart);
}
