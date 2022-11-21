const undefGeo = { venues: [{ name: 'No info' }], isReal: false };
const IMG_WIDTH = 1024;
const IMG_HEIGHT = 683;

const mapItems = items => {
  const mapedItems = items.map(item => {
    let newObject = {};
    item.name ? (newObject.name = item.name) : (newObject.name = '');
    item.images ? (newObject.images = item.images) : (newObject.name = '');
    item.imageURL = item.images[0].url;
    item.id ? (newObject.id = item.id) : (newObject.id = '');
    item.dates.start.localDate
      ? (newObject.date = item.dates.start.localDate)
      : (newObject.date = ' ');
    item.dates.start.localTime
      ? (newObject.time = item.dates.start.localTime)
      : (newObject.time = '');
    item.dates.timezone
      ? (newObject.timeZone = item.dates.timezone)
      : (newObject.timeZone = '');
    item.priceRanges
      ? (newObject.price = item.priceRanges)
      : (newObject.price = '');
    item.url ? (newObject.ticketSite = item.url) : (newObject.ticketSite = '');
    item.info ? (newObject.info = item.info) : (newObject.info = '');
    item._embedded
      ? (newObject.geo = item._embedded)
      : (newObject.geo = undefGeo);

    return newObject;
  });


  const result = mapedItems;

  console.log(result); //TEST OBJECTS

  let findBestImg = result.map(item =>
    item.images
      .filter(image => image.width === IMG_WIDTH && image.height === IMG_HEIGHT)
      .map(image => image.url)
  );

  for (let i = 0; i < result.length; i++) {
    result[i].imageURL = findBestImg[i][0];
  }

  return result;
};

export default mapItems;
