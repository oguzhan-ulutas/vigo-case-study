import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import UserMessages from "./components/UserMessages";
import CarrierMessages from "./components/CarrierMessages";
import { Box } from "@mui/material";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  return (
    <>
      <Map
        setUserMessage={setUserMessage}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
      />

      <Box display={"flex"} gap={"20px"}>
        <UserMessages userMessage={userMessage} />
        <CarrierMessages userLocation={userLocation} />
      </Box>
    </>
  );
}

export default App;
