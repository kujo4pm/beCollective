# beCollective
The BeCollective OMDb API Coding Challenge.
## Synopsis

This is the coding challenge for a job application to BeCollective, which involves a simple front-end and API wrapper for the OMDb API. The main packages used are:
* bootstrap
* Bower
* Gulp loader
* TAP for testing
* Mongoose for the models
* Express as the application framework

If I were to have more time I would:
* Introduce an authentication layer and user roles
* Logging so that the API can be monitored
* Extend the search capabilities to include other fields
* Stronger serverside and clientside validation
* Implement the solution as a single-page application rather than moving between the 3 pages
* Pagination for filmlist and reviews


## Code Example

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.


## Installation

* Ensure Mongo exists - the API will connect on the default port (27017) and run in a database beCollective
* Run 


## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Am using the Tapes framework (Test Anything Protocol). Tests are in ./tests/. To run:
* Install npm package tapes for global (-g)
* run command: tapes tests/**/*.js

## Contributors

Kurt Johnson (kujo4pm@gmail)

## License

MIT License