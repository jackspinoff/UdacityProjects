/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed in the
         * allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* A test that loops through each feed in the
         * allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual("");
            });
        });
    });// End of Describe function


    /*---- "The menu" Test ----*/

    describe('The menu', function(){

        /* A test that ensures the menu element is
         * hidden by default. Analysed HTML and the CSS
         * to determine how the hiding/showing feature
         * of the menu element is performed.
         */

        // When page loads check to see if body has .menu-hidden
        it('has menu element hidden by default',function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        /* Check if the body has or not a .menu-hidden for
         * each click on the menuIcon
         */
        it('enables/disables menu-hidden property when menu icon is clicked',function() {
            var menuIconCheck = $('.menu-icon-link');
            // tests clicking the menu-icon-link

            menuIconCheck.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIconCheck.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    }); //end of Describe function

    /*---- "Initial Entries" Test ----*/

    describe('Initial Entries', function() {

        /* A test ensuring that, when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // beforeEach waiting for async calls to finish
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Check if at least 1 feed entry has been added
        it('contain at least one entry',function(){
            var entryNumber = $('.entry').length;
            expect(entryNumber).toBeGreaterThan(0);
        });
    });//end of Describe function


    /*---- "New Feed Selection" Test ----*/

    describe('New Feed Selection', function() {

        /* A test ensuring that, when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var oldFeed;
        var newFeed;
        // beforeEach waiting for async calls to finish
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed .entry').html();
                // loads a different feed
                loadFeed(1, done);
            });
        });

        it('changes feed content', function(done) {
            newFeed = $('.feed .entry').html();
            expect(newFeed).not.toBe(oldFeed);
            console.log(newFeed);
            console.log(oldFeed);
            done();
        });
    }); // end of Describe function
}()); // end of Test function
