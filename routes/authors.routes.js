import express from "express";
import { authors, books, sales, withdrawals } from "../data/seed.js";
import { getAuthorEarnings, getAuthorBalance } from "../services/calculations.js";

const router = express.Router();

//  GET /authors
router.get("/", (req, res) => {
  try {
    const result = authors.map(author => ({
      id: author.id,
      name: author.name,
      total_earnings: getAuthorEarnings(author.id),
      current_balance: getAuthorBalance(author.id)
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /authors/{id}
router.get("/:id", (req, res) => {
  try {
    const authorId = Number(req.params.id);
    const author = authors.find(a => a.id === authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const authorBooks = books.filter(b => b.author_id === authorId);

    const booksData = authorBooks.map(book => {
      const totalSold = sales
        .filter(s => s.book_id === book.id)
        .reduce((sum, s) => sum + s.quantity, 0);

      return {
        id: book.id,
        title: book.title,
        royalty_per_sale: book.royalty_per_sale,
        total_sold: totalSold,
        total_royalty: totalSold * book.royalty_per_sale
      };
    });

    res.json({
      id: author.id,
      name: author.name,
      email: author.email,
      total_books: booksData.length,
      total_earnings: getAuthorEarnings(authorId),
      current_balance: getAuthorBalance(authorId),
      books: booksData
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /authors/{id}/sales
router.get("/:id/sales", (req, res) => {
  try {
    const authorId = Number(req.params.id);
    const author = authors.find(a => a.id === authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const authorBooks = books.filter(b => b.author_id === authorId);
    const bookMap = Object.fromEntries(authorBooks.map(b => [b.id, b]));

    const authorSales = sales
      .filter(s => bookMap[s.book_id])
      .map(s => ({
        book_title: bookMap[s.book_id].title,
        quantity: s.quantity,
        royalty_earned: s.quantity * bookMap[s.book_id].royalty_per_sale,
        sale_date: s.sale_date
      }))
      .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));

    res.json(authorSales);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /authors/{id}/withdrawals
router.get("/:id/withdrawals", (req, res) => {
  try {
    const authorId = Number(req.params.id);
    const author = authors.find(a => a.id === authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const result = withdrawals
      .filter(w => w.author_id === authorId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;