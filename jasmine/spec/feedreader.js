/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/**
 * A Mock for google.feeds.Feed
 *
 * It stubs out just enough of google.feeds.Feed that it can be used to test
 * loadFeed without actually accessing the Google API.
 *
 * The mock is DOM-independent and can therefore be defined outside
 * the $() function.
 */
MockFeedLoader = function(feedUrl) {
    this.feedUrl = feedUrl;
};

/* Mock feed contents, to allow testing independent of the API
 *
 * The data has been retrieved on 2015-09-22 from the Google API.
 * It (specifically, its format) could also serve to detect regressions
 * against that API later on.
 *
 * Not all of the data is needed for the moment, but most has been kept for
 * future use. The exception is the 'content' property, which is usually
 * large and was emptied.
 *
 */
MockFeedLoader.feedContents = [
    {
        "feedUrl": "http://blog.udacity.com/feeds/posts/default?alt=rss",
        "title": "Udacity Blog",
        "link": "http://blog.udacity.com/",
        "author":"",
        "description": "Advance your education and your career with project-based, self-paced online courses in tech.",
        "type": "rss20",
        "entries": [
            {
                "title": "4 Times Data Science Saved the Day",
                "link": "http://blog.udacity.com/2014/12/4-times-data-science-saved-day_3.html",
                "author": "noreply@blogger.com (Mark Nguyen)",
                "publishedDate": "Wed, 03 Dec 2014 10:31:00 -0800",
                "contentSnippet":"",
                "content":"",
                "categories": ["Data Science"]
            },
            {
                "title": "Dawoon Choi: Golfer to Programmer",
                "link": "http://blog.udacity.com/2014/11/student-stories-dawoon-choi-programmer.html",
                "author": "noreply@blogger.com (ChiWei Ranck)",
                "publishedDate": "Fri, 28 Nov 2014 07:26:00 -0800",
                "contentSnippet": "",
                "content": "",
                "categories": ["front-end web dev", "Nanodegrees", "Student Stories"]
            },
            {
                "title": "Data Analysts: What You'll Make and Where You'll Make It",
                "link": "http://blog.udacity.com/2014/11/data-analysts-what-youll-make.html",
                "author": "noreply@blogger.com (Allison Stadd)",
                "publishedDate": "Wed, 26 Nov 2014 08:00:00 -0800",
                "contentSnippet": "",
                "content": "",
                "categories": ["Careers", "Data Science"]
            },
            {
                "title": "Informational Interviews: How to Find Your Next Job Over Coffee",
                "link": "http://blog.udacity.com/2014/11/informational-interviews-how-to-find.html",
                "author": "noreply@blogger.com (Allison Jones)",
                "publishedDate": "Fri, 21 Nov 2014 08:50:00 -0800",
                "contentSnippet": "",
                "content": "",
                "categories": ["Careers"]
            }
        ]
    },
    {
        "feedUrl": "http://css-tricks.com/feed",
        "title": "CSS-Tricks",
        "link": "https://css-tricks.com",
        "author": "",
        "description": "Tips, Tricks, and Techniques on using Cascading Style Sheets.",
        "type": "rss20",
        "entries": [
            {
                "title": "Customising Cross-Browser Range Inputs with CSS and JavaScript",
                "link": "https://css-tricks.com/custom-interactive-range-inputs/",
                "author":"Guest Author",
                "publishedDate": "Tue, 22 Sep 2015 05:57:12 -0700",
                "contentSnippet": " The following is a guest post by Steven Estrella. Steven shared with me a technique for creating customized range inputs by ...",
                "content": "",
                "categories": ["Article"]
            },
            {
                "title": "How To Do Knockout Text",
                "link": "https://css-tricks.com/how-to-do-knockout-text/",
                "author": "Chris Coyier",
                "publishedDate": "Mon, 21 Sep 2015 07:11:48 -0700",
                "contentSnippet": "There are a couple of ways to do knockout text (text that appears cut out, such that you can see a background behind it) on the ...",
                "content": "",
                "categories": ["Article"]
            },
            {
                "title": "Discussion Around Ad Blocking",
                "link": "https://css-tricks.com/discussion-around-ad-blocking/",
                "author": "Chris Coyier",
                "publishedDate": "Sat, 19 Sep 2015 07:48:23 -0700",
                "contentSnippet": "The discussion has heated up with the drop of iOS 9 and its ability to run apps that block ads. That was just the spark for the ...",
                "content": "",
                "categories": ["Article"]
            },
            {
                "title": "The Tools Designers Are Using Today",
                "link": "http://tools.subtraction.com/",
                "author": "Chris Coyier",
                "publishedDate": "Fri, 18 Sep 2015 10:08:08 -0700",
                "contentSnippet": "In the spirit of gathering data on tooling that's been going around, here's Khoi Vinh's data on design tools. No surprises this ...",
                "content": "",
                "categories": ["Link"]
            }
        ]
    }
];

/* Works as the google feed load function, except it returns
 * fixed, hardcoded data to avoid the actual API call
 */
MockFeedLoader.prototype.load = function(cb) {
    var self=this;
    var feedData = MockFeedLoader.feedContents.filter(function(feed) {
        return feed.feedUrl === self.feedUrl;
    })[0];

    cb({
        error: false,
        feed: feedData
    });
};

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

        describe('when retrieved from Google', function() {
            beforeEach(function(done) {
                $('.feed').empty();
                loadFeed(0,done);
            });

            /* (14) Ensure there is at least a single .entry in the .feed
             * container after loadFeed() completes.
             */
            it('contain at least one .entry inside .feed', function() {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
        });

        describe('when focusing on the presentation', function() {
            beforeEach(function(done) {
                $('.feed').empty();
                expect($('.feed .entry').length).toBe(0);
                var feedIdx = 0;
                spyOn(window,'getGoogleFeed').and.returnValue(new MockFeedLoader(allFeeds[feedIdx].url));
                loadFeed(feedIdx,done);
            });

            it('are laid out in the ".feed .entry" in the HTML', function() {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
    });

    });

    /* (15) A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* (16) Ensure when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        var firstEntryOfOneFeed, firstEntryOfADifferentFeed;

        beforeEach(function(done) {
            var feed1 = 0, feed2 = 1;

            // Make sure the URLs are different, so the likelihood of
            // retrieving different results is maximized.
            // (also, if this ever changes, debugging should be faster)
            expect(allFeeds[feed1].url).not.toBe(allFeeds[feed2].url);

            loadFeed(feed1,function() {
                // The feed contains at least one entry, as guaranteed by
                // test (14)
                // Extract the heading text of this entry:
                firstEntryOfOneFeed = $('.feed .entry h2').first().html();

                // Do the same, this time with feed 1:
                loadFeed(feed2, function() {
                    firstEntryOfADifferentFeed = $('.feed .entry h2').first().html();
                    done();
                });
            });
        });

        it('changes the content displayed', function() {
            // To be clear, just comparing only the headings of the first
            // entries of the feeds is not a 100% guarantee that the feeds
            // are different. But in all likelihood this condition should be
            // sufficient.
            expect(firstEntryOfOneFeed).not.toBe(firstEntryOfADifferentFeed);
        });
    });

    describe('The current feed\'s title', function() {
        var feedIdx = 1;

        beforeEach(function(done) {
            spyOn(window,'getGoogleFeed').and.returnValue(new MockFeedLoader(allFeeds[feedIdx].url));
            loadFeed(feedIdx,done);
        });

        it('is initialized from the API and displayed in .header-title', function() {
            // The feed's title is currently *not* taken from the result of
            // the API call (returning "CSS-Tricks"), but from the hardcoded
            // allFeeds data (yielding "CSS Tricks", without hyphen)

            expect($('.header-title').first().html()).toBe(MockFeedLoader.feedContents[feedIdx].title);
        });
    });
}());
