const rednerItems = (items, id) => {
  const markup = items
    .map(({ imageURL, name, geo, date, id }) => {
      return `<li class="gallery__item">
                <div class="gallery__image-container">
                  <img id=${id} src="${imageURL}" class="gallery__image"></img>
                  <p class="gallery__item-name">${name}</p>
                  <p class="gallery__item-date">${date}</p>
                  <p class="gallery__item-place">${geo.venues[0].name}</p>
                </div>
              </li>`;
    })
    .join('');

  document.getElementById(id).innerHTML = markup;
};

export default rednerItems;
