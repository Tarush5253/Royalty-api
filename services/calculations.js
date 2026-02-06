import { books, sales, withdrawals } from "../data/seed.js";

export function getBookSalesTotal(bookId) {
  return sales
    .filter(s => s.book_id === bookId)
    .reduce((sum, s) => sum + s.quantity, 0);
}

export function getBookRoyalty(book) {
  const totalSold = getBookSalesTotal(book.id);
  return totalSold * book.royalty_per_sale;
}

export function getAuthorEarnings(authorId) {
  return books
    .filter(b => b.author_id === authorId)
    .reduce((sum, b) => sum + getBookRoyalty(b), 0);
}

export function getAuthorWithdrawn(authorId) {
  return withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);
}

export function getAuthorBalance(authorId) {
  return getAuthorEarnings(authorId) - getAuthorWithdrawn(authorId);
}