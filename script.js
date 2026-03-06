$(document).ready(function(){

var symbols = ["A","B","C","D","E","F","G","H"];
var cards = symbols.concat(symbols);

cards.sort(function(){
return 0.5 - Math.random();
});

var first = null;
var second = null;
var lock = false;
var moves = 0;
var matched = 0;

var time = 0;
var timerStarted = false;

setInterval(function(){
if(timerStarted){
time++;
$("#timer").text(time);
}
},1000);

for(var i=0;i<cards.length;i++){

var card = $("<div class='card'></div>");

card.attr("data-symbol",cards[i]);

$("#gameBoard").append(card);

}

$(".card").click(function(){

if(lock) return;

if($(this).hasClass("flipped")) return;

if(!timerStarted){
timerStarted = true;
}

$(this).addClass("flipped");

$(this).text($(this).attr("data-symbol"));

if(first == null){

first = $(this);

}
else{

second = $(this);

moves++;

$("#moves").text(moves);

lock = true;

if(first.attr("data-symbol") == second.attr("data-symbol")){

$("#matchSound")[0].play();

matched++;

first = null;
second = null;

lock = false;

if(matched == symbols.length){

$("#winMessage").show();

timerStarted = false;

}

}
else{

$("#wrongSound")[0].play();

setTimeout(function(){

first.removeClass("flipped").text("");

second.removeClass("flipped").text("");

first = null;
second = null;

lock = false;

},1000);

}

}

});

});