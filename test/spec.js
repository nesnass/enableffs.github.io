describe('Enable navigation testing', function() {
    beforeEach(function() {
        browser.get('#/basic');
    });

    it('should have a title from the basic controller', function() {
        browser.getTitle().then(function(text) {
            console.log('--> basic browser title: '+text);
            expect(text).toEqual('Enable basic page');
        });
    });

    describe('navigate to search', function() {

        beforeEach(function() {
            browser.get('#/search');
        });


        it('should render search when user navigates to /search', function() {
            browser.getTitle().then(function(text) {
                console.log('--> search browser title: '+text);
                expect(text).toEqual('Enable search results');
            });
        });

    });

    describe('perform search', function() {

        beforeEach(function() {
            browser.get('#/search?s=protractor');
        });


        it('should return 1, when search returns', function() {
            element.all(by.repeater('res in searchResults')).count().then(function(count) {
                console.log('--> searchResults count: '+count);
                expect(count).toEqual(1);
            });
        });

    });

    describe('open menu', function() {

        beforeEach(function() {
            browser.get('index.html');
        });

        var menuOpen = element(by.binding('menuOpen'));

        it('should return 1, when search returns', function() {
            element(by.id('hamburgerButton')).click().then(function() {

                element(by.id('link02')).click().then(function() {
                    expect(browser.getLocationAbsUrl()).toMatch("/home");

                    browser.getTitle().then(function(text) {
                        console.log('--> home browser title: '+text);
                        expect(text).toEqual('Enable home page');
                    });
                });
            });


        });

    });


});