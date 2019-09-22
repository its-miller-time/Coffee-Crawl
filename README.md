# Coffee Crawl

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Get Crawlin](#get-crawlin')
* [Description](#description)

## General Info
Given your current location, and a chosen number of cafes to visit, Coffee Crawl will give you a list of nearby coffee shops and will order them in an efficient route to get you to each of them and back to your starting location.

## Technologies
* JavaScript
* HTML/CSS 
* RESTful API
* MapQuest SDK
* AWS

## Get Crawlin'
Open up the site, type the numbe of cafes you want into the search bar. Hit Get Crawlin!!

You have to agree to have location services accessed in order for the geolocation to work properly.

## Description
Coffee Crawl takes in the number of cafes that a user wants to see and their current location from browser properties.

The location is fed into making a FourSquare API call with a parameter specifying the return of cafes. This list is filtered to exclude major national chains (in order to keep the crawl relevant to the current locale) and locations with insufficient check-ins (thereby exluding a lot of non-cafes that are mis-labeled in the api). 

The list of returned cafes is passed into the Mapquest SDK to return a map with all the locations marked. The current location of the user is used as the starting and ending point in the directions to ensure that the user has an efficient route to get back home (or work, or wherever they might have been) after they caffeine-up. 

This map and list are then loaded onto the DOM and displayed on the page for folks coffee pleasures.

## Challenges
Some of the biggest challenges with this were getting the SDK to perform as intended and getting the formatting to cohere once the map and directions loaded.
1. The mapquest SDK required a number of asynchronous functions to be run before it could be run, and that took a few tries to ensure everything was fetched and then cascaded in the proper order. For a while, we could get the map to load but not the directions. And there are still lingering issues that can't be easily solved within the SDK (for example, if you move directions within the map they're at risk of disappearing entirely!).
2. Once the map and directions were actually loaded, they would often interfere with the other DOM objects that we had created including the header, footer, and 'About' modal. After all too much formatting, the simplest option was too restart with our HTML, and begin with mobile formatting. This led to the much cleaner, simpler HTML/CSS design and layout that you see today.  
