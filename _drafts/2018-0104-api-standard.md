---
layout: post
title:  "API Standard"
date:   2019-01-04 00:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming]
---

# REST API Versioning
### When
APIs only need to be up-versioned when a breaking change is made. Breaking changes include:
  - A change in the format of the response data for one or more calls
  - A change in the response type (i.e. changing an integer to a float)
  - A removing any part of the API.
Breaking changes: should always change to the major version number for an API.
Non-breaking changes: adding new endpoints or new response parameters, do not require a change to the major version number. Or change minor versions of APIs.

### How
REST doesn’t provide for any specific versioning guidelines but the more commonly used approaches fall into 4 categories:
1. URI Versioning: a version slug in the resource identifier, e.g. /v1/users/100
Disadvantages: 
  - Any breaking change in any of the published APIs will introduce a whole new tree of representations for the entire API
  - [Severely inflexible](https://www.mnot.net/blog/2012/12/04/api-evolution)
  - HTTP Caching problems.
2. HTTP header: a custom header or MIME type parameter, e.g. Accept: application/vnd.example.com; version=1
3. Hostname or subdomain: via multiple hostnames e.g. v3.api.example.com
4. Query parameter: via a query parameter, e.g. /users/100?v=1


### Convention
Version naming convention:
[Semantic Versioning](https://semver.org/). But use only the major version number, so make it backwards-compatible


# Compatibility
### Avoid versioning
Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing our systems.
If changing an API can’t be done in a compatible way, then proceed in one of these three ways:
- Create a new resource (variant) in addition to the old resource variant
- Create a new service endpoint — i.e. a new application with a new API (with a new domain name)
- Create a new API version supported in parallel with the old API by the same microservice(not recommend)

### Use Media Type Versioning
Media type versioning is less tightly coupled

# Deprecation
### Monitor Usage of Deprecated APIs
Monitor and makesure clients don't use any deprecated APIs before shutdown it.


# JSON
### Boolean property values must not be null
### Empty array values should not be null

# API Naming
### Use lowercase separate words with hyphens for Path Segments
### [Nouns (not vebs!)](https://apigee.com/about/blog/technology/restful-api-design-nouns-are-good-verbs-are-bad)

### Pluralize Resource Names
### Use snake_case for fields name and params
# HTTP Requests
### GET
- GET requests for individual resources will usually generate a 404 if the resource does not exist
- GET requests for collection resources may return either 200 (if the collection is empty) or 404 (if the collection is missing)
- GET requests must NOT have a request body payload
### PUT
- PUT requests are usually applied to single resources, and not to collection resources
- PUT requests are usually robust against non-existence of resources by implicitly creating before updating
- Successful PUT requests will usually generate 200 or 204 (if the resource was updated - with or without actual content returned), and 201 (if the resource was created)

### POST
- Successful POST requests will usually generate 200 (if resources have been updated), 201 (if resources have been created), and 202 (if the request was accepted but has not been finished yet)

### DELETE
- DELETE requests are usually applied to single resources, not on collection resources
- Successful DELETE requests will usually generate 200 (if the deleted resource is returned) or 204 (if no content is returned)
- Failed DELETE requests will usually generate 404 (if the resource cannot be found) or 410 (if the resource was already deleted before)

# References
- https://restfulapi.net/versioning/ 
- https://semver.org/
- https://www.mnot.net/blog/2012/12/04/api-evolution
- https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api