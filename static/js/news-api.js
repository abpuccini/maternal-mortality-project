// This unused file is for manually fetching JSON from the NewsAPI

// We will hardcode HTML instead of fetching JSON from an API or locally.
// Even with a proxy server, requests from the browser are not allowed on the NewsAPI Developer plan, except from localhost.
// NewsAPI fetches up to one month of data on the Developer plan.

// var data = require('./json/news-api-maternal-mortality-2021-01-23-2021-02-22.json');
// console.log(data);
// fetch("../json/news-api-maternal-mortality-2021-01-23-2021-02-22.json'")
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   });

// console.log(data);

// // -----Fetching-----
// var url = 'http://newsapi.org/v2/everything?' +
//           'q=Maternal%20Mortality&' +
//           'from=2021-02-01&' +
//           'sortBy=popularity&' +
//           'apiKey=e4904827608441bf87d7fecdaccc4fbb';

// var req = new Request(url);
// var list = [];

// fetch(req)
//   .then(response => response.json())
//   .then(data => {
//     // console.log(data.articles)
//     for (i = 0; i < data.articles.length; i++) {
//         var title = data.articles[i].title;
//         var author = data.articles[i].author;
//         var source = data.articles[i].source.name;
//         var urltoimage = data.articles[i].urlToImage;
//         var url = data.articles[i].url;
//         var publishedAt = data.articles[i].publishedAt;
//         var description = data.articles[i].description;

//         if(urltoimage != null && author != null && author.length < 91 && 
//             description.charAt(0) != '<' && description.split(" ")[0] != 'Summary') { // news article validation
//             list.push('<div class="news-container">' + 
//             '<a target="_blank" href="' + url + 
//             '"><h1 class="news-title">' + title + '</h1></a>' +
//             '<div class="info-container">' + 
//             '<a target="_blank" href="' + url + '"><img class="news-img" src="' + 
//             urltoimage + '" alt="' + title + '"></a>' +
//             '<p class="desc">' + description + '</p>' +
//             '<a target="_blank" href="' + url + '">' +
//             '<h3 class="author">' + author + '<br>' + source + '<br>' +
//             publishedAt + '</h3></a></div></div>');
//         }
        
//     }
//     // console.log(list);
//     mydiv = document.getElementById("main-news-container");
//     for (i = 0; i < list.length; i++) {
//         mydiv.innerHTML += list[i];
//     }
//   });
// //-----\Fetching-----