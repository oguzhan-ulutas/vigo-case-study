import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "@mui/material/Button";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({ carriers, userLocation, setCarrier, setStateOfCarrier }) => {
  // Get the closest carrier and delete him/her from carriers array in case he refuse the call.
  const findClosestCarrier = () => {
    setStateOfCarrier("searching");

    const closestCarrier = carriers.reduce((prev, curr) => {
      const prevDistance = Math.sqrt(
        Math.pow(prev.location.lat - userLocation.lat, 2) +
          Math.pow(prev.location.lng - userLocation.lng, 2)
      );
      const currDistance = Math.sqrt(
        Math.pow(curr.location.lat - userLocation.lat, 2) +
          Math.pow(curr.location.lng - userLocation.lng, 2)
      );
      return prevDistance < currDistance ? prev : curr;
    });

    if (closestCarrier) {
      setStateOfCarrier("found");
    }

    // Delete closestCarrier from carriers state
    const updatedCarriers = carriers.filter(
      (carrier) => carrier !== closestCarrier
    );
    console.log(closestCarrier);

    setCarriers(updatedCarriers);

    return closestCarrier;
  };

  const handleCallCarrier = () => {
    const closestCarrier = findClosestCarrier();

    setCarrier(closestCarrier);
  };

  return (
    <div>
      <MapContainer
        center={[40.991467, 29.027533]}
        zoom={11}
        style={{ height: "500px", width: "1000px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {carriers.map((carrier) => (
          <Marker
            key={carrier._id}
            position={[carrier.location.lat, carrier.location.lng]}
          >
            <Popup>
              {carrier.name} <br /> {carrier.phoneNumber}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Button
        sx={{ margin: "10px" }}
        variant="contained"
        onClick={handleCallCarrier}
      >
        Call Carrier
      </Button>
    </div>
  );
};

export default Map;
