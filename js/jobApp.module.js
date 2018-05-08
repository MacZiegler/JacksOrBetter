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

app.factory('DeckofCards', function () {
    var deck = {};
    var suits = [
        "hearts",
        "spades",
        "diamonds",
        "clubs"
    ];
    var names = [
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
    return deck;
});

// calculate payout as bet * scale unless 5 coin royal flush, then 4000 | 16 * scale | bet * scale * 3.2