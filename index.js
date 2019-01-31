document.addEventListener( 'DOMContentLoaded', () => {
  getFrontPage()
} )

const getFrontPage = () => {
  let my_data_fetcher = new XMLHttpRequest();
  my_data_fetcher.open( 'GET', 'https://api.reddit.com' );

  my_data_fetcher.addEventListener( 'load', e => {
    JSON.parse( my_data_fetcher.response )
      .data
      .children
      .map( post => {
        return post
      } )
      .slice( 0, 10 )
      .forEach( post => document.querySelector( 'main' ).insertAdjacentHTML( 'beforeend', `<li><a href=${post.data.url}>${post.data.title}</a></li>` ) );
  } );

  my_data_fetcher.addEventListener( 'error', ev => {
    document.querySelector( 'main' ).innerHTML = 'An error has occurred'
  } );

  my_data_fetcher.send();
}