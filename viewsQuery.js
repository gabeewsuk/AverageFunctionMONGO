async function viewsQuery(searchViews) {
  nicheList = [];
  //loop to re-arrange array
  for (var u = 0; u < searchViews.length; u++) {
    handle = searchViews[u];
    nicheList.push(handle);
  }
  return nicheList;
}
module.exports = viewsQuery;
