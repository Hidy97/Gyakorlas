/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
1.Elinditjuk a parancssort:
cmd.exe
2. Belépünk abba a mappába ahol a forrásfileok vannak (ebbe a mappába)
cd /a/mappa/eleresi/utvonala
3.Telepítjük a package.json fileban található csomagokat
npm install
4. Elindítjuk az npm script-et ami a package.json file-ban van megírva
npm run serve

*/

console.log('hello ');

let scores, roundScore, activePlayer;

function init(){
// 1. Inicializáljuk az appot:
// a pontszámokat nullázzuk, a kockát eltüntetjük

  scores = [0, 0]; // scores[0], scores[1]
  roundScore = 0;
  activePlayer = 0;

// Frissítjük a UI-t (a grafikus felületet...)

// jquery-vel kiválasztjuk a score-0 ID-vel rendelkező html elemet
  $('#score-0').text('0');
  $('#score-1').text('0');
  $('#current-0').text('0');
  $('#current-1').text('0');

  $('.dice').css('display', 'none');
    
}

// DRY Don't Repeat Yourself
init();
$('.btn-new').click(init);

//function whenClicked(){
//console.log('clicked!!!');
//}

//document.querySelector('.btn-roll').addEvenetListener('click', whenClicked);
// document.getElementById('sdffsd)

function dropDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  return dice;
}

function nextPlayer() {
    //nullázuk a pontjait az activePlayernek
      //és a másik játékos jön
  roundScore = 0;
      
      
//      
//    if(activePlayer === 0) {
//      activePlayer = 1;
//    } else {
//      activePlayer = 0;
//    }
      //az előző if block rövidebben,
      //? = ternary operator
  activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    
    //a UI-t frissítjük, a current score-okat nullázzuk,
    // és a másik játékost jelöljük active-nak
    
  $('#current-0').text(0);
  $('#current-1').text(0);
      
    // toggleClass: ha rajta van akkor leveszi, ha nincs rajta akkor rárakja
  $('.player-1-panel').toggleClass('active');
  $('.player-0-panel').toggleClass('active');
      
      
  $('.dice').css('display', 'none');
}

// event listener hozzáadása jquery-vel
$('.btn-roll').click(function(){
    // 1.random szám generálás
  let dice = dropDice();
    // 2. jelenítsük meg az eredményt a UI-on
  let diceDOM = $('.dice');
  diceDOM.css('display', 'block');
  diceDOM.attr('src', 'dice-'+dice+'.png');
    
    // ha nem egyest dobtunk akkor a roundScore változó értékét frissíteni kell
    
  if( dice !== 1) {
      
//  roundScore = roundScore + dice;
// az előző sor rövidebben
      
    roundScore += dice;
    $('$current'+activePlayer).text(roundScore);
  } else {
    nextPlayer();
  }
    
}); // .btn-roll clicked


$('.btn-hold').click(function(){
    // 1. Felírjuk a roundscore-t a scores tömbbe
  scores[activePlayer] += roundScore;
    // Update the UI
  $('#score-'+activePlayer).text(scores[activePlayer]);
    //2. meg kell nézni hogy a játékos nyert e
  if(scores[activePlayer] >= 20){
        //nyert az activePlayer
    $('#name-'+activePlayer).text('Winner');
    $('.dice').css('display', 'none');
    $('.player-'+activePlayer+'-panel').addClass('winner');
    $('.player-'+activePlayer+'-panel').removeClass('active');
  } else {
      // a másik játékos jön, ha a pontszám kisebb mint 20
    nextPlayer();
  }
    
});