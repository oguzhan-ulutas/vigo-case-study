import React from "react";
import Box from "@mui/material/Box";

const CarrierMessages = ({ userLocation }) => {
  return (
    <Box
      height={200}
      width={400}
      my={4}
      display="flex"
      flexDirection="column"
      gap={4}
      p={2}
      sx={{ border: "2px solid grey" }}
    >
      <h2>Carrier Messages: </h2>
      <p1>
        {userLocation.lat
          ? `The client's location is ${userLocation.lat} lat, ${userLocation.lng} lng. Please, Reach the user as soon as possible.`
          : null}
      </p1>
    </Box>
  );
};

export default CarrierMessages;
