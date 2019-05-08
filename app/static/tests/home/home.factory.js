describe("Home Service Tests:", function (){
    var $controller;
    var HomeService;
    var ctrl;
    var scope;
// Setup for all tests
  beforeEach(function() {

    // loads the app module
    module("photoSharing");
    inject(function(_$controller_, $rootScope, _HomeService_) {
      // inject removes the underscores and finds the $controller Provider
      scope = $rootScope.$new();

      HomeService = _HomeService_;
      $controller = _$controller_;

      ctrl = $controller('HomeCtrl', {
            $scope: scope,
            HomeService: _HomeService_
        });
    });




  });

// Test (spec)
  it("Test Service", function() {
    var $scope = {};
    // $controller takes an object containing a reference to the $scope
    //var controller = $controller("HomeCtrl", { $scope: $scope, HomeService: HomeService  });

    // the assertion checks the expected result
    expect(HomeService).toBeDefined();

  });

});

