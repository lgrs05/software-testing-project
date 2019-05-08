(function() {

    'use strict';

    angular
        .module('photoSharing')
        .controller('AuthCtrl', [
            '$scope',
            '$log',
            'AuthService',
            'AppService',
            '$state',
            AuthController
        ]);

    function AuthController($scope, $log, AuthService, AppService, $state) {
        $log.log('Hello World from the auth Controller using the $log Service');
        //AppService.saveState('app.auth');


            
        addEventListener("load", function() {
            setTimeout(hideURLbar, 0);
        }, false);

        function hideURLbar() {
            window.scrollTo(0, 1);
        }
    
        
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