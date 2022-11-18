import axios from 'axios';

const API_KEY = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

const fetchEvents = async (name, page, country, onError) => {
  try {
    const responde = await axios(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` +
        name +
        `&page=` +
        page +
        `&apikey=` +
        API_KEY
    );
    return {
      events: responde.data._embedded.events,
      pageInfo: responde.data.page,
    };
  } catch (error) {
    document.getElementById(onError).innerHTML =
      'Sorry, didn’t find anything. Try again.';
    throw (error = 'Sorry, didn’t find anything. Try again.');
  }
};

export default fetchEvents;
