import Pagination from './pagination';

actualPage = 1;
pagination = null;
totalItems = 500;
itemsPerPage = 20;
buttonHolderID = 'gallery-pagination';
itemHolderID = null;

pagination = new Pagination(totalItems, itemsPerPage, buttonHolderID);

pagination.create();
