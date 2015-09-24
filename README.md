# Project Overview
The purpose of the project is to get familiar with the testing framework
Jasmine and implement a few tests for a basic feedreader.

In addition to the required tests, I implemented:
* `MockFeedLoader`, a mock for the Google feed API which can be used for all
  presentation-only tests (hence tests run faster, and offline execution
  becomes possible)
* The 'Initial Entries' test suite is split into two sub-suites, one with
  the original test, and another one, using the above mock, that tests only
  the presentation aspects
* A test for the initialization of `.header-title` (also using the mock).
  The test checks whether the title is initialized from the result of the
  API call. Currently, it fails, because, the title is initialized from the
  hardcoded `allFeeds` data.  I (as imaginary product owner) would rather
  have it to be retrieved from the API data.

# Installation and Execution

Simple: Clone this repository, and open `index.html` in a browser.

You should see something analogous to the following (the feed content might be different, and note the canvas was scrolled to
show the Jasmine results, including the intentional failure):

<img src="https://github.com/andreaswachowski/frontend-nanodegree-feedreader/blob/master/screenshot.png" height=auto width="100%">


# Resources
* [Jasmine](http://jasmine.github.io/)
* [Original project](http://github.com/udacity/frontend-nanodegree-feedreader) (from which this one is forked).
