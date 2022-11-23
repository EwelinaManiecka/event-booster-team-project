const openModal = item => {
  document.getElementById('modal-image').src = item.imageURL;
  document.getElementById('modal-image-min').src = item.imageURL;
  document.getElementById('modal-who').innerHTML = item.name;
  document.getElementById('modal-when').innerHTML =
    item.date + '<br>' + item.time.slice(0, -3) + ` (${item.timeZone})`;

  item.info.length > 350 ? (item.info = item.info.slice(0, 349) + `...`) : '';

  document.getElementById('modal-info').innerHTML = item.info;

  if (item.geo && item.geo.venues) {
    let whereInfo = ' ';

    item.geo.venues[0].city.name
      ? (whereInfo += item.geo.venues[0].city.name)
      : '';
    item.geo.venues[0].country.name
      ? (whereInfo += ', ' + item.geo.venues[0].country.name)
      : '';
    item.geo.venues[0].name
      ? (whereInfo += '<br>' + item.geo.venues[0].name)
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
        <p class="modal__price-range">${element.type} ${priceRanges} ${element.currency}</p>
        <a href=${item.ticketSite}>
          <button class="modal__buy-btn">BUY TICKETS</button>
        </a>
        `;
      })
      .join('');

    document.getElementById('modal-price').innerHTML = markup;
  } else {
    document.getElementById('modal-price').innerHTML = `<p>Not provided</p>
                  <a href=${item.ticketSite}>
                    <button class="modal__buy-btn">BUY TICKETS</button>
                  </a>`;
  }
};

export default openModal;
