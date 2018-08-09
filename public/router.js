angular.module('crud', ['ui.router'])
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/'); //if page not found then redirect to root page

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        })

        .state('adminpanel', {
            url: '/adminpanel/:user_id',
            templateUrl: 'views/adminpanel.html',
            controller: 'AdminPanelCtrl',
            controllerAs: 'vm'
        })

        .state('singleproduct', {
            url: '/singleproduct/:id',
            templateUrl: 'views/singleproduct.html',
            controller: 'SingleProductCtrl',
            controllerAs: 'vm'
        })


};