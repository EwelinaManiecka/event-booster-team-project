const undefGeo = { venues: [{ name: '' }] };

const mapItems = items => {
  const withGeoData = items
    .filter(item => item._embedded)
    .map(item => ({
      name: item.name,
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
  return result;
};

export default mapItems;

//country: item._embedded.venues[0].country.name,
// city: item._embedded.venues[0].city.name,
// place: item._embedded.venues[0].name,
// map: `https://www.google.pl/maps/@${item._embedded.venues[0].location.latitude},${item._embedded.venues[0].location.longitude},14z`,
