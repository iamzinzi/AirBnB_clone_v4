$(function () {
  const listItems = $('input');
  const checkedItems = {};
  for (let item of listItems) {
    if (item.is(':checked')) {
      checkedItems[item.data('data_id')] = item.data('data_name');
    } else {
      if (item.data('data_id') in checkedItems) {
        delete checkedItems[item.data('data_id')];
      }
    }
  }
});
