(function() {

    'use strict';

    angular
        .module('photoSharing.profile', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Profile
        ]);

    function Profile($stateProvider, $urlRouterProvider) {

    }
})();
