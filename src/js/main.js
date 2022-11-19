import Pagination from './pagination';
import fetchEvents from './fetchEvents';
import mapItems from './mapItems';
import rednerItems from './renderItems';
import _debounce from 'lodash.debounce';

let actualPage = 0;
let totalItems = 0;
let itemsPerPage = 0;
let pagination = null;
let itemsOnPage = null;
let currentName = 'utah';
let currentCountry = null;

const buttonHolderID = 'gallery-pagination';
const itemHolderID = 'gallery-list';

const formInput = document.querySelector('#search-box');
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

form.addEventListener('submit', e => e.preventDefault());
