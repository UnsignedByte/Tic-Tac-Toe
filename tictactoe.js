/**
 * @Author: Edmund Lam <edl>
 * @Date:   16:32:48, 28-Feb-2018
 * @Filename: tictactoe.js
 * @Last modified by:   edl
 * @Last modified time: 05:18:19, 01-Mar-2018
 */

var bots = new Array();

init();

function init(){
  var bots = [];
  for ( var i = 0; i < 500; i++ ){
    randBot();
  }
  window.requestAnimationFrame(round);
}

function round(){
  var bot1 = randInt(0, bots.length-1);
  var bot2 = randInt(0, bots.length-1);
  var boardIdX = 0;
  var boardIdO = 0;
  var isTie = false;
  while ( bot2 === bot1 ){
    bot2 = randInt(0, bots.length-1);
  }
  bot1 = bots[bot1];
  bot2 = bots[bot2];

  var makeMove = function( botNum ){
    if (botNum === 1){
      var placement = bot1.data[boardIdX];
      if (placement == null){
        bot1.ties++;
        bot2.ties++;
        isTie = true;
      } else {
        boardIdX+=Math.pow(3, placement);
        boardIdO+=2*Math.pow(3, placement);
      }
    }else{
      var placement = bot2.data[boardIdO];
      if (placement == null){
        bot1.ties++;
        bot2.ties++;
        isTie = true;
      } else {
        boardIdO+=Math.pow(3, placement);
        boardIdX+=2*Math.pow(3, placement);
      }
    }
    console.log(boardIdX.toString(3))
  }

  var win = function(){
    var board = boardIdX.toString(3);
    if (~board.indexOf("111")){
      bot1.wins++;
      bot1.losses++;
      return true;
    }else if (~board.indexOf("222")){
      bot2.wins++;
      bot2.losses++;
      return true;
    }else{
      var otherPos = new Array();
      otherPos.push(board.charAt(0)+board.charAt(4)+board.charAt(8));
      otherPos.push(board.charAt(2)+board.charAt(4)+board.charAt(6));
      otherPos.push(board.charAt(0)+board.charAt(3)+board.charAt(6));
      otherPos.push(board.charAt(1)+board.charAt(4)+board.charAt(7));
      otherPos.push(board.charAt(2)+board.charAt(5)+board.charAt(8));
      for ( var i = 0; i < 5; i++ ){
        if (otherPos[i] === '111'){
          bot1.wins++;
          bot1.losses++;
          return true;
        }else if (otherPos[i] === '222') {
          bot2.wins++;
          bot2.losses++;
          return true;
        }
      }
    }
    return false;
  }


  while (!win() && !isTie){
    makeMove(1);
    makeMove(2);
  }


}


function Bot(data){
  this.data = data;
  this.wins = 0;
  this.ties = 0;
  this.losses = 0;
}

//creates a random bot
function randBot(){
  var data = [];
  for ( var i = 0; i < Math.pow(3, 9); i++){
    data.push(randVal(getZeroes(i)));
  }

  bots.push(new Bot(data));
}

function getZeroes(id){
  var str = id.toString(3);
  var zList = [];
  for ( var i = 0; i < 9; i++ ){
    if (i < 9-str.length){
      zList.push(i);
    }else if (str.charAt(8-i) === '0'){
      zList.push(i);
    }
  }
  return zList;
}

//Returns a random value in an array
function randVal(a) {
  if (a.length > 0){
    return a[randInt(0, a.length - 1)];
  }else{
    return null;
  }
}

//Returns a random int between min and max, inclusive.
function randInt(min, max) {
  min = Math.round(min);
  max = Math.round(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
