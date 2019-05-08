(function() {

    'use strict';

    angular
        .module('photoSharing.shared', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Shared
        ]);

    function Shared($stateProvider, $urlRouterProvider) {

    }
})();
