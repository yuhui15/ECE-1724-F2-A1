## Q1: Before implementation, how do you plan to approach one core part of this assignment?
 
Choose one concrete part of the assignment.
 
Briefly describe your planned approach, a technical concern,
or an uncertainty you expect to work through.

For the database side of things, I plan to use `better-sqlite3` to do the operations corresponding to the four funtions listed below.

| Function / Operation | SQL Statement |
| :--- | :--- |
| **`createPaper`** | `INSERT INTO papers (title, authors, published_in, year) VALUES (?, ?, ?, ?)` |
| **`getAllPapers`** | `SELECT * FROM papers WHERE 1=1 [AND year = ?] [AND published_in LIKE ?] LIMIT ? OFFSET ?` |
| **`getPaperById`** | `SELECT * FROM papers WHERE id = ?` |
| **`updatePaper`** | `UPDATE papers SET title = ?, authors = ?, published_in = ?, year = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?` |
| **`deletePaper`** | `DELETE FROM papers WHERE id = ?` |
 
## Q2: Did you use AI?
 
- If YES:
  - Briefly describe the meaningful ways you used AI.
  - This may include conceptual questions, debugging assistance,
    or help with small parts of the implementation.
  - If AI directly influenced your code, identify the relevant
    file, component, function, or configuration where practical.

- If NO:
  - Write "No AI used."

- YES
  - I use AI to separate the project's overall tasks and understand the project's file architecture. Finally, it clearly identify which specific files and components that I need to implement (such as completing `src/database.js`, `src/routes.js`, and `src/middleware.js`). 
 
## Q3: (Only if you used AI)
 
Choose one specific AI interaction that meaningfully influenced your work.
 
Briefly explain:
 
- What the AI suggested, explained, or helped identify
- What you did with that input
- How you verified, modified, or rejected it

- **What the AI suggested:** AI found that SQLite's default timestamp format didn't match the test suite's ISO 8601 regex requirements.
- **What you did with that input:** I Added several lines in `src/database.js` to adjust the timestamp strings right when querying data.
- **How you verified:** I Ran the tests again and saw that they all passed.