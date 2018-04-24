angular.module('jacksorBetterApp', []);

function GameController(){
    var game = this;
 
    game.init = function () {
        game.started = false;
    };
 
    game.start = function () {
        game.started = true;
    };
 
    game.end = function () {
        game.started = false;
    };
 
    game.init();
};

function DeckController() {
    var deck = [];
    deck.suits = [
        "null",
        "hearts",
        "spades",
        "diamonds",
        "clubs"
    ];
    deck.cards = [
        "null",
        "ace",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "jack",
        "queen",
        "king"
    ];
};

function shuffle (){};

function deal (){};

function hand (){};

function bet (){};

function score (){};
// calculate payout as bet * scale unless 5 coin royal flush, then 4000