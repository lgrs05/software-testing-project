(function() {

    'use strict';

    angular
        .module('photoSharing', [
            'ui.router',
            'ngMaterial',
            'ngMessages',
            'angular-scroll-animate'
        ])
        .config([
            '$locationProvider',
            '$stateProvider',
            '$urlRouterProvider',
            App
          ]);

        function App($locationProvider, $stateProvider, $urlRouterProvider) {
            // HTML5 Mode for compatibility with Flask
            $locationProvider.html5Mode(true);

            // State declarations
            $stateProvider
                .state({
                    name: 'app',
                    abstract: true,
                    url: '/',
                    templateUrl: '/static/app.html',
                    controller: 'AppCtrl'
                })
                // .state({
                //     name: 'app.login',
                //     url: '',
                //     templateUrl: '/static/views/login.html',
                //     controller: 'AuthCtrl'
                // })
                .state({
                    name: 'app.home',
                    url: '',
                    templateUrl: '/static/views/home.html',
                    controller: 'HomeCtrl'
                })
                .state({
                    name: 'app.about',
                    url: '',
                    templateUrl: '/static/views/about.html',
                    controller: 'AboutCtrl'
                });
                // .state({
                //     name: 'app.register',
                //     url: '',
                //     templateUrl: '/static/views/register.html',
                //     controller: 'AuthCtrl'
                // })
                //
                // .state({
                //     name: 'app.shared',
                //     url: '',
                //     templateUrl: '/static/views/shared.html',
                //     controller: 'SharedCtrl'
                // })
                // .state({
                //     name: 'app.profile',
                //     url:'',
                //     templateUrl: '/static/views/profile.html',
                //     controller: 'ProfileCtrl'
                // });

            $urlRouterProvider.when('/home', '/');
            $urlRouterProvider.otherwise('/');
        }

})();