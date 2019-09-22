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