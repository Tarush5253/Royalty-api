import express from "express";
import { authors, withdrawals } from "../data/seed.js";
import { getAuthorBalance } from "../services/calculations.js";

const router = express.Router();

// GET /withdrawals
router.post("/", (req, res) => {
  try {
    const { author_id, amount } = req.body;
    const author = authors.find((a) => a.id === author_id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    if (amount < 500) {
      return res
        .status(400)
        .json({ error: "Minimum withdrawal amount is ₹500" });
    }

    const balance = getAuthorBalance(author_id);
    if (amount > balance) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const withdrawal = {
      id: withdrawals.length + 1,
      author_id,
      amount,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    withdrawals.push(withdrawal);

    res.status(201).json({
      ...withdrawal,
      new_balance: balance - amount,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
