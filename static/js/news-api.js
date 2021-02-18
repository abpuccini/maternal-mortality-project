var url = 'http://newsapi.org/v2/everything?' +
          'q=Maternal%20Mortality&' +
          'from=2021-02-10&' +
          'sortBy=popularity&' +
          'apiKey=e4904827608441bf87d7fecdaccc4fbb';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })