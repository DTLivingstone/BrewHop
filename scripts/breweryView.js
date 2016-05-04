var filterArray = [];

$('input[checked]').each(function() {
  var filterString = $(this).attr('name') + '=' + $(this).val();
  filterArray.push(filterString);
});

$('.results').html(filterArray.join(' AND '));
console.log(filterArray);

//TODO: create event listener on the checked boxes.
