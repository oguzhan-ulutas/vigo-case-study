import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import UserMessages from "./components/UserMessages";
import CarrierMessages from "./components/CarrierMessages";
import { Box } from "@mui/material";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [carrier, setCarrier] = useState(null);
  const [stateOfCarrier, setStateOfCarrier] = useState("");

  useEffect(() => {
    // Setup user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Set 3 seconds delay for every change of the stateOfCarrier
  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 3000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [stateOfCarrier]);

  return (
    <>
      <Map
        setUserMessage={setUserMessage}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        setCarrier={setCarrier}
        setStateOfCarrier={setStateOfCarrier}
      />

      <Box display={"flex"} gap={"20px"}>
        <UserMessages
          userMessage={userMessage}
          stateOfCarrier={stateOfCarrier}
        />
        <CarrierMessages
          userLocation={userLocation}
          carrier={carrier}
          stateOfCarrier={stateOfCarrier}
        />
      </Box>
    </>
  );
}

export default App;
