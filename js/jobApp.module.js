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
        return Math.floor(Math.random() * (max - min + 1) + min);
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
            fullname: pipname + ' of ' + suitname
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
        var righcards = [];
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
            // find the middle, with a random variance of +/- 5
            var halfway = Math.floor(chopdeck.length / 2);
            var randomness = randomInt(0, 10) - 5;
            halfway += randomness;
            halfway = Math.max(halfway, 1);
            for (var x = 0; x < halfway; x++) {
                leftcards.push(chopdeck[x]);
            };
            for (var y = chopdeck.length +1; y > halfway; y--) {
                rightcards.push(chopdeck[y]);
            };

            return {
                // leftcards: chopdeck.slice(0, halfway),
                // rightcards: chopdeck.slice(halfway)
                leftcards, rightcards
            };
        }
    }
    // testcode
    function chop(cutdeck) {
        return {
            leftcards: [
                { name: 'king', suit: 'hearts', value: 13, fullname: 'king of hearts' },
                { name: 'ace', suit: 'hearts', value: 14, fullname: 'ace of hearts' }
            ],
            rightcards: [
                { name: 'ten', suit: 'hearts', value: 10, fullname: 'ten of hearts' },
                { name: 'jack', suit: 'hearts', value: 11, fullname: 'jack of hearts' },
                { name: 'queen', suit: 'hearts', value: 12, fullname: 'queen of hearts' }
            ]
        };
    }

    function shuffle(shufflecards) {
        // function shuffle() {
        // var shufflecards = $scope.deck.cards;
        $scope.testshufflecards = shufflecards;//testcode
        var shuffletimes = 20;
        for (var i = 0; i < shuffletimes; i++) {
            // cut the cards in half
            var halves = cut(shufflecards);
            // var halves = cut(shufflecards);
            $scope.testhalves = halves;//testcode
            $scope.testleftcards = halves.leftcards;//testcode
            $scope.testrightcards = halves.rightcards;//testcode
            // we will stack both halves into this centercards
            var centercards = [];
            while (halves.leftcards.length > 0 || halves.rightcards.length > 0) {
                // a random number of cards to take from the leftcards
                var take = randomInt(1, 5);
                // take that many cards from the leftcards and put in the centercards
                centercards = centercards.concat(halves.leftcards.splice(0, take));
                // a random number of cards to take from the rightcards
                take = randomInt(1, 5);
                // take that many cards from the rightcards and put in the centercards
                centercards = centercards.concat(halves.rightcards.splice(0, take));
            }
            $scope.testcentercards = centercards;//testcode
            shufflecards = centercards;
        }
        return shufflecards;
    }

    var tempDeck = [
        { name: 'ten', suit: 'hearts', value: 10, fullname: 'ten of hearts' },
        { name: 'jack', suit: 'hearts', value: 11, fullname: 'jack of hearts' },
        { name: 'queen', suit: 'hearts', value: 12, fullname: 'queen of hearts' },
        { name: 'king', suit: 'hearts', value: 13, fullname: 'king of hearts' },
        { name: 'ace', suit: 'hearts', value: 14, fullname: 'ace of hearts' }
    ];
    // newDeck(deck.cards);
    // newDeck($scope.deck.cards);
    // newDeck(tempDeck);
    // $scope.deck.cards = shuffle(tempDeck);
    var transferDeck = shuffle(tempDeck);
    $scope.deck.cards = transferDeck;

    function deal(dealcard) {
        return dealcard;
    }
    // };
});

// calculate payout as bet * scale unless 5 coin royal flush, then 4000 | 16 * scale | bet * scale * 3.2