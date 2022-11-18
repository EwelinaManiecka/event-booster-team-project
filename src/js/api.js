const API_KEY = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

const fetchEvent = name => {
  const newQuery =
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` +
    name +
    `&apikey=` +
    API_KEY;

  return fetch(newQuery).then(response => {
    if (!response.ok) {
      throw new response.status();
    }
    return response.json();
  });
};

fetchEvent('phoenix sun vs utah').then(event =>
  console.log(event._embedded.events[1]._embedded.venues[0].location)
);

//event.page

//event._embedded

//event._embedded.images

//event._embedded.events <----------

//event._embedded.events[index].id

//event._embedded.events[index].name

//event._embedded.events[1].dates.timezone

//event._embedded.events[index].dates.start.localDate

//event._embedded.events[index].dates.start.localTime

//event._embedded.events[index].priceRanges

//event._embedded.events[index].url // WHERE TO BUY TICKET

//event._embedded.events[index].info

//event._embedded.events[1]._embedded.venues[0].name //PLACE

//event._embedded.events[1]._embedded.venues[0].city.name //CITY

//event._embedded.events[1]._embedded.venues[0].country.name) // COUNTRY

//event._embedded.events[1]._embedded.venues[0].location // PARAMS FOR MAP

//https://www.google.pl/maps/@{33.445899},{-112.071313},14z
