describe('Protractor Demo App', function() {
    beforeEach(function() {
        browser.get('index.html');
    });

    it('should have a title from the basic controller', function() {
        expect(browser.getTitle()).toEqual('Enable basic page');
    });
});