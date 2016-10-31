# beCollective
The BeCollective OMDb API Coding Challenge.
## Synopsis

This is the coding challenge for a job application to BeCollective, which involves a simple front-end and API wrapper for the OMDb API. The main packages used are:
* bootstrap
* Bower
* TAP (Test Anything Protocol) for the testing framework with Supertest for the API testing
* Mongoose for the models
* Express as the application framework
* Jade (now Pug) as the templating language

If I were to have more time I would:
* Introduce an authentication layer and user roles
* Logging so that the API can be monitored
* Extend the search capabilities to include other fields
* Stronger serverside and clientside validation
* Implement the solution as a single-page application rather than moving between the 3 pages
* Pagination for filmlist and reviews


## Repo structure

The solution uses the standard express generator structure with:

 '|-- root directory',
  '    |-- app.js - contents of express server root',
  '    |-- bower.json - bower config',
  '    |-- config.js - config for application (change mongoDB connection details here)',
  '    |-- package.json - NPM project details and dependencies',
  '    |-- README.md - this',
  '    |-- bin',
  '    |   |-- www - application loader',
  '    |-- models',
  '    |   |-- films.js - films and reviews Mongoose model',
  '    |-- public',
  '    |   |-- javascripts',
  '    |       |-- default.js - front-end and AJAX javascript',
  '    |-- routes',
  '    |   |-- films.js - films API route',
  '    |   |-- index.js - root API route',
  '    |   |-- reviews.js - reviews API route',
  '    |-- tests',
  '    |   |-- films.js - functional tests for /films endpoint',
  '    |   |-- reviews.js - functional tests for /reviews endpoint',
  '    |-- views',
  '        |-- detail.jade - HTML template for film file',
  '        |-- error.jade - HTML template for error (default from express)',
  '        |-- footer.jade - HTML template for footer',
  '        |-- layout.jade - top level layout template - links to bootstrap',
  '        |-- list.jade - HTML template for list of imported films',
  '        |-- search.jade - HTML template for search and import item',
  ''


## Installation

* Install MongoDB - accept defaults - (the API will connect on the default port (27017) and run in a database beCollective but this can be altered in {repo_root}/config.js)
* start MongoDB (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* Clone repo
* Run "npm install" in repo directory
* Run "bower install" in repo directory
* Run "npm start"


## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Am using the Tapes framework (Test Anything Protocol). Tests are in ./tests/. To run:
* run command: node .\tests\films.js to test the films endpoint and
* node .\tests\reviews.js to test the reviews endpoint (you need MONGODB up for this to work)

## Contributors

Kurt Johnson (kujo4pm@gmail)

## License

MIT License