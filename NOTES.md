Wanderlist Notes

User Story
1. User loads app -> Mapbox Loads, Retrieve list of user created Bucketlists
2. User can view different lists and locations added within each list.
3. User can create a new bucketlist with a list name, created by name, a description and timestamps
4. User can add locations to a bucketlist. I'll be using the positionstack API to search for and retrieve location data.
5. User can update descriptions of bucketlists.

User Searches for Location
Location is found, may be added to bucketlist
User clicks add to bucketlist


Domain Models
Bucketlists
id
name
description
created_by
likes
timestamps

Tags
id
label

BucketlistTags - Stretch
id
bucketlist_id
tag_id

BucketlistComments - Stretch
id
bucketlist_id
comment
created_by
rating
timestamps

BucketlistLocations
id
bucketlist_id
location_id
notes
timestamps

Locations
id
label
lng
lat
likes

LocationComments - Stretch
id
location_id
comment
created_by
timestamps
