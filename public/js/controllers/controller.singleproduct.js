angular.module('crud') //connect module angular
    .controller('SingleProductCtrl', SingleProductCtrl);


SingleProductCtrl.$inject = ['$http', '$state']; //inject - передать аргументы

function SingleProductCtrl($http, $state) {
    var vm = this;


    $http.get('/api/crud/' + $state.params.id).success(function (data) {

            vm.products = data;
            console.log(data);
        })

        .error(function () {

        });
}