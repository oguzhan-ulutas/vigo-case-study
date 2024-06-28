import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const CarrierMessages = ({
  userLocation,
  carrier,
  stateOfCarrier,
  setStateOfCarrier,
}) => {
  return (
    <Box
      minHeight={200}
      width={400}
      my={4}
      display="flex"
      flexDirection="column"
      gap={4}
      p={2}
      sx={{ border: "2px solid grey" }}
    >
      <h2>Carrier Messages: </h2>
      <div>
        {stateOfCarrier === "found" ? (
          <>
            <p>
              Hello {carrier.name}.The client's location is {userLocation.lat}{" "}
              lat, {userLocation.lng} lng. Do you want to except the task?
            </p>
            <Button
              sx={{ margin: "10px" }}
              variant="contained"
              onClick={() => {
                setStateOfCarrier("accepted");
              }}
            >
              Accept
            </Button>
            <Button
              sx={{ margin: "10px" }}
              variant="contained"
              onClick={() => {
                setStateOfCarrier("declined");
              }}
            >
              Decline
            </Button>
          </>
        ) : null}
      </div>
    </Box>
  );
};

export default CarrierMessages;
