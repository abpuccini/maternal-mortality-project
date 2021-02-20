var url = 'http://newsapi.org/v2/everything?' +
          'q=Maternal%20Mortality&' +
          'from=2021-02-10&' +
          'sortBy=popularity&' +
          'apiKey=e4904827608441bf87d7fecdaccc4fbb';

var req = new Request(url);
var list = [];

fetch(req)
  .then(response => response.json())
  .then(data => {
    console.log(data.articles)
    for (i = 0; i < data.articles.length; i++) {
        // var title = data.articles[i].title;
        // var author = data.articles[i].author;
        // var urltoimage = data.articles[i].urlToImage;
        // var url = data.articles[i].url;
        // var publishAt = data.articles[i].publishAt;
        // var description = data.articles[i].description;
        list.push('<div class="news-container">' + 
            '<a target="_blank" href="' + data.articles[i].url + 
            '"><h1 class="article-title">' + data.articles[i].title + '</h1></a>' +
            '<div class="info-container">' + 
            '<a target="_blank" href="' + data.articles[i].url + '"><img class="news-img" src="' + 
            data.articles[i].urlToImage + '" alt="' + data.articles[i].title + '"></a>' +
            '<p class="desc">' + data.articles[i].description + '</p>' +
            '<a target="_blank" href="' + data.articles[i].url + '">' +
            '<h3 class="author">' + data.articles[i].author + ' ' + data.articles[i].source.name + ' ' +
            data.articles[i].publishedAt + '</h3></a></div></div>');
    }
    console.log(list);
    mydiv = document.getElementById("main-container");
    for (i = 0; i < list.length; i++) {
        mydiv.innerHTML += list[i];
    }
  });

