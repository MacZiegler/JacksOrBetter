// reminder: job stands for "Jacks or Better"
var app = angular.module('jobApp', []);

app.controller('RunController', function($scope) {
    $scope.game.started = false;

    $scope.game.start = function () {
        $scope.game.started = true;
    }

    $scope.game.end = function () {
        $scope.game.started = false;
    }

    $scope.bet.amount = 0;

    $scope.bet.onemore = function () {
        if ($scope.bet.amount < 5) {
            $scope.bet.amount = $scope.bet.amount + 1;
        }
    }

    $scope.bet.max = function () {
            $scope.bet.amount = 5;
    }

});

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