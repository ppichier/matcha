import React, { useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./ProfileMap.css";

const iconHeart = new Icon({
  iconUrl: "/iconHeart.svg",
  iconSize: [35, 35]
});

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

const SimpleMap = ({ lat, lng, updateProfilePosition }) => {
  const [coordinates, setCoordinates] = useState({
    lat,
    lng,
    zoom: 13
  });

  const updatePosition = e => {
    let marker = e.target;
    let coord = marker.getLatLng();
    setCoordinates({ ...coordinates, lat: coord.lat, lng: coord.lng });
    updateProfilePosition({ lat: coord.lat, lng: coord.lng });
  };

  return (
    <Map
      center={[coordinates.lat, coordinates.lng]}
      zoom={coordinates.zoom}
      attributionControl={false}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[coordinates.lat, coordinates.lng]}
        draggable={true}
        onDragend={updatePosition}
        autoPan={true}
        icon={iconHeart}
      />
    </Map>
  );
};

export default SimpleMap;
