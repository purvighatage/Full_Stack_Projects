# AI Notes

## What was AI-assisted
- The initial project structure, Express app setup, route definitions, validation middleware, and test scaffolding were generated with AI assistance.
- The first pass of the service layer and Swagger configuration was also produced with AI support to speed up implementation.

## What was manually modified
- The validation rules were tightened manually to enforce realistic business rules such as positive amounts, at most two decimal places, minimum/maximum field lengths, and valid ISO dates.
- Error handling was refined to return consistent JSON responses for invalid JSON, unknown routes, and validation failures.
- The storage layer was adjusted manually to serialize file operations and reduce the chance of race conditions during rapid requests.
- The service logic for totals and category summaries was updated manually to avoid float precision issues and to provide deterministic ordering.

## What was tested manually
- The API was exercised locally with curl and browser-based Swagger requests.
- Empty datasets, category filtering, deletion of existing and missing resources, and decimal amount handling were tested manually after the initial implementation.
- The server was started locally and checked through the `/health` endpoint and the main expense routes.

## AI suggestions that were rejected
- A relational database was not used because the assignment explicitly required local JSON storage.
- A simple float-based amount model was rejected in favor of rounding to two decimal places and summarizing through a cents-based approach to avoid floating-point precision bugs.
- A generic auto-increment ID strategy was not adopted because UUIDs are more suitable for a local JSON-backed API and are already part of the assignment requirements.
