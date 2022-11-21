import Pagination from './pagination';
import fetchEvents from './fetchEvents';
import mapItems from './mapItems';
import rednerItems from './renderItems';
import _debounce from 'lodash.debounce';
import './chooseCountry';

let actualPage = 0;
let totalItems = 0;
let itemsPerPage = 0;
let pagination = null;
let itemsOnPage = null;
let currentName = '';
let currentCountry = '';

const buttonHolderID = 'gallery-pagination';
const itemHolderID = 'gallery-list';

const formInput = document.querySelector('#search-box');
const formSelect = document.querySelector('#country-list');
const form = document.querySelector('.header__form');

const startFetching = isNew => {
  fetchEvents(currentName, actualPage, currentCountry, itemHolderID)
    .then(({ events, pageInfo }) => {
      itemsOnPage = mapItems(events);
      rednerItems(itemsOnPage, itemHolderID);
      const { number, totalElements, size } = pageInfo;
      actualPage = number;
      totalElements > 5000 ? (totalItems = 5000) : (totalItems = totalElements);
      itemsPerPage = size;
    })
    .then(() => {
      if (isNew) {
        pagination = new Pagination(totalItems, itemsPerPage, buttonHolderID);
        pagination.create();
        pagination.handler.on('beforeMove', function (eventData) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.handler.on('afterMove', function (eventData) {
          actualPage = eventData.page - 1;
          startFetching(false);
        });
      }
    });
};

document.getElementById(
  itemHolderID
).innerHTML = `<div class="spinner"><div class="loading loading--full-height"></div></div>`;
startFetching(true);

form.addEventListener('submit', e => e.preventDefault());

formInput.addEventListener(
  'input',
  _debounce(e => {
    document.getElementById(
      itemHolderID
    ).innerHTML = `<div class="spinner" ><div class="loading loading--full-height"></div></div>`;
    document.getElementById(buttonHolderID).innerHTML = '';
    currentName = e.target.value;
    actualPage = 0;
    startFetching(true);
  }, 700)
);

formSelect.addEventListener('change', e => {
  document.getElementById(
    itemHolderID
  ).innerHTML = `<div class="spinner" ><div class="loading loading--full-height"></div></div>`;
  document.getElementById(buttonHolderID).innerHTML = '';
  currentCountry = e.target.value;
  actualPage = 0;
  startFetching(true);
});

///TO MODAL

document.getElementById(itemHolderID).addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    let currentItem = itemsOnPage.filter(item => item.id === e.target.id);
    currentItem = currentItem[0];
    console.log(currentItem);
  }
});

//---------------------------------
//country: geo._embedded.venues[0].country.name,
// city: geo._embedded.venues[0].city.name,
// place: geo._embedded.venues[0].name,
// map: `https://www.google.pl/maps/@${item._embedded.venues[0].location.latitude},${item._embedded.venues[0].location.longitude},14z`,
