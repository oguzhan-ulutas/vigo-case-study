import React from "react";
import Box from "@mui/material/Box";

const UserMessages = ({ userMessage, stateOfCarrier, carrier }) => {
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

      <p>
        {stateOfCarrier === "searching" ? "Searching for a carrier..." : null}
      </p>

      <p>
        {stateOfCarrier === "found"
          ? "A carrier has been found, waiting for an answer..."
          : null}
      </p>

      <p>
        {stateOfCarrier === "accepted"
          ? `${carrier.name} is on the way...`
          : null}
      </p>

      <p>
        {stateOfCarrier === "rejected"
          ? "Searching for a new carrier..."
          : null}
      </p>
    </Box>
  );
};

export default UserMessages;
