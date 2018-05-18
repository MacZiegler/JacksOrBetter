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
    var playnumber = 0;
    var fresh = true;

    function randomInt(min, max) {
        return Math.floor((Math.floor(Math.random() * (max - min + 1) + min)
            + Math.floor(Math.random() * (max - min + 1) + min)) / 2);
    }

    // Card function configured for numeric input
    function Card(pip, suit) {
        var pipname = pips[pip];
        var suitname = suits[suit];
        var position = pips.indexOf(pipname);
        if (position > 8) {
            var path = pipname + '_of_' + suitname + '.svg'
        } else {
            var path = (position + 2) + '_of_' + suitname + '.svg'
        };
        return {
            name: pipname,
            suit: suitname,
            value: position + 2,
            fullname: pipname + ' of ' + suitname,
            pathname: path,
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
        // $scope.testchopdeck = chopdeck;//testcode
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
            // var flipflop = randomInt(1, 2);
            if (halfway % 2 === 0) {
                for (var x = 0; x < halfway; x++) {
                    leftcards.push(chopdeck[x]);
                };
                for (var y = chopdeck.length - 1; y >= halfway; y--) {
                    rightcards.push(chopdeck[y]);
                };
            } else {
                for (var x = chopdeck.length - 1; x > halfway; x--) {
                    rightcards.push(chopdeck[x]);
                };
                for (var y = halfway; y >= 0; y--) {
                    leftcards.push(chopdeck[y]);
                };
            };
            return {
                leftcards, rightcards
            };
            //     return {
            //         leftcards: chopdeck.slice(0, halfway),
            //         rightcards: chopdeck.slice(halfway)
            //     };
            // } else {
            //     return {
            //         rightcards: chopdeck.slice(0, halfway),
            //         leftcards: chopdeck.slice(halfway)
            //     };
            // }
        }
    }

    function shuffle(shufflecards) {
        // $scope.testshufflecards = shufflecards;//testcode
        var shuffletimes = 12;
        for (var i = 0; i < shuffletimes; i++) {
            // cut the cards in half
            if (i === 0) {
                var halves = cut(shufflecards);
            } else {
                var halves = cut(centercards);
            }
            var centercards = [];
            while (halves.leftcards.length > 0 || halves.rightcards.length > 0) {
                var flipflop = randomInt(1, 2);
                if (flipflop === 1) {
                    var take = randomInt(1, 5);
                    centercards = centercards.concat(halves.leftcards.splice(0, take));
                    take = randomInt(1, 5);
                    centercards = centercards.concat(halves.rightcards.splice(0, take));
                } else {
                    var take = randomInt(1, 5);
                    centercards = centercards.concat(halves.rightcards.splice(0, take));
                    take = randomInt(1, 5);
                    centercards = centercards.concat(halves.leftcards.splice(0, take));
                }
            }
            // return centercards;
        }
        $scope.deck.cards = centercards;
        // $scope.testcentercards = centercards;//testcode
    }

    // function deal(currentdeck) {
    //     return currentdeck.shift();
    // }
    function dealtopcard() {
        return $scope.deck.cards.shift();
    }

    function newHand() {
        // var fromdeck = $scope.deck.cards;
        // var hand = $scope.deck.hand;
        // hand.length = 0;
        $scope.deck.hand.length = 0;
        for (var h = 0; h < 5; h++) {
            $scope.deck.hand.push(dealtopcard());
            // hand.push(deal());
            // hand.push(deal(fromdeck));
            // hand[h].keep = true;
        };
        fresh = true;
    }

    function secondHand() {
        var topofdeck = $scope.deck.cards;
        var hand = $scope.deck.hand;
        for (var h = 0; h < 5; h++) {
            if (!hand[h].keep) {
                hand.splice(h, 1, deal(topofdeck));
            }
        };
        fresh = false;
    }

    function deal() {
        if (fresh) {
            secondHand();
        } else {
            newhand();
        }
    }

    newDeck($scope.deck.cards);
    shuffle($scope.deck.cards);
    newHand();
    // secondHand();
    // $scope.testcurrentdeck = $scope.deck.cards;
    // $scope.testcurrenthand = $scope.deck.hand;
    // $scope.testqueen = "queen_of_hearts.svg";
    // $scope.testqueenfullpath = "'/img/svgcards/queen_of_hearts.svg'";
});

// calculate payout as bet * scale unless 5 coin royal flush, then 4000 | 16 * scale | bet * scale * 3.2