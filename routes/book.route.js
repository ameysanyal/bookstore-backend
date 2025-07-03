const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller.js');
const authenticate = require('../middlewares/auth.middleware.js');

router.get('/', authenticate,bookController.getBooks);
router.get('/search', authenticate,bookController.searchBooks);
router.get('/:id',authenticate, bookController.getBookById);
router.post('/', authenticate, bookController.addBook);
router.put('/:id',authenticate, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);

module.exports = router;
