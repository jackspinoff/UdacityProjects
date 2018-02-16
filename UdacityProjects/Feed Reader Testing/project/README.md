# Project Overview

In this project you are given a web-based application that reads RSS feeds.


# How will I complete this project?

1. Download the [required project assets](http://github.com/udacity/frontend-nanodegree-feedreader).
2. Review the functionality of the application within your browser.
3. Explore the application's HTML (*./index.html*), CSS (*./css/style.css*) and JavaScript (*./js/app.js*) to gain an understanding of how it works.
4. Explore the Jasmine spec file in *./jasmine/spec/feedreader.js*
5. Edit the allFeeds variable in *./js/app.js* to make the provided test fail and see how Jasmine visualizes this failure in your application.
6. Return the allFeeds variable to a passing state.
7. Write a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
8. Write a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
9. Write a new test suite named "The menu".
10. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
11. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
12. Write a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. Remember, loadFeed() is asynchronous so this test wil require the use of Jasmine's beforeEach and asynchronous done() function.
13. Write a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes. Remember, loadFeed() is asynchronous.
14. When complete - all of your tests should pass.

==================

# Tests Results

The tests have been added to the feedreader.js file, as requested, to test the described functionalities of the website. All the tests pass successfully.

**Tests:**

**RSS Feeds:**

* are defined
* URLs are defined and not empty
* names are defined and not empty

**The Menu:**

* has menu element hidden by default
* enables/disables menu-hidden property when menu icon is clicked

**Initial Entries:**

* contain at least one entry

**New Feed Selection:**

* changes feed content

# How to run the App

	1.Download or clone the repository and open it in your browser locally
	2.Open the main folder
	3.Open index.html on your favourite browser.
	4.All needed Jasmine libraries are included, there is a section below the web page showing the test results.

or click on the following link:

* [Feed Reader Testing](http://jackspinoff.github.io/dist/index.html)
