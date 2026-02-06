# 📘 Royalty Management REST API

**Technical Assignment --- Junior Full Stack Developer**

This project is a backend REST API built for a simplified **author
royalty management system**, where authors can track book sales,
earnings, and request withdrawals.

------------------------------------------------------------------------

## 🚀 Live API URL

    https://your-app-name.onrender.com

Example:

    https://your-app-name.onrender.com/authors

------------------------------------------------------------------------

## 🛠 Tech Stack & Packages

-   Node.js                 # For JavaScript Runtime Enviroment
-   Express.js              # REST API framework
-   In-memory data storage  # arrays
-   CORS                    # to allow requests from any origin
-   Nodemon                 # Auto-restart server during development


```{=html}
<!-- -->
```
    npm install express cors nodemon

------------------------------------------------------------------------

## 📂 Folder Structure

    royalty-api/
    │
    ├── index.js
    ├── data/seed.js
    ├── routes/
    │   ├── authors.routes.js
    │   └── withdrawals.routes.js
    ├── services/calculations.js
    └── README.md

------------------------------------------------------------------------

## 🧠 Core Concepts & Assumptions

-   No database is used; data is stored in memory as allowed by the assignment.
-   Balances are never stored directly — they are calculated dynamically.
-   Clean and simple logic is prioritized over complex architecture.
-   All validations and calculations strictly follow the assessment rules.


## 📌 API Endpoints

### GET /authors

Returns all authors with earnings and balance.

### GET /authors/:id

Returns author details with books and royalties.

### GET /authors/:id/sales

Returns all sales for author books.

### POST /withdrawals

Create withdrawal request.

Request:

    {
      "author_id": 1,
      "amount": 2000
    }

### GET /authors/:id/withdrawals

Returns withdrawal history.

------------------------------------------------------------------------

## 🧠 Business Logic

-   Total earnings = sales × royalty
-   Balance = earnings − withdrawals
-   Minimum withdrawal = ₹500

------------------------------------------------------------------------

## ⚙️ Controllers & Services

-   Controllers handle routing and validation
-   Services handle calculations:
    -   getAuthorEarnings()
    -   getAuthorBalance()

------------------------------------------------------------------------

## ▶️ Run Locally

    npm install
    npm run dev

------------------------------------------------------------------------

## ⏱ Time Spent

-   Approximately 5–6 hours, including:
    -   Logic planning
    -   API development
    -   Testing
    -   Deployment & documentation

## 🙏 Note

Thank you for moving my application forward.\
If there is any issue or mistake, I would really appreciate **one chance
to fix it**.
