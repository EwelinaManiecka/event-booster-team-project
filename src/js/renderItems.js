const rednerItems = (items, id) => {
  const markup = items
    .map(({ imageURL, name, geo, date, id }) => {
      return `<li class="gallery__item" id=${id}>
                <div class="gallery__image-container">
                  <div class="gallery__image">
                    <img src="${imageURL}" ></img>
                  </div>
                  <p class="gallery__item-name">${name}</p>
                  <p class="gallery__item-date">${date}</p>
                  <p class="gallery__item-place">${
                    geo.venues ? geo.venues[0].name : 'No info'
                  }</p>
                </div>
              </li>`;
    })
    .join('');

  document.getElementById(id).innerHTML = markup;
};

export default rednerItems;
