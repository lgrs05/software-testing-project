(function() {

    'use strict';

    angular
        .module('photoSharing')
        .factory('HomeService', [
            '$http',
            HomeService
        ]);

    function HomeService($http) {
        var currentUser = null;
        var loggedIn = false;
        var unlabeledTweets = 0;
        var labeledTweets = 0;
        var service = {
            currentUser: currentUser,
            isLoggedIn: isLoggedIn,
            logout: logout,
            tweetsToLabel: tweetsToLabel,
            tweetsLabeled: tweetsLabeled,
            unlabeled:unlabeled,
            labeled:labeled,
            positiveTweets:positiveTweets,
            negativeTweets:negativeTweets,
            neutralTweets:neutralTweets,
            positive:positive,
            negative:negative,
            neutral:neutral,
            images: images
        };
        return service;

        /*
        * Implementation Details
        */

        function images(){
            return ["static/images/bg.jpg", "static/images/1.jpg", "static/images/2.jpg", "static/images/3.jpg",
        "static/images/4.jpg", "static/images/5.jpg", "static/images/6.jpg", "static/images/7.jpg", "static/images/8.jpg",
        "static/images/9.jpg", "static/images/10.jpg", "static/images/12.jpg","static/images/13.jpg", "static/images/14.jpg",
        "static/images/15.jpg", "static/images/16.jpg", "static/images/17.jpg", "static/images/18.jpg", "static/images/19.jpg",
        "static/images/20.jpg", "static/images/21.jpg", "static/images/22.jpg", "static/images/23.jpg"];
        }
        function positive(){
            return positive;
        }

        function negative(){
            return negative;
        }
        function neutral(){
            return neutral;
        }

        function unlabeled(){
            return unlabeledTweets;
        }

        function labeled() {
            return labeledTweets;
        }

        function tweetsToLabel(id){
            return $http.get("/home/tweets-to-label/" + id).then(function(response){
                unlabeledTweets = response.data;
            }).catch(function (reason) {
                //$log.log('Error loading tweets. Reason: '+ reason.data);
            });
        }

        function tweetsLabeled(id){
            return $http.get("/home/labeled-tweets-by-user/" + id).then(function(response){
                labeledTweets = response.data;
            }).catch(function (reason) {
                //$log.log('Error loading tweets. Reason: '+ reason.data);
            });
        }

        function positiveTweets(id){
            return $http.get("/home/label-tweets-by-user/" + id+"/"+1).then(function(response){
                positive = response.data;
            }).catch(function (reason) {
                //$log.log('Error loading tweets. Reason: '+ reason.data);
            });
        }

        function neutralTweets(id){
            return $http.get("/home/label-tweets-by-user/" + id+"/"+2).then(function(response){
                neutral = response.data;
            }).catch(function (reason) {
                //$log.log('Error loading tweets. Reason: '+ reason.data);
            });
        }

        function negativeTweets(id){
            return $http.get("/home/label-tweets-by-user/" + id+"/"+0).then(function(response){
                negative = response.data;
            }).catch(function (reason) {
                //$log.log('Error loading tweets. Reason: '+ reason.data);
            });
        }


        function isLoggedIn() {
            return service.currentUser !== null;
        }

        function logout() {
            //$log.log('Logging Out: ' + this.currentUser.email);

            service.currentUser = null;
            return $http.get('/auth/logout')
                .then(logoutComplete)
                .catch(logoutError);
            function logoutComplete(response) {
              //  $log.log('Logged out succesfully!');
            }
            function logoutError(error){
                //$log.log('Logout failed. Response: ' + error);
            }

        }
    }

}());

