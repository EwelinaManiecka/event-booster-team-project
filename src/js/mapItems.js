const undefGeo = { venues: [{ name: '' }], isReal: false };
const IMG_WIDTH = 1024;
const IMG_HEIGHT = 576;

const mapItems = items => {
  const withGeoData = items
    .filter(item => item._embedded)
    .map(item => ({
      name: item.name,
      images: item.images,
      imageURL: item.images[1].url,
      id: item.id,
      date: item.dates.start.localDate,
      time: item.dates.start.localTime,
      timeZone: item.dates.timezone,
      price: item.priceRanges,
      ticketSite: item.url,
      info: item.info,
      geo: item._embedded,
    }));

  const whitOutGeoData = items
    .filter(item => !item._embedded)
    .map(item => ({
      name: item.name,
      images: item.images,
      imageURL: item.images[1].url,
      id: item.id,
      date: item.dates.start.localDate,
      time: item.dates.start.localTime,
      timeZone: item.dates.timezone,
      price: item.priceRanges,
      ticketSite: item.url,
      info: item.info,
      geo: undefGeo,
    }));

  const result = withGeoData.concat(whitOutGeoData);

  console.log(result);

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