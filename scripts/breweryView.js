var filterArray = [];

$('input[checked]').each(function() {
  var filterString = $(this).attr('name') + '=' + $(this).val();
  filterArray.push(filterString);
});

var sqlString = $('.results').html(filterArray.join(' AND '));
console.log(filterArray);
console.log(sqlString);
//TODO: create event listener on the checked boxes.
