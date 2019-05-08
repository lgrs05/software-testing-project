(function() {

    'use strict';

    angular
        .module('photoSharing')
        .controller('AppCtrl', [
            '$scope',
            '$log',
            '$state',
            'AppService',
            AppController
        ]);

    function AppController($scope, $log, AppService, $state) {
        $log.log('Hello World from the App Controller using the $log Service ');
        $scope.title = 'Hell App';






        AOS.init({
            easing: 'ease-out-back',
            duration: 1000
        });


        jQuery(document).ready(function($) {
            $(".scroll").click(function(event) {
                event.preventDefault();
                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top
                }, 900);
            });
        });



        $(document).ready(function() {
            /*
            						var defaults = {
            							  containerID: 'toTop', // fading element id
            							containerHoverID: 'toTopHover', // fading element hover id
            							scrollSpeed: 1200,
            							easingType: 'linear'
            						 };
            						*/

            $().UItoTop({
                easingType: 'easeOutQuart'
            });

        });



    }
})();