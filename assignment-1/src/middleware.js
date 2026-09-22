// This file contains a reusable validation helper and Express middleware.
//
// You DO NOT need to modify requestLogger or errorHandler.
// Your task is to implement:
//   - validatePaper
//   - validateId
//   - validateQueryParams

// ------------------------------------------------------------
// Request logger middleware
// Logs each incoming request (for debugging / visibility)
// ------------------------------------------------------------
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

// ------------------------------------------------------------
// Error handler middleware (unexpected failures only)
//
// This middleware is a safety net for unexpected server errors
// (e.g. database errors or runtime exceptions).
//
// You do NOT need to trigger or handle 500 errors explicitly
// in this assignment. If something unexpected goes wrong,
// this middleware ensures the server returns a JSON error
// instead of crashing.
// ------------------------------------------------------------
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // If a response has already been sent, let Express handle it
  if (res.headersSent) return next(err);

  return res.status(500).json({ error: "Internal Server Error" });
};

// ------------------------------------------------------------
// validatePaper
//
// Reusable helper that validates the request body for POST / PUT requests.
// It returns messages; the route decides the HTTP response.
//
// Return value:
// - An array of error messages
// - Empty array [] means validation passed
//
// Required fields:
// - title: non-empty string
// - authors: non-empty string
// - published_in: non-empty string
// - year: integer greater than 1900
//
// Error message strings MUST match the handout exactly.
// ------------------------------------------------------------
const validatePaper = (paper) => {
  const errors = [];

  // TODO: implement validation logic
if (!paper) {
    return [
      "Title is required",
      "Authors are required",
      "Published venue is required",
      "Published year is required"
    ];
  }

  if (paper.title === undefined || paper.title === null || typeof paper.title !== "string" || paper.title.trim() === "") {
    errors.push("Title is required");
  }
  if (paper.authors === undefined || paper.authors === null || typeof paper.authors !== "string" || paper.authors.trim() === "") {
    errors.push("Authors are required");
  }
  if (paper.published_in === undefined || paper.published_in === null || typeof paper.published_in !== "string" || paper.published_in.trim() === "") {
    errors.push("Published venue is required");
  }
  if (paper.year === undefined || paper.year === null || (typeof paper.year === "string" && paper.year.trim() === "")) {
    errors.push("Published year is required");
  } else {
    const trimmedYear = typeof paper.year === "string" ? paper.year.trim() : paper.year;
    if (typeof paper.year === "string" && !/^-?\d+$/.test(trimmedYear)) {
      errors.push("Valid year after 1900 is required");
    } else {
      const numYear = Number(trimmedYear);
      if (!Number.isInteger(numYear) || numYear <= 1900) {
        errors.push("Valid year after 1900 is required");
      }
    }
  }
  // Required error messages:
  // - "Title is required"
  // - "Authors are required"
  // - "Published venue is required"
  // - "Published year is required"
  // - "Valid year after 1900 is required"

  return errors;
};

// ------------------------------------------------------------
// validateId
//
// Middleware to validate :id route parameter.
//
// If the ID is invalid:
// - Respond immediately with status 400
// - Do NOT call next()
//
// Error response format:
// {
//   "error": "Validation Error",
//   "message": "Invalid ID format"
// }
//
// If valid, store the numeric ID in req.params.id and call next().
// ------------------------------------------------------------
const validateId = (req, res, next) => {
  // TODO: implement ID validation
  // Hint:
  // - ID should be a positive integer
  // - Convert req.params.id to a number before checking
  const idVal = req.params.id;
  const trimmedId = typeof idVal === "string" ? idVal.trim() : idVal;

  if (typeof idVal === "string" && !/^-?\d+$/.test(trimmedId)) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid ID format",
    });
  }

  const numId = Number(trimmedId);
  if (!Number.isInteger(numId) || numId <= 0) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid ID format",
    });
  }

  req.params.id = numId;
  next();
};

// ------------------------------------------------------------
// validateQueryParams
//
// Middleware to validate query parameters for GET /api/papers.
//
// Supported query parameters:
// - year   (integer > 1900)
// - limit  (integer between 1 and 100)
// - offset (integer >= 0)
//
// If any query parameter is invalid:
// - Respond with status 400
// - Do NOT call next()
//
// Error response format:
// {
//   "error": "Validation Error",
//   "message": "Invalid query parameter format"
// }
//
// If all parameters are valid, call next().
// ------------------------------------------------------------
const validateQueryParams = (req, res, next) => {
  // TODO: implement query parameter validation
  const { year, limit, offset } = req.query;

  const isValidInt = (val) => {
    if (val === undefined) return true;
    const trimmed = typeof val === "string" ? val.trim() : val;
    if (typeof val === "string" && !/^-?\d+$/.test(trimmed)) return false;
    return Number.isInteger(Number(trimmed));
  };

  if (year !== undefined) {
    const trimmedYear = typeof year === "string" ? year.trim() : year;
    if (!isValidInt(year) || Number(trimmedYear) <= 1900) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Invalid query parameter format",
      });
    }
  }

  if (limit !== undefined) {
    const trimmedLimit = typeof limit === "string" ? limit.trim() : limit;
    const numLimit = Number(trimmedLimit);
    if (!isValidInt(limit) || numLimit < 1 || numLimit > 100) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Invalid query parameter format",
      });
    }
  }

  if (offset !== undefined) {
    const trimmedOffset = typeof offset === "string" ? offset.trim() : offset;
    const numOffset = Number(trimmedOffset);
    if (!isValidInt(offset) || numOffset < 0) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Invalid query parameter format",
      });
    }
  }

  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  validatePaper,
  validateId,
  validateQueryParams,
};
