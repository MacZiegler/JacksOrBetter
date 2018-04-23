angular.module('jacksorBetterApp', [])
.controller('jacksorBetterController', function () {
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
})