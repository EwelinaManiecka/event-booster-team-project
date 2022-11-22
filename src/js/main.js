import Pagination from './pagination';
import fetchEvents from './fetchEvents';
import mapItems from './mapItems';
import rednerItems from './renderItems';
import _debounce from 'lodash.debounce';

import './chooseCountry';
import openModal from './modal.js';

let actualPage = 0;
let totalItems = 0;
let itemsPerPage = 0;
let pagination = null;
let itemsOnPage = null;
let currentName = '';
let currentCountry = '';
let currentAuthor = '';

const buttonHolderID = 'gallery-pagination';
const itemHolderID = 'gallery-list';

const loader = document.querySelector('.logo-container');

const formInput = document.querySelector('#search-box');
const formSelect = document.querySelector('#country-list');
const form = document.querySelector('.header__form');
const countryList = document.querySelector('#country-list');
const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('#closeBtn');
const authorBtn = document.querySelector('#authorBtn');

const iconFront = document.querySelector('.icon-front');
let percent = 0;

const loading = setInterval(() => {
  percent += 1;
  iconFront.style = `width: ${percent}%`;
  if (percent >= 100) {
    clearInterval(loading);
    loader.classList.add('isHidden');
    document.querySelector('.logo-wrapper').classList.remove('black');
    loader.classList.add('semi-black');
    loader.innerHTML = `<div class="spinner"><div class="loading loading--full-height"></div></div>`;
  }
}, 15);

const startFetching = isNew => {
  loader.classList.remove('isHidden');
  fetchEvents(currentName, actualPage, currentCountry, itemHolderID, loader)
    .then(({ events, pageInfo }) => {
      itemsOnPage = mapItems(events);
      rednerItems(itemsOnPage, itemHolderID);
      const { number, totalElements, size } = pageInfo;
      actualPage = number;
      totalElements > 5000 ? (totalItems = 5000) : (totalItems = totalElements);
      itemsPerPage = size;
      percent >= 100 ? loader.classList.add('isHidden') : '';
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

startFetching(true);

form.addEventListener('submit', e => e.preventDefault());

formInput.addEventListener(
  'input',
  _debounce(e => {
    loader.classList.toggle('isHidden');
    document.getElementById(buttonHolderID).innerHTML = '';
    currentName = e.target.value;
    actualPage = 0;
    startFetching(true);
  }, 700)
);

countryList.addEventListener('click', e => {
  if (e.target.nodeName === 'LI') {
    const countryCode = e.target.getAttribute('value');
    countryCode === 'ALL'
      ? (currentCountry = '')
      : (currentCountry = countryCode);
    startFetching(true);
  }
});

document.getElementById(itemHolderID).addEventListener('click', e => {
  if (e.target.classList.contains('gallery__item')) {
    let currentItem = itemsOnPage.filter(item => item.id === e.target.id);
    currentItem = currentItem[0];
    backdrop.classList.toggle('isHidden');
    openModal(currentItem);
    currentAuthor = currentItem.name;
  }
});

backdrop.addEventListener('click', e => {
  if (e.target.classList.contains('backdrop')) {
    backdrop.classList.toggle('isHidden');
  }
});

closeBtn.addEventListener('click', e => {
  backdrop.classList.toggle('isHidden');
});

authorBtn.addEventListener('click', e => {
  backdrop.classList.toggle('isHidden');
  currentName = currentAuthor;
  document.getElementById(buttonHolderID).innerHTML = '';
  actualPage = 0;
  startFetching(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  formInput.value = currentName;
});
