$(function () {
  const checkedItems = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      checkedItems[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedItems[$(this).data('id')];
    }
    let fillerText = Object.values(checkedItems).join(', ');
    $('div.amenities h4').text(fillerText);
  });
});

$(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (status === 'success') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});

$(function () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'post',
    data: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    success: function (data) {
      for (let place of data) {
        let articleText = '<article>' +
          '<div class="title">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">' +
          '$' + place.price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
          '<div class="max_guest">' +
          '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          place.max_guest + ' Guests' +
          '</div>' +
          '<div class="number_rooms">' +
          '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          place.number_rooms + ' Bedrooms' +
          '</div>' +
          '<div class="number_bathrooms">' +
          '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
          '<br />' +
          place.number_bathrooms + ' Bathroom' +
          '</div>' +
          '</div>' +
          '</article>';
        $('section.places').append(articleText);
      }
    }
  });
});

$(function () {
  const amenities = { 'amenities': [] };
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenities.amenities.push($(this).data('id'));
    } else {
      let index = amenities.amenities.indexOf($(this).data('id'));
      amenities.amenities.splice(index, 1);
    }
  });
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'post',
      data: JSON.stringify(amenities),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      success: function (data) {
        $('article').remove();
        for (let place of data) {
          let articleText = '<article>' +
              '<div class="title">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' +
              '$' + place.price_by_night + '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
              '<br />' +
              place.max_guest + ' Guests' +
              '</div>' +
              '<div class="number_rooms">' +
                '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
                '<br />' +
                place.number_rooms + ' Bedrooms' +
                '</div>' +
                '<div class="number_bathrooms">' +
                '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
                '<br />' +
                place.number_bathrooms + ' Bathroom' +
                '</div>' +
                '</div>' +
                '</article>';
          $('section.places').append(articleText);
        }
      }
    });
  });
});
