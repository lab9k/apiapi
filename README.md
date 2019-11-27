# apiapi (WIP)

This is some sort of an api manager, which dynamically combines data from different api's. now the api expects to return data in a set structure, the goal of this project is to structure the returned data dynamically (more "configurable") as well.

## TODO

- create system for configurable data return. (now it only returns "iot devices")
- add configurable auth methods for each api
- add bcrypt encryption for stored api keys/uname+pass/etc (when auth methods are implemented)
- add support for data enriching. aka. adding custom fields with constant/path values. (for example: link to data processing statement)

## DOING

- add crud operations in backend for stored api management
- create an admin panel where you can manage api's.

## DONE

- add redis cache storage per api.
