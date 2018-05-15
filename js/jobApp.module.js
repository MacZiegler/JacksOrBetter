// reminder: job stands for "Jacks or Better"
var app = angular.module('jobApp', []);

app.controller('RunController', function ($scope) {

    $scope.game.started = false;

    $scope.game.start = function () {
        $scope.game.started = true;
    };

    $scope.game.end = function () {
        $scope.game.started = false;
    };

});

app.controller('BetController', function ($scope) {
    $scope.bet.amount = 0;

    $scope.bet.reset = function () {
        $scope.bet.amount = 0;
    };

    $scope.bet.onemore = function () {
        if ($scope.bet.amount < 5) {
            $scope.bet.amount = $scope.bet.amount + 1;
        }
    };

    $scope.bet.max = function () {
        $scope.bet.amount = 5;
    };

});


app.controller('DeckController', function ($scope) {

    $scope.deck = {};
    $scope.deck.cards = [];
    $scope.deck.hand = [];
    $scope.deck.shuffle = shuffle;
    $scope.deck.deal = deal;
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

    function randomInt(min, max) {
        return Math.floor((Math.floor(Math.random() * (max - min + 1) + min)
            + Math.floor(Math.random() * (max - min + 1) + min)) / 2);
    }

    // Card function configured for numeric input
    function Card(pip, suit) {
        var pipname = pips[pip];
        var suitname = suits[suit];
        var position = pips.indexOf(pipname);
        return {
            name: pipname,
            suit: suitname,
            value: position + 2,
            fullname: pipname + ' of ' + suitname,
            keep: true
        };
    }

    function newDeck(makedeck) {
        var pipsall = pips.length;
        var suitsall = suits.length;
        for (var suitspot = 0; suitspot < suitsall; suitspot++) {
            for (var pipspot = 0; pipspot < pipsall; pipspot++) {
                makedeck.push(Card(pipspot, suitspot));
            }
        }
        return makedeck;
    }

    function cut(chopdeck) {
        $scope.testchopdeck = chopdeck;//testcode
        var leftcards = [];
        var rightcards = [];
        if (!chopdeck || !chopdeck.length) {
            return {
                leftcards: [],
                rightcards: []
            };
        } else if (chopdeck.length === 1) {
            return {
                leftcards: [chopdeck[0]],
                rightcards: []
            };
        } else {
            var halfway = Math.floor(chopdeck.length / 2);
            var randomness = randomInt(0, 14) - 7;
            halfway += randomness;
            halfway = Math.max(halfway, 1);
            var flipflop = randomInt(1, 2);
            if (flipflop == 1) {
                return {
                    leftcards: chopdeck.slice(0, halfway),
                    rightcards: chopdeck.slice(halfway)
                };
            } else {
                return {
                    rightcards: chopdeck.slice(0, halfway),
                    leftcards: chopdeck.slice(halfway)
                };
            }
        }
    }

    function shuffle(shufflecards) {
        // function shuffle() {
        // var shufflecards = $scope.deck.cards;
        $scope.testshufflecards = shufflecards;//testcode
        var shuffletimes = 20;
        for (var i = 0; i < shuffletimes; i++) {
            // cut the cards in half
            var halves = cut(shufflecards);
            var centercards = [];
            while (halves.leftcards.length > 0 || halves.rightcards.length > 0) {
                // a random number of cards to take from the leftcards
                var take = randomInt(1, 7);
                // take that many cards from the leftcards and put in the centercards
                centercards = centercards.concat(halves.leftcards.splice(0, take));
                // a random number of cards to take from the rightcards
                take = randomInt(1, 7);
                // take that many cards from the rightcards and put in the centercards
                centercards = centercards.concat(halves.rightcards.splice(0, take));
            }
            $scope.testcentercards = centercards;//testcode
        }
        return centercards;
    }

    function deal(currentdeck) {
        return currentdeck.shift();
    }

    function newHand(fromdeck) {
        var hand = $scope.deck.hand;
        hand.length = 0;
        for (var h = 0; h < 5; h++) {
            hand.push(deal(fromdeck));
        };
    }
    newDeck($scope.deck.cards);
    shuffle($scope.deck.cards);
    newHand($scope.deck.cards);
    $scope.testcurrentdeck = $scope.deck.cards;
    $scope.testcurrenthand = $scope.deck.hand;
});

// calculate payout as bet * scale unless 5 coin royal flush, then 4000 | 16 * scale | bet * scale * 3.2