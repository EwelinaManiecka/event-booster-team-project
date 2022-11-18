const rednerItems = (items, id) => {
  const markup = items
    .map(({ imageURL, name, geo, date }) => {
      return `<li>
                <div>
                  <img src="${imageURL}" width="260" height="400"></img>
                  <span>${name}</span?>
                  <span>${date}</span?>
                  <span>${geo.venues[0].name}</span?>
                </div>
              </li>`;
    })
    .join('');

  document.getElementById(id).innerHTML = markup;
};

export default rednerItems;
