const controller = require('./books/controller');

module.exports = (router) => {
  router.get('/getAll', controller.getAllBooks);
  router.get('/getById', controller.getBookById);
  router.post('/create', controller.createBook);
  router.post('/edit', controller.editBook);
  router.post('/delete', controller.deleteBook);
};
