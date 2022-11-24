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
    item.info
      ? (newObject.info = item.info)
      : (newObject.info = 'There is no info for this event.');
    item._embedded
      ? (newObject.geo = item._embedded)
      : (newObject.geo = {
          venues: [
            { name: 'No info', city: { name: '' }, country: { name: '' } },
          ],
        });

    return newObject;
  });

  let theBestImg = mapedItems.map(item =>
    item.images
      .filter(image => image.width === IMG_WIDTH && image.height === IMG_HEIGHT)
      .map(image => image.url)
  );

  const result = mapedItems.map((item, index) => {
    item.imageURL = theBestImg[index][0];
    return item;
  });

  return result;
};

export default mapItems;
