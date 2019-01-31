const sinon = require( 'sinon' );

describe( 'index.js', () => {
  describe( 'getFrontPage()', () => {
    let astronauts;
    let results;
    before( () => {
      xhr = sinon.useFakeXMLHttpRequest();
      window.XMLHttpRequest = xhr;

      xhr.onCreate = function ( req ) {
        requests.push( req );
      };
    } );

    beforeEach( () => {
      requests = [];
    } );

    after( () => {
      requests = [];
      xhr.restore();
    } );

    it( "sends an XHR request to 'https://api.reddit.com'", () => {
      expect( requests.length ).to.eql( 0 );
      getFrontPage();
      expect( requests.length ).to.eql( 1 );
      expect( requests[ 0 ][ 'url' ] ).to.eql( 'https://api.reddit.com' );
    } );

    it( 'sends a XHR GET request', () => {
      expect( requests.length ).to.eql( 0 );
      getFrontPage();
      expect( requests.length ).to.eql( 1 );
      expect( requests[ 0 ][ 'method' ] ).to.eql( 'GET' );
    } );

    it( 'uses XMLHttpRequest(), not fetch()', () => {
      expect( getFrontPage.toString(), 'expecting an XMLHttpRequest' ).to.match(
        /XMLHttpRequest\((.*?)\)/
      );
      expect(
        getFrontPage.toString(),
        'the fetch() function was found in myFetch'
      ).to.not.match( /fetch\((.*?)\)/ );
    } );

    it( 'adds received content to the DOM', () => {
      document.querySelector( 'main' ).innerHTML = '';
      getFrontPage();

      requests[ 0 ].respond(
        200, {
          'Content-Type': 'application/json'
        },
        JSON.stringify( {
          data: {
            children: [ {
                data: {
                  title: 1,
                  url: 'test1'
                }
              },
              {
                data: {
                  title: 2,
                  url: 'test2'
                }
              },
              {
                data: {
                  title: 3,
                  url: 'test3'
                }
              },
              {
                data: {
                  title: 4,
                  url: 'test4'
                }
              },
              {
                data: {
                  title: 5,
                  url: 'test5'
                }
              },
              {
                data: {
                  title: 6,
                  url: 'test6'
                }
              },
              {
                data: {
                  title: 7,
                  url: 'test7'
                }
              },
              {
                data: {
                  title: 8,
                  url: 'test8'
                }
              },
              {
                data: {
                  title: 9,
                  url: 'test9'
                }
              },
              {
                data: {
                  title: 10,
                  url: 'test10'
                }
              },
              {
                data: {
                  title: 11,
                  url: 'test11'
                }
              }
            ]
          }
        } )
      );

      expect( document.querySelector( 'main' ).innerHTML, 'nothing changed in <main></main>' ).to.not.eql( '' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test1">1</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test2">2</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test3">3</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test4">4</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test5">5</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test6">6</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test7">7</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test8">8</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test9">9</a></li>' );
      expect( document.querySelector( 'main' ).innerHTML, 'missing DOM elements' ).to.include( '<li><a href="test10">10</a></li>' );
    } );

    it( 'only adds the first 10 links received to the DOM', () => {
      document.querySelector( 'main' ).innerHTML = '';
      getFrontPage();

      requests[ 0 ].respond(
        200, {
          'Content-Type': 'application/json'
        },
        JSON.stringify( {
          data: {
            children: [ {
                data: {
                  title: 1,
                  url: 'test1'
                }
              },
              {
                data: {
                  title: 2,
                  url: 'test2'
                }
              },
              {
                data: {
                  title: 3,
                  url: 'test3'
                }
              },
              {
                data: {
                  title: 4,
                  url: 'test4'
                }
              },
              {
                data: {
                  title: 5,
                  url: 'test5'
                }
              },
              {
                data: {
                  title: 6,
                  url: 'test6'
                }
              },
              {
                data: {
                  title: 7,
                  url: 'test7'
                }
              },
              {
                data: {
                  title: 8,
                  url: 'test8'
                }
              },
              {
                data: {
                  title: 9,
                  url: 'test9'
                }
              },
              {
                data: {
                  title: 10,
                  url: 'test10'
                }
              },
              {
                data: {
                  title: 11,
                  url: 'test11'
                }
              }
            ]
          }
        } )
      );
      expect( document.querySelector( 'main' ).innerHTML, 'more than 10 links present on the page' ).to.not.include( '<li><a href="test11">11</a></li>' );
    } );

    it( 'adds "An error has occurred" to the DOM if content fails to load', () => {
      document.querySelector( 'main' ).innerHTML = '';
      getFrontPage();

      requests[ 0 ].error();
      expect( document.querySelector( 'main' ).innerHTML, 'error message not present on the DOM' ).to.include( 'An error has occurred' );
    } );
  } );
} );
