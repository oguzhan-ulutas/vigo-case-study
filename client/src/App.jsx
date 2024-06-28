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
  const [stateOfCarrier, setStateOfCarrier] = useState("");

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

    const availableCarriers = carriers.filter(
      (carrier) => carrier.status !== "rejected"
    );
    const closestCarrier = availableCarriers.reduce((prev, curr) => {
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
      setTimeout(() => {
        setStateOfCarrier("found");
      }, 1000);
    }

    return closestCarrier;
  };

  const handleCallCarrier = () => {
    const closestCarrier = findClosestCarrier();

    setCarrier(closestCarrier);
  };

  const changeCarrierLocation = () => {
    fetch(`${serverURL}/carriers/${carrier._id}`, {
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

  const updateCarrierStatus = (status) => {
    fetch(`${serverURL}/carriers/${carrier._id}/update-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setCarrier(response);
        setStateOfCarrier(response.status);
      })
      .catch((error) => {
        console.error("Error updating carrier status", error);
      });
  };

  return (
    <>
      <Map
        carriers={carriers}
        handleCallCarrier={handleCallCarrier}
        fetchCarriers={fetchCarriers}
      />

      <Box display={"flex"} gap={"20px"}>
        <UserMessages
          stateOfCarrier={stateOfCarrier}
          carrier={carrier}
          updateCarrierStatus={updateCarrierStatus}
        />
        <CarrierMessages
          userLocation={userLocation}
          carrier={carrier}
          stateOfCarrier={stateOfCarrier}
          changeCarrierLocation={changeCarrierLocation}
          updateCarrierStatus={updateCarrierStatus}
          fetchCarriers={fetchCarriers}
          handleCallCarrier={handleCallCarrier}
        />
      </Box>
    </>
  );
}

export default App;
