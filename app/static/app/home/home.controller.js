(function() {

    'use strict';

    angular
        .module('photoSharing')
        .controller('HomeCtrl', [
            '$scope',
            '$log',
            '$mdDialog',
            'HomeService',
            HomeController
        ]);

    function HomeController($scope, $log, $mdDialog, HomeService) {

        //$scope.currentUser = AppService.currentUser;

        //$scope.imag = "static/images/bg.jpg";
        $log.log('Hello World from the Home Controller using the $log Service');
        //localStorage.setItem("state", $state.current.name);

        var s;
        $scope.showing = false;
        $scope.images = HomeService.images();

        $scope.sections= [
            $scope.images.slice(0,$scope.images.length/6),
            $scope.images.slice($scope.images.length/6, 2*$scope.images.length/6),
            $scope.images.slice(2*$scope.images.length/6,$scope.images.length/2),
            $scope.images.slice($scope.images.length/2, 2*$scope.images.length/3),
            $scope.images.slice(2*$scope.images.length/3, 5*$scope.images.length/6),
            $scope.images.slice(5*$scope.images.length/6,$scope.images.length)
        ];

$scope.cancel = function() {
      $scope.showing = false;
      $mdDialog.cancel().finally(function() {
            angular.element(document.querySelector('html')).attr('style', '');
          }).then(function (result) {
              scrollTo(document.body.scrollLeft, s);

      });
      //scrollTo(0, s);
      //window.scroll(0,s);
     // document.getElementsByTagName('html')[0].removeClass('not-grey');

    };

var close = function(){
    $scope.showing = false;
};
var open = function(){
    $scope.showing = true;
};

$scope.hide = function() {
      $mdDialog.hide();
    };

$scope.show = function(ev,currentSrc){
    $scope.current = currentSrc;
    s = document.body.scrollTop;
    var h = $('#dt').height();

            if(h >= 300)
            $('#comments').height($('#dt').height());
            else
                $('#comments').height(300);
    angular.element(document.querySelector('html')).attr('style', 'overflow-y: hidden');
    $mdDialog.show({
        contentElement: '#myDialog',
        disableParentScroll: true,
        //parent: angular.element(document.body.),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose: false,
        fullscreen: false,
        onRemoving: function (el, removePromise) {
            $scope.cmmnt = '';
            
        }
    });
            angular.element(document.querySelector('html')).attr('style', 'overflow-y: auto');


    $scope.showing = true;
    //location.href='#myDialog';
    //var el = document.getElementsByTagName('html')[0];

   // el.setAttribute("style", "overflow-y: initial;");


};
$scope.animateElementIn = function($el) {
  $el.removeClass('not-visible');
  $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
};

$scope.animateElementOut = function($el) {
  $el.addClass('not-visible');
  $el.removeClass('animated fadeInUp');
  // $el.removeClass('gallery_effect');// this example leverages animate.css classes
};
$scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
        function init() {
            // AOS.init({
            //     easing: 'ease-out-back',
            //     duration: 1000
            // });

            jQuery(document).ready(function ($) {
                $(".scroll").click(function (event) {
                    event.preventDefault();
                    $('html,body').animate({
                        scrollTop: $(this.hash).offset().top
                    }, 900);
                });
            });

            $(document).ready(function () {
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
        };
    }
})();