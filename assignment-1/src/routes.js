// This file defines API endpoints under /api.
//
// Complete the TODOs by calling functions from database.js
// and returning the required status codes and JSON responses.

const express = require("express");
const router = express.Router();

const db = require("./database");
const {
  validatePaper,
  validateId,
  validateQueryParams,
} = require("./middleware");

// ------------------------------------------------------------
// GET /api/papers
//
// Supports optional query parameters:
// - year
// - published_in
// - limit
// - offset
//
// Query format validation is handled by validateQueryParams.
// ------------------------------------------------------------
router.get("/papers", validateQueryParams, (req, res) => {
  const filters = {
    year: req.query.year || null,
    published_in: req.query.published_in || null,
    limit: req.query.limit || 10,
    offset: req.query.offset || 0,
  };

  // TODO:
  // - Call the database function to retrieve papers
  // - Return the result as JSON
  // - Status code: 200
  filters.year = filters.year ? Number(filters.year) : undefined;
  filters.published_in = filters.published_in || undefined;
  filters.limit = Number(filters.limit);
  filters.offset = Number(filters.offset);

  const papers = db.getAllPapers(filters);
  res.status(200).json(papers);
});

// ------------------------------------------------------------
// GET /api/papers/:id
//
// validateId ensures :id is a valid positive integer.
// ------------------------------------------------------------
router.get("/papers/:id", validateId, (req, res) => {
  // TODO:
  // - Retrieve the paper by ID
  // - If not found, return:
  //     Status: 404
  //     { "error": "Paper not found" }
  // - If found, return the paper as JSON
  // - Status code: 200
  const paper = db.getPaperById(Number(req.params.id));
  if (!paper) {
    return res.status(404).json({ error: "Paper not found" });
  }
  res.status(200).json(paper);
});

// ------------------------------------------------------------
// POST /api/papers
//
// Validates request body using validatePaper.
// ------------------------------------------------------------
router.post("/papers", (req, res) => {
  const errors = validatePaper(req.body);
  if (errors.length > 0) {
    // TODO:
    // - Return status 400 with validation error information
    return res.status(400).json({
      error: "Validation Error",
      messages: errors,
    });
  }

  // TODO:
  // - Create a new paper using the database
  // - Return the created paper as JSON
  // - Status code: 201
  const newPaper = db.createPaper(req.body);
  res.status(201).json(newPaper);
});

// ------------------------------------------------------------
// PUT /api/papers/:id
//
// IMPORTANT:
// validateId runs BEFORE validatePaper.
// This ensures invalid ID format returns 400
// even if the request body is invalid.
// ------------------------------------------------------------
router.put("/papers/:id", validateId, (req, res) => {
  const errors = validatePaper(req.body);
  if (errors.length > 0) {
    // TODO:
    // - Return status 400 with validation error information
    return res.status(400).json({
      error: "Validation Error",
      messages: errors,
    });
  }

  // TODO:
  // - Update the paper with the given ID
  // - If the paper does not exist, return:
  //     Status: 404
  //     { "error": "Paper not found" }
  // - If updated, return the updated paper as JSON
  // - Status code: 200
  const paper = db.getPaperById(Number(req.params.id));
  if (!paper) {
    return res.status(404).json({ error: "Paper not found" });
  }

  const updatedPaper = db.updatePaper(Number(req.params.id), req.body);
  res.status(200).json(updatedPaper);
});

// ------------------------------------------------------------
// DELETE /api/papers/:id
//
// validateId ensures :id is valid.
// ------------------------------------------------------------
router.delete("/papers/:id", validateId, (req, res) => {
  // TODO:
  // - Check whether the paper exists
  // - If not found, return:
  //     Status: 404
  //     { "error": "Paper not found" }
  // - If found, delete it
  // - Return status 204 with an empty body
  const paper = db.getPaperById(Number(req.params.id));
  if (!paper) {
    return res.status(404).json({ error: "Paper not found" });
  }

  db.deletePaper(Number(req.params.id));
  res.status(204).send();
});

module.exports = router;
