# Asynchrony With XHR Lab

## Learning Goals

- Construct a complete XHR request
- Combine an XHR event with DOM manipulation
- Handle an unsuccessful request

## Introduction

In this lab, we are going to practice creating an XHR request. To make things a
bit more exciting, we will be incorporating some skills we've learned previously
in JavaScript.
Specifically, we're going to build our own version of
[Reddit's front page][front] using XHR, the Reddit API, and DOM
manipulation.

Reddit is a forum based website that utilizes a voting system to display the
most popular content on its front page. Your task will be to retrieve the **top
ten** most popular posts currently on Reddit. You will then need to take the
title and URL of these posts and create your own list of links!

## Instructions

Code your solution within the provided `getFrontPage()` function. When
`index.html` loads and calls `getFrontPage()`, open and send an XHR request to
`https://api.reddit.com`.

## Display Requested Content to the DOM

Using an event listener, on `load`, use `JSON.parse()` to convert the XHR
response. The parsed JSON object contains the top postscurrently on Reddit
(stored as an array of objects within `data.children` on the JSON object)

- Use **only** the first 10 posts
- For each post, create an `li` DOM element that contains an `a` DOM element.
  Set the `href` attribute to the post's URL, and the inner text to the post's title
- The list items should all be appended within the `main` DOM element provided
  in `index.html`

Once you have everything working, you should be passing all be the final test
if you run `learn`.

## Handling a Failed Request

Once you have successfully retrieved and displayed 10 links and titles from
Reddit, create a second event listener that fires on `error`. On error, instead
of adding list items to the DOM, set the inner text of the `main` element to
`'An error has occurred'`.

If you're trying see how this behavior would work in a browser, open `index.html` in Chrome, and, in DevTools, navigate to the Network tab. From here, you can
choose to simulate offline behavior by toggling the 'Offline' checkbox. Once
checked, refresh the page to see your DOM change.

## Conclusion

## Resources

[front]: https://www.reddit.com/
