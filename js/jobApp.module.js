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

app.factory('DeckFactory', function () {
    var deck = [];
    var pips = [
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
    function Card(pip, suit) {
        return {
            name: pip,
            suit: suit,
            value: indexOf(pip) + 2,
            fullname: pip + ' of ' + suit
        };
    };
    deck.makeDeck = function () {
        deck.cards = [];
        angular.forEach(suits, function (suit, key) {
            angular.forEach(pips, function (pip, key) {
                deck.cards.push(Card(pip, suit));
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
    function testCards() {
        angular.forEach(pips,function(name, key) {
            deck.card.push(name);
        });
        return deck;
        // deck.name.forEach.push(pips);
    }

    testCards();
    return deck;
});

app.controller('DeckController', function ($scope, DeckFactory) {
$scope.theDeck = DeckFactory.deck;

    // this works
    // $scope.theDeck = [
    //     {type:"Saab", model:"Viggen", color:"White"},
    //     {type:"Volvo", model:"Wagon", color:"blue"},
    //     {type:"BMW", model:"M3", color:"Red"}];

// not working
    // $scope.grabDeck = function () {
    //     $scope.theDeck = DeckFactory.makeDeck()
    // };
    // $scope.testCards = function() {
    //     $scope.theDeck = DeckFactory.testCards();
    // };
    // testCards();
});

// calculate payout as bet * scale unless 5 coin royal flush, then 4000 | 16 * scale | bet * scale * 3.2