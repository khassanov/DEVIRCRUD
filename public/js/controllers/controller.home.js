angular.module('crud') //connect module angular
  .controller("HomeCtrl", HomeCtrl);



HomeCtrl.$inject = ["$http", "$state"]; //inject - передать аргументы

function HomeCtrl($http, $state) {
  var vm = this;



  $http.get('/api/crud/')
    .success(function (data) {

      vm.allProducts = data;
    })

    .error(function () {

    });


}