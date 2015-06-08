describe('Controller: public/MenuCtrl', function() {

    beforeEach(module('EnableApp'));

    var $controller, $rootScope;

    beforeEach(inject(function(_$rootScope_, _$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    describe('MenuCtrl', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('MenuCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
        });

        it('should set the portal window title', function() {
            expect($rootScope.roottitle = "Enable portal");
        });

        it('should load the searchable tags', function() {
            expect($scope.loadSearchTags() != null);
        });

        it('should execute a search for the term "HTML"', function() {
            var res = $scope.querySearch('HTML');
            console.log('--> $scope.querySearch: '+res);
            expect(res != null);
        });
    });

});