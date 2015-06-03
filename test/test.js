describe("A suite is just a function", function() {
    var a;

    it("and so is a spec", function() {
        a = true;
        console.log('hey');
        expect(a).toBe(true);
    });
});


describe('Controller: public/MenuCtrl', function() {

    var $rootScope, $scope, $controller;

    beforeEach(module('EnableApp'));

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('MenuCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
    }));

    it('should make about menu item active.', function() {
        expect($rootScope.roottitle = "Enable portal");
    });
});