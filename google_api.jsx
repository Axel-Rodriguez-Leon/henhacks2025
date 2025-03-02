//test location
const position = {lat: 39.744432, long: -75.545100};
//@ts-ignore
const {Map} = await google.maps.importLibrary("maps");
const { Library } = await google.maps.importLibrary("marker");
//generate map
map = new Map(document.getElementById("map"),{
    zoom: 4, center: position, MapId: "DEMO_MAP_ID",}
);


