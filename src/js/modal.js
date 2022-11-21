const openModal = item => {
  document.getElementById('modal-image').src = item.imageURL;
  document.getElementById('modal-who').innerHTML = item.name;
  document.getElementById('modal-when').innerHTML = item.date + item.time;
  item.info
    ? (document.getElementById('modal-info').innerHTML = item.info)
    : (document.getElementById('modal-info').innerHTML = '');

  if (!item.geo.isReal && item.geo.venues) {
    let whereInfo = ' ';

    item.geo.venues[0].city.name
      ? (whereInfo += item.geo.venues[0].city.name)
      : '';
    item.geo.venues[0].country.name
      ? (whereInfo += item.geo.venues[0].country.name)
      : '';
    item.geo.venues[0].name ? (whereInfo += item.geo.venues[0].name) : '';

    item.geo.venues[0].country.name
      ? (whereInfo += item.geo.venues[0].country.name)
      : '';

    document.getElementById('modal-where').innerHTML = whereInfo;
  } else {
    document.getElementById('modal-where').innerHTML = 'No info';
  }

  if (item.price) {
    const markup = item.price
      .map(element => {
        let priceRanges = '';
        if (element.min === element.max) {
          priceRanges = element.min;
        } else {
          priceRanges = `${element.min}-${element.max}`;
        }
        return `
        <p>${element.type} ${priceRanges} ${element.currency}</p>
        <a href=${item.ticketSite}>
          <button>BUY TICKETS</button>
        </a>
        `;
      })
      .join('');

    document.getElementById('modal-price').innerHTML = markup;
  } else {
    document.getElementById(
      'modal-price'
    ).innerHTML = `<a href=${item.ticketSite}>
          <button>BUY TICKETS</button>
        </a>`;
  }
};

export default openModal;
