// Test autocomplete feature
(function(module) {

  // set up test
  function findAFlick(question) {
    return $.get(
      '//api.themoviedb.org/3/search/movie?api_key=9eae05e667b4d5d9fbb75d27622347fe&query='
      + question
    )
    .then(function(rCall) {
      return rCall.results;
    });
  }

  function showMovie(result) {
    var link = $('<a/>')
    .attr('href', 'https://www.themoviedb.org/movie/' + result.id)
    .text(result.title);
    return $('<div/>').append(link).css('padding', '0.1em 0');
  }

  function movieSearch(queryWeasel) {
    if (queryWeasel.length < 3) {
      // show no results for queries of length < 3
      $('#weaselList').css('background-color', 'white');
      return Bacon.once([]);
    } else {
      console.log('something is happening');
      $('#weaselList').css('background-color', '#d5fbff');
      return Bacon.fromPromise(findAFlick(queryWeasel));
    }
  }

  var text = $('#playground-input')
  // stream of keydown events from text-field
  .asEventStream('keydown')
  // limit the rate of queries
  .debounce(300)
  // get input text value from each event
  .map(function(event) {
    return event.target.value;
  })
  // Ignore duplicate events with same text
  .skipDuplicates();


  // React to text changes by doing a lookup with
  // api function movieSearch, creating a new observable
  // with the results.
  //
  // Make sure to always react to the latest, value even
  // if responses from the server arrives out of order

  var suggestions =
  text.flatMapLatest(movieSearch);

  // Display "Searching..." when waiting for the results

  text.awaiting(suggestions).onValue(function(x) {
    if (x) {
      $('#weaselList').html('Searching...');
    }
  });

  // Render suggestion results to DOM

  suggestions.onValue(function(results) {
    $('#weaselList').html($.map(results, showMovie));
    console.log($.map(results, showMovie));
  });

})(window);
