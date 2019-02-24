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
