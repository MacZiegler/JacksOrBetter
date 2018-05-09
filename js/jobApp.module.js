// reminder: job stands for "Jacks or Better"
var app = angular.module('jobApp', []);

app.controller('RunController', function ($scope) {

    $scope.game.started = false;

    $scope.game.start = function () {
        $scope.game.started = true;
    }

    $scope.game.end = function () {
        $scope.game.started = false;
    }

});

app.controller('BetController', function ($scope) {
    $scope.bet.amount = 0;

    $scope.bet.reset = function () {
        $scope.bet.amount = 0;
    }

    $scope.bet.onemore = function () {
        if ($scope.bet.amount < 5) {
            $scope.bet.amount = $scope.bet.amount + 1;
        }
    }

    $scope.bet.max = function () {
        $scope.bet.amount = 5;
    }

});

app.controller('DeckController', function ($scope, DeckFactory) {
    $scope.theDeck = {};
    $scope.grabDeck = function () {
        $scope.theDeck = DeckFactory.makeDeck()
    };
});

app.factory('DeckFactory', function () {
    var deck = {};
    var names = [
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
        "king",
        "ace"
    ];
    var suits = [
        "hearts",
        "spades",
        "diamonds",
        "clubs"
    ];
    function Card(name, suit) {
        return {
            name: name,
            suit: suit,
            value: indexOf(name) + 2,
            fullname: name + ' of ' + suit
        };
    };
    var makeDeck = function () {
        deck.cards = [];
        suits.forEach(function (suit) {
            names.forEach(function (name) {
                deck.cards.push(Card(name, suit));
            });
        });
    };
    function dealCard() {
        return deck.cards.shift();
      };
    // need setter and getter ???  --  don't think so
    // deck.setDeck = function (aDeck) {
    //     deck = aDeck;
    // };
    // deck.getDeck = function () {
    //     return deck;
    // }

    return deck;
});

// calculate payout as bet * scale unless 5 coin royal flush, then 4000 | 16 * scale | bet * scale * 3.2