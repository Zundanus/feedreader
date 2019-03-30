/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
  /* a test suite just contains a related set of tests. This suite is all about
   *  the RSS feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {

    /**
     * @description  validate with jasmin a given object to be a
     *               valid and filled string
     * @param {string} value - string to be validated
     */
    function validateField(value) {
      expect(value).toBeDefined();
      expect(value).toBeString;
      expect(value.length).not.toBe(0);
    }

    // Verifies if the feeds have been defined and that they are not empty
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    // Verifies if the feeds url porberty is filld and valid.
    // rexex from https://stackoverflow.com/questions/30970068/js-regex-url-validation
    it('has valid url', function() {
      for (let feed of allFeeds) {
        validateField(feed.url);
        //expect(feed.url).toMatch(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      }
    });

    // Verifies if the feeds url porberty is filld and valid.
    it('has valid name', function() {
      for (let feed of allFeeds) {
        validateField(feed.name);
      }
    });
  });


  /*  a test suite for the menu validation" */
  describe('The menu', function() {

    // Verifies that the menu element is hidden by default.
    it('menu hidden by default', function() {
      expect(document.querySelector('body').classList.contains('menu-hidden')).toBeTruthy();
    });

    /* Verifies that the menu changes visibility when the menu icon is clicked. */
    it('menu changes visibility', function() {
      document.querySelector('.menu-icon-link').click();
      expect(document.querySelector('body').classList.contains('menu-hidden')).not.toBeTruthy();
      document.querySelector('.menu-icon-link').click();
      expect(document.querySelector('body').classList.contains('menu-hidden')).toBeTruthy();
    });

  });

  /* test suite to validate the "Initial Entries" loading */
  describe('Initial Entries', function() {
    //async loading
    beforeEach(function() {
      return new Promise(function(resolve, reject) {
        loadFeed(0, function() {
          resolve();
        });
      });
    });
    // validate if the feeds are loaded
    it('loadFeed is loaded', function() {
      const elements = document.querySelector('.feed').children;
      expect(elements.length).not.toBe(0);

      for (const element of elements) {
        expect(element.querySelector('.entry')).toBeDefined();
      }
    });
  });


  /* test suite to validate the "New Feed Selection" */
  describe('New Feed Selection', function() {
    let firstFeed = null;
    let secondFeed = null;

    /**
     * @description  validate with jasmin a given object to be a
     *               valid and filled string
     * @returns {string} - returns the value of href that is in the first
     *                     "entry-link" element
     */
    function getEntryLink() {
      const elements = document.querySelector('.entry-link');
      if (elements != null) {
        return elements.getAttribute("href");
      }
      return null;
    }

    /*load feed data for the test */
    beforeEach(function() {
      firstFeed = getEntryLink();
      return new Promise(function(resolve, reject) {
        loadFeed(1, function() {
          secondFeed = getEntryLink();
          resolve();
        });
      });
    });

    /* Verifies that when a new feed is loaded the data is changed   */
    it('new feed is loaded', function() {
      expect(firstFeed).not.toBe(secondFeed);
    });
  });
}());
