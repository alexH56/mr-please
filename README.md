# Mr Please

Inspired by the likes of [All Things Umphrey's](https://allthings.umphreys.com/) and [Phish.net](https://phish.net/setlists/phish/), this project will serve as a similar utility for my band, Mr. Please. It will store an interactive history of shows and performances, and eventually be part of the greater general website for the group.

The project is currently hosted [here](https://mr-please.herokuapp.com/).

## To-do

* Front-end
    * Create utility for adding new shows, populating sets with existing "song" objects
    * Implement React Router to separate pages and view info for shows, songs, and venues
    * Build the typical "band website" stuff and make thing pretty
    * Add statistics logic and display charts/graphs 

* Back-end
    * Refactor database calls to use schemas rather than models, to accomodate usage of multiple db connections
    * Implement "post," "update," and "delete" server routes to achieve full CRUD functionality
    * Use additional middleware for logging and error-handling
    * Create user profiles with OAuth implementation, allowing users to save shows to their history, and leave comments on shows