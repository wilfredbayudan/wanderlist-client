# Wanderlist App

Wanderlist is a web-based app that encourages travelers to share ideas on destinations they should add to their next trip. Users may view bucketlists, interact with them through likes and comments, or create and share their own.

Live Demo at https://wanderlist.jaybayudan.com

![Wanderlist Demo](preview.gif)

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
### Prerequisites
Before you continue, ensure you have met the following requirements:
* You have installed the latest version of [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
* You have signed-up for free API keys from [PositionStack](https://positionstack.com/) and [MapBox](https://www.mapbox.com/).
* You have cloned and installed the [Wanderlist-Server](https://github.com/wilfredbayudan/wanderlist-server) repository.
---
1. Clone this repository.
2. Create a file called `.env.development` in the root directory (for local development purposes) or use the following example to set your production environment variables:

```
// .env.development
REACT_APP_WANDERLIST_API=[YOUR WANDERLIST API URL HERE] (ie. http://localhost:9292)
REACT_APP_WANDERLIST_URL=[YOUR REACT APP URL HERE] (ie. http://localhost:3000)
REACT_APP_POSITIONSTACK_KEY=[YOUR POSITIONSTACK API KEY HERE]
REACT_APP_MAPBOX_ACCESS_TOKEN=[YOUR MAPBOX ACCESS TOKEN HERE]
```
3. Run `npm install` in the Terminal to install dependencies.
4. Ensure the Sinatra backend server is running.
5. Run `npm start` in the Terminal to start the Wanderlist App. By default, you will be able to view the app at [http://localhost:3000](http://localhost:3000). 

Have fun!

## Usage

### Routes
* `/` - **Homepage**

The homepage renders a collection of markers on a map generated by MapBox. Each marker represents a destination that has been added to a bucketlist. Clicking on a marker will reveal a popup with additional details for the destination, as well as the ability to 'like' it.

* `/bucketlists` - **Bucketlists**

The Bucketlists page retrieves a list of all created bucketlists. The user may search and sort through them using the Search Bar on the top of the list. When a user hovers over a bucketlist, markers are rendered on the map to preview the destinations that are included in that bucketlist. Clicking on a bucketlist will navigate the user to the details page for that specific bucketlist. ('/bucketlists/:id')

* `/bucketlists/:id` - **Bucketlist Details**

The Bucketlists Details page will fetch additional data about a specific bucketlist. The user may like/dislike the bucketlist, post comments, and view any notes that the author included with their destinations. If the correct PIN is passed as a parameter in the URL (ie. '/bucketlists/1?pin=1234'), the user will be able to manage the bucketlist (Edit description, add/delete/edit destinations, delete entire list).

* `/bucketlists/new` - **New Bucketlist**

This is where the user may create their own bucketlist. When typing a title for the bucketlist, a fetch request is made to ensure there are no other bucketlists with the same title. The user will also provide a description, their name, and a 4-10 digit PIN used to manage their list.

* `/destinations` - **Destinations**

The Destinations page lists all of the destinations that have been previously added to a bucketlist. Users may search and sort through them, like them, or see what lists they have been added to.

## Contributing

Contributing Bug reports and pull requests are welcome on GitHub at https://github.com/wilfredbayudan/wanderlist-client. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the code of conduct.

## License

This project is available as open source under the terms of the MIT License.

## Code of Conduct

Everyone interacting in the wanderlist-client project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the code of conduct.