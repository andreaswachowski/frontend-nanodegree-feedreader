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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* FYI: Below, the numberings (8), (9), etc. correspond to the
         * enumeration in the instructions on Udacity's website).
         */

        /* (8) Ensure that each feed in allFeeds has a URL defined
         * and that the URL is not empty.
         */
        it('have a non-empty URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* (9) Ensure each feed in allFeeds has a name defined
         * and that the name is not empty.
         */
        it('have a non-empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });

    /* (10) A new test suite named "The menu" */
    describe('The menu', function() {
        /* (11) Ensure the menu element is hidden by default. */
        it('is hidden by default', function() {
            var menuHidden = $('body.menu-hidden');
            expect(menuHidden).toBeDefined();
        });

        /* (12) Ensure the menu changes visibility when the menu icon
         * is clicked.
         */
        it('is toggled between visible and hidden on clicking the menu icon', function() {
            var menuHidden;

            // Show menu
            $('.menu-icon-link').click();
            menuHidden = $('body.menu-hidden');
            expect(menuHidden).toBeDefined();
            expect(menuHidden.length).toBe(0);

            // Hide menu
            $('.menu-icon-link').click();
            menuHidden = $('body.menu-hidden');
            expect(menuHidden).toBeDefined();
            expect(menuHidden.length).toBe(1);
        });
    });

    /* (13) A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0,done);
        });


        /* (14) Ensure there is at least a single .entry in the .feed
         * container after loadFeed() completes.
         */
        it('contain at least one .entry inside .feed', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* (15) A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* (16) Ensure when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        var firstEntryOfFirstFeed, firstEntryOfSecondFeed;

        beforeEach(function(done) {
            loadFeed(0,function() {
                // The feed contains at least one entry, as guaranteed by
                // test (14)
                // Extract the heading text of this entry:
                firstEntryOfFirstFeed = $('.feed .entry h2')[0].innerText;

                // Do the same, this time with feed 1:
                loadFeed(1, function() {
                    firstEntryOfSecondFeed = $('.feed .entry h2')[0].innerText;
                    done();
                });
            });
        });

        it('changes the content displayed', function(done) {
            // To be clear, just comparing only the headings of the first
            // entries of the feeds is not a 100% guarantee that the feeds
            // are different. But in all likelihood this condition should be
            // sufficient.
            expect(firstEntryOfFirstFeed).not.toBe(firstEntryOfSecondFeed);
            done();
        });
    });
}());
