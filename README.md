# Wanderlist App

Wanderlist is a web-based app that helps travelers and aspiring travelers share ideas on destinations they should visit.

# Technologies
* JavaScript / React
* Ruby / Sinatra
* SQLite 

# APIs
* [MapBox](https://www.mapbox.com/)
* [PositionStack](https://positionstack.com/)
* [Wanderlist API](https://github.com/wilfredbayudan/wanderlist-server)

# Features
- [x] **C**reate / **R**ead / **U**pdate / **D**elete bucketlists
- [x] Add destinations to a bucketlists
- [x] Like/Dislike bucketlists
- [x] Like/Dislike destinations
- [x] Comment on a bucketlist
- [ ] Comment on a destination
- [ ] Rate a bucketlist
- [ ] Rate a destination
- [x] Interactive map integration with markers and popups

# Installation
1. **IMPORTANT!** Clone and install the [backend repository](https://github.com/wilfredbayudan/wanderlist-server).
2. Clone this repository.
3. Sign-up and create free API keys for [PositionStack](https://positionstack.com/) and [MapBox](https://www.mapbox.com/).
4. Create a file called `.env.development` in the root directory (for development purposes) or use the following example to set your production environment variables:

```
REACT_APP_WANDERLIST_API=YOUR WANDERLIST API URL HERE (ie.http://localhost:9292
REACT_APP_WANDERLIST_URL=YOUR REACT APP URL HERE (ie. http://localhost:3000)
REACT_APP_POSITIONSTACK_KEY=YOUR POSITIONSTACK API KEY HERE
REACT_APP_MAPBOX_ACCESS_TOKEN=YOUR ACCESS TOKEN HERE
```
5. Run `npm install` in the Terminal to install dependencies.
6. Run `npm start` in the Terminal to start the React App. Have fun!