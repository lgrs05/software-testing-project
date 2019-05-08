describe("Home Controller Tests:", function (){
    var $controller;
    var HomeService;
    var ctrl;
    var scope;
// Setup for all tests
  beforeEach(function() {
      module({
        // loads the Home Service
        MockService: {
            images: function (){
                return ["static/images/1.jpg", "static/images/2.jpg", "static/images/3.jpg",
        "static/images/4.jpg", "static/images/5.jpg", "static/images/6.jpg", "static/images/7.jpg", "static/images/8.jpg",
        "static/images/9.jpg", "static/images/10.jpg", "static/images/12.jpg","static/images/13.jpg", "static/images/14.jpg",
        "static/images/15.jpg", "static/images/16.jpg", "static/images/17.jpg", "static/images/18.jpg", "static/images/19.jpg",
        "static/images/20.jpg", "static/images/21.jpg", "static/images/22.jpg", "static/images/23.jpg"];
            }
        }

    });
    // loads the app module
    module("photoSharing");
    inject(function(_$controller_, $rootScope, _MockService_) {
      // inject removes the underscores and finds the $controller Provider
      scope = $rootScope.$new();

      HomeService = _MockService_;
      $controller = _$controller_;

      ctrl = $controller('HomeCtrl', {
            $scope: scope,
            HomeService: _MockService_
        });
    });




  });

// Test (spec)
  it("Test", function() {
    var $scope = {};
    // $controller takes an object containing a reference to the $scope
    var controller = $controller("HomeCtrl", { $scope: $scope, HomeService: HomeService  });

    // the assertion checks the expected result
    expect($scope.images.length).toEqual(22);

  });

});