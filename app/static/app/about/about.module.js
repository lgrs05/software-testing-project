(function() {

    'use strict';

    angular
        .module('photoSharing.about', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            About
        ]);

    function About($stateProvider, $urlRouterProvider) {

    }
})();
