geocoder
========

GISCollective's very own geocoder!

Use this website to geocode points based on addresses. The website uses the US Census Bureau's geocoder, so only addresses within the United States are valid.

To Do:
*Export results as .csv, .json files
*Fix styling bugs
	-Geocode error div needs work
*Add 'Geocoding...' to application
	-need to run asynchronously? just a div in middle that closes when geocoding ends?	
*Zoom to layer extent when batch coding a CSV (possible with leaflet?)
*Add options panel, to include:
	-toggle center & zoom on geocoded point when coded
	-configuring custom zoom level for geocoding, if center & zoom is selected
	-select basemap tiles (I'm not committed to this yet but it could be a nice option)
	-change point styling  


Current Version - 0.5.1
*bug fixes 




UPDATES
v0.5.0
*Upload CSV and geocoding records working
*Need to break it to find bugs, but records geocode if properly formatted CSV is uploaded

v0.4.2
*Zoom to most recent point when Undo clicked, zoom to full extent when no points exist

v0.4.1
*Undo button removes markers on map

v0.4.0
*Undo button removes entries in both CSV and JSON

v0.3.1
*fixed json/csv div styles to float:left

v0.3
*Geojson output added
*Design tweaks

v0.2
*CSV output added
*Design tweaks