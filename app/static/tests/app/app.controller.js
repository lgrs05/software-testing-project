// Suite
describe("Testing a Hello App controller", function() {
    var $controller;

  // Setup for all tests
  beforeEach(function() {
    // loads the app module
    module("photoSharing");
    inject(function(_$controller_) {
      // inject removes the underscores and finds the $controller Provider
      $controller = _$controller_;
    });
  });


  // Test (spec)
  it("should say 'Hello App'", function() {
    var $scope = {};
    // $controller takes an object containing a reference to the $scope
    var controller = $controller("AppCtrl", { $scope: $scope });
    // the assertion checks the expected result
    expect("").toEqual("");
  });

});