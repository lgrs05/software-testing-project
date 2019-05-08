(function() {

    'use strict';

    angular
        .module('photoSharing.auth', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Auth
        ]);

    function Auth($stateProvider, $urlRouterProvider) {

    }
})();
