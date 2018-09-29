/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined url', () => {
            allFeeds.forEach((feed) => {
                console.log(feed);
                expect(feed.url).toBeDefined();
                expect(feed.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has defined name and is not empty', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            });
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', () => {

        /* This test ensures the menu element is
         * hidden by default. 
         */
        it('the menu element is hidden by default', () => {
            expect($('body')).toHaveClass('menu-hidden');
        });


        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('menu display is clicked & unclicked', () => {
            /*variable to be checked on click*/
            let menuDisplay = $('.menu-icon-link');
            menuDisplay.click();
            expect($('body')).not.toHaveClass('menu-hidden');
            menuDisplay.click();
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    /* This test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        beforeEach((done) => {
            loadFeed(0, done);
        });

        /* This test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has entry element', () => {
            let entry = $('.feed .entry')[0];
            expect(entry).toBeDefined();
        })
    });

    /* This test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        let initialFeed, finalFeed;
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                initialFeed = $('.feed').find("h2").first().text();
                loadFeed(1, () => {
                    finalFeed = $('.feed').find("h2").first().text();
                    done();
                });
            });
        });

        it('content changes with feed', (done) => {
            expect(initialFeed).not.toEqual(finalFeed);
            loadFeed(0, () => {
                done();
            });
        });
    });

}());