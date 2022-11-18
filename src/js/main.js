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

fetchEvents().then(({ events, pageInfo }) => {
  itemsOnPage = mapItems(events);
  rednerItems(itemsOnPage, itemHolderID);

  actualPage = pageInfo.number;
  totalItems = pageInfo.totalElements;
  itemsPerPage = pageInfo.size;
  pagination = new Pagination(totalItems, itemsPerPage, buttonHolderID);
  pagination.create();
});
