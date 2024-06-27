import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "@mui/material/Button";

const Map = ({ setUserMessage, setUserLocation, userLocation }) => {
  const [carriers, setCarriers] = useState([]);
  const serverURL = import.meta.env.VITE_baseUrl;

  useEffect(() => {
    fetch(`${serverURL}/carriers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCarriers(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the carriers!", error);
      });
  }, []);

  const handleCallCarrier = () => {
    // Get the closest carrier and send a message
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // const userLocation = {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        // };

        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

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

        fetch(`${serverURL}/carriers/${closestCarrier._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location: userLocation }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // alert("Carrier is on the way!");
            setUserMessage("Carrier is on the way!");
          })
          .catch((error) => {
            console.error("Error updating carrier location", error);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
