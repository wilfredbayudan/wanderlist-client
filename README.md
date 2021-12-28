# Wanderlist App

Wanderlist is a web-based app that helps travelers and aspiring travelers share ideas on destinations they should visit.

For a live demo, visit [https://wanderlist.jaybayudan.com](https://wanderlist.jaybayudan.com)

![Wanderlist Demo](preview.gif)

## Technologies
* JavaScript / React
* Ruby / Sinatra
* SQLite 

## APIs
* [MapBox](https://www.mapbox.com/)
* [PositionStack](https://positionstack.com/)
* [Wanderlist API](https://github.com/wilfredbayudan/wanderlist-server)

## Features
- [x] **C**reate / **R**ead / **U**pdate / **D**elete bucketlists
- [x] Add destinations to a bucketlists
- [x] Like/Dislike bucketlists
- [x] Like/Dislike destinations
- [x] Comment on a bucketlist
- [ ] Comment on a destination
- [ ] Rate a bucketlist
- [ ] Rate a destination
- [x] Interactive map integration with markers and popups

## Installation
**IMPORTANT!** Clone and install the [backend repository](https://github.com/wilfredbayudan/wanderlist-server) for this project before proceeding.
1. Clone this repository.
2. Sign-up and create free API keys for [PositionStack](https://positionstack.com/) and [MapBox](https://www.mapbox.com/).
3. Create a file called `.env.development` in the root directory (for development purposes) or use the following example to set your production environment variables:

```
// .env.development
REACT_APP_WANDERLIST_API=YOUR WANDERLIST API URL HERE (ie. http://localhost:9292)
REACT_APP_WANDERLIST_URL=YOUR REACT APP URL HERE (ie. http://localhost:3000)
REACT_APP_POSITIONSTACK_KEY=YOUR POSITIONSTACK API KEY HERE
REACT_APP_MAPBOX_ACCESS_TOKEN=YOUR ACCESS TOKEN HERE
```
4. Run `npm install` in the Terminal to install dependencies.
5. Ensure the Sinatra server is running.
6. Run `npm start` in the Terminal to start the Wanderlist App. By default, you will be able to view the app at [http://localhost:3000](http://localhost:3000). 

Have fun!

## Usage

### Routes
* `/` - **Homepage**

The homepage renders a collection of markers on a map. Each marker represents a destination that has been added to a bucketlist. Clicking on a marker will reveal a popup with additional details on the destination, as well as the ability to 'like' it.

* `/bucketlists` - **Bucketlists**

The Bucketlists page retrieves a list of all created bucketlists. When a user hovers over a bucketlist, markers are rendered on the map to preview the destinations that are included in that bucketlist. Clicking on a bucketlist will navigate the user to the details page for that specific bucketlist. ('/bucketlists/:id')

* `/bucketlists/:id` - **Bucketlist Details**
* `/bucketlists/new` - **New Bucketlist**
* `/destinations` - **Destinations**

## Contributing TEST

Contributing Bug reports and pull requests are welcome on GitHub at https://github.com/wilfredbayudan/wanderlist-client. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the code of conduct.

## License

This project is available as open source under the terms of the MIT License.

## Code of Conduct

Everyone interacting in the joke-frontend project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the code of conduct.