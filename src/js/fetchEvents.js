import axios from 'axios';

const API_KEY = `7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;

const fetchEvents = async (name, page, country) => {
  try {
    const responde = await axios(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` +
        name +
        `&apikey=` +
        API_KEY
    );
    return ({
      events: responde.data._embedded.events,
      pageInfo: responde.data.page,
    })
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchEvents;
