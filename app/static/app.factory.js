(function() {

    'use strict';

    angular
        .module('photoSharing')
        .factory('AppService', [
            '$log',
            '$http',
            //'$cookies',
            AppService
        ]);

    function AppService($log, $http) {
        var service = {};
        console.log('AppService:');
        return service;

    }

}());

