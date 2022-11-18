const mapItems = items => {
  const result = items.map(item => ({
    name: item.name,
    imageURL: item.images[1].url,
    id: item.id,
    date: item.dates.start.localDate,
    time: item.dates.start.localTime,
    timeZone: item.dates.timezone,
    price: item.priceRanges,
    ticketSite: item.url,
    info: item.info,
    country: item._embedded.venues[0].country.name,
    city: item._embedded.venues[0].city.name,
    place: item._embedded.venues[0].name,
    map: `https://www.google.pl/maps/@${item._embedded.venues[0].location.latitude},${item._embedded.venues[0].location.longitude},14z`,
  }));
  console.log(result);
  return result;
};

export default mapItems;
