import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const UserMessages = ({ updateCarrierStatus, stateOfCarrier, carrier }) => {
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
      <h2>User Messages: </h2>

      <div>
        {stateOfCarrier === "searching" ? (
          <p>Searching for a carrier...</p>
        ) : null}

        {stateOfCarrier === "found" ? (
          <p>A carrier has been found, waiting for an answer...</p>
        ) : null}

        {stateOfCarrier === "accepted"
          ? `${carrier.name} is on the way...`
          : null}

        {stateOfCarrier === "rejected" ? (
          <p>Searching for a new carrier...</p>
        ) : null}

        {stateOfCarrier === "arrived" ? (
          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              updateCarrierStatus("idle");
            }}
          >
            I took my delivery
          </Button>
        ) : null}
      </div>
    </Box>
  );
};

export default UserMessages;
