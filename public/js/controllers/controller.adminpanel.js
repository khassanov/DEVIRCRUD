angular.module('crud') //connect angular module crud and create controller adminCtrl
    .controller('AdminPanelCtrl', AdminPanelCtrl)

AdminPanelCtrl.$inject = ['$http', '$scope', '$state'];

function AdminPanelCtrl($http, $scope, $state) {
    var vm = this;

    vm.currentUser = JSON.parse(localStorage.getItem('user'));


    $http.get('/api/crud/user/' + $state.params.user_id).success(function (data) {

        vm.products = data.products;
        console.log(vm.products);
        vm.author = data.author;

        //console.log(vm.author);


    })


    vm.addModule = false;
    vm.openAddModule = function (bool) {
        if (bool == true) {
            vm.addModule = true;
        } else
            vm.addModule = false;
    }


    vm.save = function () {
        if (vm.name != 0 && vm.description != 0 && vm.category != 0 && vm.price != 0 && vm.img != 0) {

            var obj = new FormData();
            obj.append('name', vm.name);
            obj.append('description', vm.description);
            obj.append('category', vm.category);
            obj.append('price', vm.price);
            obj.append('img', vm.img);


            $http.post('api/crud', obj, {
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (data) {
                vm.products.push(data);
                console.log(data);
                vm.addModule = false;
            })

        }
    }

    vm.deleteGoods = function (product) {

        $http.delete('/api/crud/' + product._id)
            .success(function () {
                var index = vm.products.indexOf(product);
                vm.products.splice(index, 1);

            })
            .error(function (err) {
                console.log(err.msg);
            })

    }


    vm.editModule = false;
    vm.openEditModule = function (product) {
        if (product) {
            vm.editShop = angular.copy(product);
            console.log(product);
            vm.editModule = true;
        } else {
            vm.editModule = false;
        }


    }
    vm.updateShop = function () {
        if (vm.editShop && vm.editShop.name && vm.editShop.name.length != '' &&
            vm.editShop.description && vm.editShop.description.length != '' &&
            vm.editShop.category && vm.editShop.category.length != '' &&
            vm.editShop.price && vm.editShop.price.length != '' && vm.editShop.img && vm.editShopimg != '') {

            var sendData = new FormData();

            sendData.append('_id', vm.editShop._id);
            sendData.append('name', vm.editShop.name);
            sendData.append('description', vm.editShop.description);
            sendData.append('category', vm.editShop.category);
            sendData.append('price', vm.editShop.price);
            sendData.append('img', vm.editShop.img);
            $http.put('/api/crud', sendData, {
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (data) {

                var index = vm.findIndexById(vm.editShop._id);
                vm.products[index] = data;
                vm.editModule = false;


            })


        }


    }

    vm.findIndexById = function (id) {

        for (var i = vm.products.length - 1; i >= 0; i--) {
            if (id == vm.products[i]._id) {
                console.log(id, vm.products[i]);
                return i;

            }
        }
    }

    vm.readURL = function () {
        if (event.target.files && event.target.files[0]) {
            vm.img = event.target.files[0];

            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(e.target.result);
                $scope.$apply(function () {
                    vm.imgPreload = e.target.result;
                })

            }
            reader.readAsDataURL(event.target.files[0]);


        }

    }

    vm.readURLEdit = function () {
        if (event.target.files && event.target.files[0]) {
            vm.editShop.img = event.target.files[0];

            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(e.target.result);
                $scope.$apply(function () {
                    vm.imgPreload = e.target.result;
                })

            }
            reader.readAsDataURL(event.target.files[0]);


        }

    }


}