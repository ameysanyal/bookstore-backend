const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const BOOKS_FILE = path.join(__dirname, '../models/books.json');

const getBooksData = async () => JSON.parse(await fs.readFile(BOOKS_FILE, 'utf-8'));
const saveBooksData = async (books) => fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));

const bookController = {
  getBooks:async (req, res, next) => {
  try {
    let books = await getBooksData();
    const { page = 1, limit = 10 } = req.query;
    const start = (page - 1) * limit;
    res.json(books.slice(start, start + +limit));
  } catch (err) {
    next(err);
  }
},

getBookById: async (req, res, next) => {
  try {
    const books = await getBooksData();
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
},

addBook: async (req, res, next) => {
  try {
    const book = { id: uuidv4(), ...req.body, userId: req.user.id };
    const books = await getBooksData();
    books.push(book);
    await saveBooksData(books);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
},

updateBook:async (req, res, next) => {
  try {
    const books = await getBooksData();
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    if (books[index].userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    books[index] = { ...books[index], ...req.body };
    await saveBooksData(books);
    res.json(books[index]);
  } catch (err) {
    next(err);
  }
},

deleteBook:async (req, res, next) => {
  try {
    const books = await getBooksData();
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    if (books[index].userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    const deleted = books.splice(index, 1);
    await saveBooksData(books);
    res.json({ message: 'Deleted', book: deleted[0] });
  } catch (err) {
    next(err);
  }
},
searchBooks:async (req, res, next) => {
  try {
    const { genre } = req.query;
    const books = await getBooksData();
    const filtered = genre ? books.filter(b => b.genre.toLowerCase() === genre.toLowerCase()) : books;
    res.json(filtered);
  } catch (err) {
    next(err);
  }
}
}

module.exports = bookController





