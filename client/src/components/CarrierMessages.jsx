import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const CarrierMessages = ({
  userLocation,
  carrier,
  stateOfCarrier,
  updateCarrierStatus,
  changeCarrierLocation,
  fetchCarriers,
  handleCallCarrier,
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
                updateCarrierStatus("accepted");
              }}
            >
              Accept
            </Button>
            <Button
              sx={{ margin: "10px" }}
              variant="contained"
              onClick={() => {
                updateCarrierStatus("rejected");
                setTimeout(() => {
                  fetchCarriers();
                  handleCallCarrier();
                }, 2000);
              }}
            >
              Reject
            </Button>
          </>
        ) : null}

        {stateOfCarrier === "rejected" ? (
          <p>You will be able to take new request in 30 minutes.</p>
        ) : null}

        {stateOfCarrier === "accepted" ? (
          <>
            <p>
              Client is waiting for you. Please reach the client as soon as
              possible!
            </p>
            <Button
              sx={{ margin: "10px" }}
              variant="contained"
              onClick={() => {
                updateCarrierStatus("arrived");
                changeCarrierLocation();
              }}
            >
              Arrived
            </Button>
          </>
        ) : null}

        {stateOfCarrier === "arrived" ? (
          <p>Thank you for your service. Please wait for next call.</p>
        ) : null}
      </div>
    </Box>
  );
};

export default CarrierMessages;
