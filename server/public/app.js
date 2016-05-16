var app = angular.module('demo', ["ngRoute"]);

app.config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'homeController'
            })

            .when('/movies', {
                templateUrl: 'templates/movies.html',
                controller: 'moviesController'
            })
            .when('/movies/:id', {
                templateUrl: 'templates/movie_details.html',
                controller: 'movieDetailsController'
            })
    }
);
app.controller('homeController', function ($scope) {
    $scope.message = "this is message from parent";
});
app.controller('moviesController', function ($scope, $http) {
    console.log("hi");

    $scope.message = "im cool";
    $http({
        method: 'GET',
        url: 'movie'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.data = response.data

    }, function errorCallback(response) {
        console.log(response);

    });
});
app.controller('movieDetailsController', function ($scope, $http, $routeParams) {
    $scope.message = "this is movie details view";
    var id = $routeParams.id;
    console.log(id);
    $http({
        method: 'GET',
        url: 'movie/' + id
    }).then(function successCallback(response) {
        console.log(response.data);
        $scope.data = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });

    $scope.save = function () {
        console.log('saving movie');
        $http.put('movie/' + id, $scope.data)
            .then(
                function (response) {
                    // success callback
                }
            );
    }
});


