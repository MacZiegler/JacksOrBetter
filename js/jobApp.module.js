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


app.controller('DeckController', function ($scope) {

    $scope.deck = [];
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
    };

    // works!!
    // Card function configured for numeric input
    // function Card(pip, suit) {
    //     var pipname = pips[pip];
    //     var suitname = suits[suit];
    //     var position = pips.indexOf(pipname);
    //     return {
    //         name: pipname,
    //         suit: suitname,
    //         value: position + 2,
    //         fullname: pipname + ' of ' + suitname
    //     };
    // };

    function makeDeck() {
        var pipsall = pips.length;
        var suitsall = suits.length;
        for (var suitspot = 0; suitspot < suitsall; suitspot++) {
            for (var pipspot = 0; pipspot < pipsall; pipspot++) {
                $scope.deck.push(Card(pipspot, suitspot));
            }
        }

        return $scope.deck;
    };

    makeDeck();

// works!!
// function makeDeck() {
//     var pipspot = 0;
//     var suitspot = 0;
//     var pipsall = pips.length;
//     var suitsall = suits.length;
//     for (suitspot = 0; suitspot < suitsall; suitspot++) {
//         for (pipspot = 0; pipspot < pipsall; pipspot++) {
//             $scope.deck.push(Card(pipspot, suitspot));
//         }
//     }

//     return $scope.deck;
// };

// makeDeck();


    // function dealCard() {
    //     return deck.cards.shift();
    // };

    // just pushes pips
    // function builDeck() {
    //     $scope.deck =
    //         angular.forEach(pips, function (value, key) {
    //             deck.push(Card(pips[key], suits[0]));
    //             return deck;
    //         });
    // };

    // builDeck();

    function testCard(a, b) {
        $scope.onecard = Card(a, b);
        // $scope.onecard = onecard.push(Card(a+1,b+1));
        $scope.samplea = pips[a];
        $scope.sampleb = suits[b];
        $scope.index = pips.indexOf()
    }

    testCard(9, 2);
    // works!
    // function testDeck() {
    //     $scope.deck = pips;
    //     return deck;
    // }

    // testDeck();

    // $scope.deck = function () {
    //     $scope.deck = [
    //         {pip:"ace", suit:"hearts", value:13},
    //         {pip:"king", suit:"hearts", value:12},
    //         {pip:"queen", suit:"hearts", value:11},
    //         {pip:"jack", suit:"hearts", value:10}
    //     ];
    //     return $scope.deck;
    // };

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