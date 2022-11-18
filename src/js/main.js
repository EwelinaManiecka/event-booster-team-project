import Pagination from './pagination';
import fetchEvents from './fetchEvents';
import mapItems from './mapItems';
import rednerItems from './renderItems';

let actualPage = 1;
let totalItems = 0;
let itemsPerPage = 0;
let buttonHolderID = 'gallery-pagination';
let itemHolderID = 'gallery-list';
let pagination = null;
let itemsOnPage = null;
let currentName = 'utah';
let currentCountry = null;

const startFetching = isNew => {
  fetchEvents(currentName, actualPage, currentCountry)
    .then(({ events, pageInfo }) => {
      itemsOnPage = mapItems(events);
      rednerItems(itemsOnPage, itemHolderID);
      const { number, totalElements, size } = pageInfo;

      actualPage = number;
      totalItems = totalElements;
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
          actualPage = eventData.page;
          console.log(actualPage);
          startFetching(false);
        });
      }
    });
};

startFetching(true);
