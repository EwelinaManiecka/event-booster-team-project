const rednerItems = (items, id) => {
  markup = items
    .map(({ imageURL, name, place, date }) => {
      return `<li>
                <div>
                  <img src="${imageURL}"></img>
                  <span>${name}</span?>
                  <span>${date}</span?>
                  <span>${place}</span?>
                </div>
              </li>`;
    })
    .join('');

  document.getElementById(id).innerHTML = markup;
};

export default rednerItems;
