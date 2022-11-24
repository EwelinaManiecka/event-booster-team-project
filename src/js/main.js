import Pagination from './pagination';
import fetchEvents from './fetchEvents';
import mapItems from './mapItems';
import rednerItems from './renderItems';
import _debounce from 'lodash.debounce';

import './chooseCountry';
import openModal from './modal.js';

let actualPage = 0,
  totalItems = 0,
  itemsPerPage = 0,
  pagination = null,
  itemsOnPage = null,
  currentName = '',
  currentCountry = '',
  currentAuthor = '',
  percent = 0;

const buttonHolderID = 'gallery-pagination',
  itemHolderID = 'gallery-list';

const gallery = document.querySelector('#gallery-list'),
  formInput = document.querySelector('#search-box'),
  form = document.querySelector('.header__form'),
  countryList = document.querySelector('#country-list'),
  backdrop = document.querySelector('.backdrop'),
  closeBtn = document.querySelector('#closeBtn'),
  authorBtn = document.querySelector('#authorBtn'),
  loader = document.querySelector('.logo-container'),
  iconFront = document.querySelector('.icon-front');

//Lodader
const loading = setInterval(() => {
  percent += 1;
  iconFront.style = `width: ${percent}%`;
  if (percent >= 100) {
    clearInterval(loading);
    loader.classList.add('isHidden');
    document.querySelector('.logo-wrapper').classList.remove('black');
    loader.classList.add('semi-black');
    setTimeout(() => {
      loader.innerHTML = `<div class="spinner"><div class="loading loading--full-height"></div></div>`;
    }, 250);
  }
}, 15);

//Main fetch logic
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

startFetching(true); //First fatching after page load

//Form handlers and listeners
const formUpdate = e => {
  loader.classList.toggle('isHidden');
  document.getElementById(buttonHolderID).innerHTML = '';
  currentName = e.target.value;
  actualPage = 0;
  startFetching(true);
};

const countrySelect = e => {
  if (e.target.nodeName === 'LI') {
    const countryCode = e.target.getAttribute('value');
    countryCode === 'ALL'
      ? (currentCountry = '')
      : (currentCountry = countryCode);
    startFetching(true);
  }
};

form.addEventListener('submit', e => e.preventDefault());
formInput.addEventListener('input', _debounce(formUpdate, 700));
countryList.addEventListener('click', countrySelect);

//Creating modal
const createModalData = e => {
  if (e.target.classList.contains('gallery__item')) {
    let currentItem = itemsOnPage.filter(item => item.id === e.target.id);
    currentItem = currentItem[0];
    backdrop.classList.toggle('isHidden');
    document.body.style.overflow = 'hidden';
    openModal(currentItem);
    currentAuthor = currentItem.name;
    document.addEventListener('keydown', closeModalESC);
  }
};

gallery.addEventListener('click', createModalData);

//Close modal options
const closeModal = () => {
  backdrop.classList.toggle('isHidden');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeModalESC);
};

const closeModalESC = e => {
  e.key === 'Escape' ? closeModal() : '';
};

backdrop.addEventListener('click', e => {
  if (e.target.classList.contains('backdrop')) {
    closeModal();
  }
});

closeBtn.addEventListener('click', e => {
  closeModal();
});

//More from this author

const showMoreThisAuthor = () => {
  backdrop.classList.toggle('isHidden');
  document.body.style.overflow = '';
  currentName = currentAuthor;
  document.getElementById(buttonHolderID).innerHTML = '';
  actualPage = 0;
  startFetching(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  formInput.value = currentName;
};

authorBtn.addEventListener('click', e => {
  showMoreThisAuthor();
});
