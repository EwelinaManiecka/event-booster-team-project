const rednerItems = (items, id) => {
  const markup = items
    .map(({ imageURL, name, geo, date, id }) => {
      return `<li>
                <div>
                  <img id=${id} src="${imageURL}" width="260" height="400"></img>
                  <p>${name}</p>
                  <p>${date}</p>
                  <p>${geo.venues[0].name}</p>
                </div>
              </li>`;
    })
    .join('');

  document.getElementById(id).innerHTML = markup;
};

export default rednerItems;
