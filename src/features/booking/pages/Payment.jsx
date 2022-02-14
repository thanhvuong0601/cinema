import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PropTypes from "prop-types";
const payments = [
  {
    title: "MasterCard",
    imgUrl: "./images/mastercard.png",
  },
  {
    title: "Visa",
    imgUrl: "./images/visa.png",
  },
  {
    title: "PayPal",
    imgUrl: "./images/paypal.png",
  },
];
const Payment = ({ errors, register }) => {
  const [activeMethod, setActiveMethod] = useState(0);
  return (
    <Box
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "myColor.grey",
        },
      }}
    >
      <Typography gutterBottom>Payment method</Typography>
      <Stack direction={"row"} spacing={2} mb={2}>
        {payments.map((item, i) => (
          <Button
            variant="outlined"
            key={i}
            sx={[
              activeMethod === i && {
                border: "1px solid red",
              },
            ]}
            onClick={() => setActiveMethod(i)}
          >
            <img
              src={item.imgUrl}
              alt={item.title}
              style={{ width: "100px" }}
            />
          </Button>
        ))}
      </Stack>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            {...register("firstName")}
            error={errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            {...register("lastName")}
            error={errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Card Number"
            variant="outlined"
            {...register("cardId")}
            error={errors.cardId}
            helperText={errors.cardId?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={payments[activeMethod].imgUrl}
                    alt={payments[activeMethod].title}
                    style={{ width: "50px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Expiration Date"
            variant="outlined"
            {...register("expirationTime")}
            error={errors.expirationTime}
            helperText={errors.expirationTime?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="CVV"
            variant="outlined"
            {...register("code")}
            error={errors.code}
            helperText={errors.code?.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
Payment.propType = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};
