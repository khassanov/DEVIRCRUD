angular.module('crud')
    .controller('AuthCtrl', AuthCtrl);


AuthCtrl.$inject = ['$http', '$state']; //inject - передать аргументы

function AuthCtrl($http, $state) {
    var vm = this;


    $http.get('/api/user/current').success(function (data) {

        if (data) {


            vm.user = data;
            localStorage.setItem('user', JSON.stringify(data));
        }
    })

    vm.showSignUp = false;
    vm.openSignUp = function (bool) {
        if (bool == true) {
            vm.showSignUp = true;
        } else
            vm.showSignUp = false;
    }


    vm.signup = function () {

        $http.post('/api/user/signup', {

            email: vm.email,
            first_name: vm.first_name,
            last_name: vm.last_name,
            password: vm.password,
            password2: vm.password2
        }).success(function (data) {

            vm.openSignUp(false);
            alert('Поздравляем вы успешно зарегистрированы, войдите использую ваши учетные данные!');
        }).error(function (err) {
            vm.errors = err;
        });
    }

    vm.login = function () {

        $http.post('/api/user/login', {

            email: vm.emailLogin,
            password: vm.passwordLogin
        }).success(function (data) {
            console.log(data);

            vm.showLogin = false;

            vm.user = data;

            $state.go('adminpanel', {
                user_id: vm.user._id
            });
        }).error(function (err) {
            vm.errorsLogin = err;
        });
    }

    vm.logout = function () {

        $http.post('/api/user/logout')
            .success(function () {
                $state.go('home');
                vm.user = undefined;
                console.log(vm.user)
            })
            .error(function (err) {

            })
    }
}