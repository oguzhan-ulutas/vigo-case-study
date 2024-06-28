import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import UserMessages from "./components/UserMessages";
import CarrierMessages from "./components/CarrierMessages";
import { Box } from "@mui/material";

const dummyCarrier = {
  location: {
    lat: 40.9126884,
    lng: 29.1546861,
  },
  _id: "667d351871d8ee797a73dc8f",
  name: "Carrier Three",
  phoneNumber: "+112233445",
};

function App() {
  const [carriers, setCarriers] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [carrier, setCarrier] = useState({});
  const [stateOfCarrier, setStateOfCarrier] = useState("found");

  const serverURL = import.meta.env.VITE_baseUrl;

  const fetchCarriers = () => {
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
  };

  useEffect(() => {
    fetchCarriers();
  }, []);

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

  const changeCarrierLocation = () => {
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
        fetchCarriers();
      })
      .catch((error) => {
        console.error("Error updating carrier location", error);
      });
  };

  // Set 3 seconds delay for every change of the stateOfCarrier
  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 3000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [stateOfCarrier]);

  return (
    <>
      <Map
        carriers={carriers}
        handleCallCarrier={handleCallCarrier}
        fetchCarriers={fetchCarriers}
      />

      <Box display={"flex"} gap={"20px"}>
        <UserMessages stateOfCarrier={stateOfCarrier} carrier={carrier} />
        <CarrierMessages
          userLocation={userLocation}
          carrier={carrier}
          stateOfCarrier={stateOfCarrier}
          setStateOfCarrier={setStateOfCarrier}
          changeCarrierLocation={changeCarrierLocation}
        />
      </Box>
    </>
  );
}

export default App;
