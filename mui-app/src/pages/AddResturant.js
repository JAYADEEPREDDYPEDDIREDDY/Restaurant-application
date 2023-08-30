import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Result, TimePicker } from "antd";
import Select from "@mui/material/Select";
import "../styles/AddRestaurant.css";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import PhoneInput from "react-phone-number-input";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import InfoIcon from "@mui/icons-material/Info";
import "react-phone-number-input/style.css";
import axios from "axios";

const AddResturant = () => {
  const data = [
    {
      name: "one",
    },
    {
      name: "two",
    },
    {
      name: "three",
    },
    {
      name: "four",
    },
  ];
  const days = [
    {
      name: "Monday",
    },
    {
      name: "Tuesday",
    },
    {
      name: "Wednesday",
    },
    {
      name: "Thursday",
    },
    {
      name: "Friday",
    },
    {
      name: "Saturday",
    },
    {
      name: "Sunday",
    },
  ];

  const [contactNumber, setContactNumber] = React.useState();

  const [input, setInput] = useState({
    branchName: "",
    addResturantOrBranch: "",
    restaurantOwner: "",
    restaurantName: "",
    contactNumber: "",
    emailId: "",
    bannerImage: "",
    address: "",
    latitude: "",
    logitude: "",
    aboutRestaurant: "",
    country: "",
    state: "",
    city: "",
    currency: "",
    foodTypes: "",
    serviceTaxType: "",
    serviceTax: "",
    serviceFeeApplicable: false,
    serviceFeeType: "",
    serviceFee: "",
    allowEventBooking: false,
    eventBookingCapacity: "",
    eventOnlineAvailability: "",
    eventBookingMinimum: "",
    printerAvailable: false,
    printerPageHeight: "",
    printerPageWidth: "",
    sameTimingsAsMonday: false,
    restaurantTimings: {
      MondayopeningTime: "",
      MondayclosingTime: "",

      TuesdayopeningTime: "",
      TuesdayclosingTime: "",

      WednesdayopeningTime: "",
      WednesdayclosingTime: "",

      ThursdayopeningTime: "",
      ThursdayclosingTime: "",

      FridayopeningTime: "",
      FridayclosingTime: "",

      SaturdayopeningTime: "",
      SaturdayclosingTime: "",

      SundayopeningTime: "",
      SundayclosingTime: "",
    },
    closedNo: "",
    contractualCommission: "",
    pickUp: false,
    delivery: false,
  });
  const {
    branchName,
    addResturantOrBranch,
    restaurantOwner,
    restaurantName,
    contactNumber1,
    emailId,
    bannerImage,
    address,
    latitude,
    logitude,
    aboutRestaurant,
    country,
    state,
    city,
    currency,
    foodTypes,
    serviceTaxType,
    serviceTax,
    serviceFeeApplicable,
    serviceFeeType,
    serviceFee,
    allowEventBooking,
    eventBookingCapacity,
    eventOnlineAvailability,
    eventBookingMinimum,
    printerAvailable,
    printerPageHeight,
    printerPageWidth,
    sameTimingsAsMonday,
    restaurantTimings,
    closedNo,
    contractualCommission,
    pickUp,
    delivery,
  } = input;
  const handleChangeToggle = (e) => {
    const mondayopenTimings = input.restaurantTimings.MondayopeningTime;
    const mondaycloseTimings = input.restaurantTimings.MondayclosingTime;
    const updatedTimings = {};

    // Update timings for all days
    for (const day of days) {
      updatedTimings[`${day.name}openingTime`] = mondayopenTimings;
      updatedTimings[`${day.name}closingTime`] = mondaycloseTimings;
    }

    setInput((prevInput) => ({
      ...prevInput,
      restaurantTimings: {
        ...prevInput.restaurantTimings,
        ...updatedTimings,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let convertedValue = value; // Initialize with the original value

    if (value === "true") {
      convertedValue = false;
    } else if (value === "false") {
      convertedValue = true;
    }

    setInput((prevInput) => ({
      ...prevInput,
      [name]: convertedValue,
    }));
  };

  const [isServiceFeeApplicable, setIsisServiceFeeApplicable] = useState(false);
  const handleServiceFeeApplicable = (e) => {
    setIsisServiceFeeApplicable(!isServiceFeeApplicable);
    handleChange(e);
  };
  const [isallowEventBooking, setIsallowEventBooking] = useState(false);
  const handleallowEventBooking = (e) => {
    setIsallowEventBooking(!isallowEventBooking);
    handleChange(e);
  };
  const [isprinterAvailable, setIsprinterAvailable] = useState(false);
  const handleprinterAvailable = (e) => {
    setIsprinterAvailable(!isprinterAvailable);
    handleChange(e);
  };
  const [issameTimingsAsMonday, setIssameTimingsAsMonday] = useState(false);
  const handlesameTimingsAsMonday = (e) => {
    setIssameTimingsAsMonday(!issameTimingsAsMonday);
    handleChange(e);
    if (issameTimingsAsMonday === false) {
      handleChangeToggle(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const allTimingsFilled = days.every((day) => {
      const openingTime = input.restaurantTimings[day.name + "openingTime"];
      const closingTime = input.restaurantTimings[day.name + "closingTime"];
      return openingTime && closingTime; // Check if both opening and closing times are set
    });

    if (!allTimingsFilled) {
      // Show an error or prevent form submission
      alert("Please fill in all restaurant timings.");
      return;
    }
    const isPickUpSelected = input.pickUp;
    const isDeliverySelected = input.delivery;
    setInput((prevInput) => ({
      ...prevInput,
      pickUp: isPickUpSelected ? "PickUp" : "",
      delivery: isDeliverySelected ? "Delivery" : "",
    }));
    if (isPickUpSelected === false && isDeliverySelected === false) {
      // Show an error or prevent form submission
      alert("Please select at least one option (PickUp or Delivery).");
      return;
    }

    console.log(contactNumber);
    axios
      .post("http://localhost:3001/addNewResturant", {
        branchName,
        addResturantOrBranch,
        restaurantOwner,
        restaurantName,
        contactNumber,
        emailId,
        bannerImage,
        address,
        latitude,
        logitude,
        aboutRestaurant,
        country,
        state,
        city,
        currency,
        foodTypes,
        serviceTaxType,
        serviceTax,
        serviceFeeApplicable,
        serviceFeeType,
        serviceFee,
        allowEventBooking,
        eventBookingCapacity,
        eventOnlineAvailability,
        eventBookingMinimum,
        printerAvailable,
        printerPageHeight,
        printerPageWidth,
        sameTimingsAsMonday,
        restaurantTimings,
        closedNo,
        contractualCommission,
        pickUp,
        delivery,
      })
      .then((Result) => console.log(Result))
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTime = (day, timeType, newValue) => {
    console.log(newValue);

    setInput((prevInput) => {
      const newTimings = { ...prevInput.restaurantTimings };
      newTimings[day + timeType] = newValue;

      return {
        ...prevInput,
        restaurantTimings: newTimings,
      };
    });
    console.log(input);
  };



  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setInput((prevInput) => ({
        ...prevInput,
        latitude: position.coords.latitude,
        logitude: position.coords.longitude,
      }));
    });
  };



  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setInput((prevInput) => ({
      ...prevInput,
      bannerImage: file,
    }));
    setImagePreviewUrl(URL.createObjectURL(file));
    console.log(selectedFile);
  };

  return (
    <div>
      <h3 style={{ backgroundColor: "black", color: "white", padding: "10px" }}>
        Add Restaurant
      </h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>
              <label id="demo-select-small" required>
                Branch admin :
              </label>
            </td>
            <td style={{ width: "100px" }}></td>
            <td>
              <FormControl required>
                <InputLabel id="demo-simple-select-disabled-label">
                  Branch admin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  margin="normal"
                  id="demo-simple-select-required"
                  name="branchName"
                  required
                  SelectProps={{
                    native: true,
                  }}
                  value={input.branchName}
                  onChange={handleChange}
                  sx={{ width: "400px" }}
                >
                  {data.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <td>
              <label>Add restaurant or Branch :</label>
            </td>
            <td style={{ width: "100px" }}></td>
            <td>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="addResturantOrBranch"
                onChange={handleChange}
                aria-required={true}
                margin="normal"
                required
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Add restaurant"
                  value={"Add Restaurant"}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Add branch"
                  value="Add branch"
                />
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td>
              <label>Restaurant Owner :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <FormControl required>
                <InputLabel id="demo-simple-select-label">
                  Restaurant Owner{" "}
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="restaurantOwner"
                  value={input.restaurantOwner}
                  label="Age"
                  onChange={handleChange}
                  sx={{ width: "400px" }}
                  margin="normal"
                >
                  {data.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
          </tr>

          <tr>
            <td>
              <label>Restaurant Name :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                margin="normal"
                name="restaurantName"
                onChange={handleChange}
                id="outlined-basic"
                label="Restaurant Name "
                variant="outlined"
                sx={{ width: "400px" }}
                value={input.restaurantName}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Contact Number :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <PhoneInput
                margin="normal"
                style={{ width: "400px", outerHeight: "20px" }}
                required
                placeholder="Enter phone number"
                value={contactNumber}
                onChange={setContactNumber}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Email ID :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                margin="normal"
                required
                onChange={handleChange}
                name="emailId"
                value={input.emailId}
                id="outlined-basic"
                label="Email ID"
                variant="outlined"
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Banner Image :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <Button
                margin="normal"
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startIcon={
                  <SvgIcon>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Upload a file
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile ? (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  style={{ maxWidth: "10%", marginBottom: "-15px" }}
                />
              ) : (
                <Tooltip title="Click for Info">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )}
            </td>
          </tr>

          <tr>
            <td>
              <label>Address :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                margin="normal"
                required
                value={input.address}
                onChange={handleChange}
                name="address"
                id="outlined-basic"
                label="Address"
                variant="outlined"
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Latitude :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                margin="normal"
                onChange={handleChange}
                value={input.latitude}
                name="latitude"
                id="outlined-basic"
                label="Latitude"
                variant="outlined"
                sx={{ width: "400px" }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  marginLeft: "20px",
                }}
                onClick={getGeoLocation}
              >
                Pick Latitude/Longitude
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <label>Longitude :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                margin="normal"
                required
                value={input.logitude}
                onChange={handleChange}
                name="logitude"
                id="outlined-basic"
                label="Longitude"
                variant="outlined"
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Restaurant Description :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                margin="normal"
                value={input.aboutRestaurant}
                onChange={handleChange}
                name="aboutRestaurant"
                id="outlined-basic"
                label="Restaurant Description "
                variant="outlined"
                multiline
                rows={3}
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Country :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                margin="normal"
                value={input.country}
                onChange={handleChange}
                name="country"
                id="outlined-basic"
                label="Country"
                variant="outlined"
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>State :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                margin="normal"
                value={input.state}
                onChange={handleChange}
                name="state"
                id="outlined-basic"
                label="State"
                variant="outlined"
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>City :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                margin="normal"
                value={input.city}
                onChange={handleChange}
                name="city"
                id="outlined-basic"
                label="City"
                variant="outlined"
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Currency :</label>
            </td>
            <td style={{ width: "100px" }}></td>
            <td>
              <FormControl required>
                <InputLabel id="demo-simple-select-disabled-label">
                  Currency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  margin="normal"
                  value={input.currency}
                  name="currency"
                  onChange={handleChange}
                  sx={{ width: "400px" }}
                >
                  <MenuItem value="default" disabled>
                    <em>Please select</em>
                  </MenuItem>
                  {days.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <td>
              <label>Food Types:</label>
            </td>
            <td style={{ width: "100px" }}></td>
            <td>
              <FormControl required>
                <InputLabel id="demo-simple-select-disabled-label">
                  Branch admin
                </InputLabel>
                <Select
                  required
                  margin="normal"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={input.foodTypes}
                  name="foodTypes"
                  onChange={handleChange}
                  sx={{ width: "400px" }}
                >
                  <MenuItem value="default" disabled>
                    <em>Please select </em>
                  </MenuItem>
                  {data.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  marginLeft: "20px",
                }}
              >
                Add Food Type
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <label>Service Tax Type :</label>
            </td>
            <td style={{ width: "100px" }}></td>
            <td>
              <RadioGroup
                required
                margin="normal"
                aria-labelledby="demo-radio-buttons-group-label"
                name="serviceTaxType"
                onChange={handleChange}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="percentage"
                  control={<Radio />}
                  label="Percentage"
                />
                <FormControlLabel
                  value="amount"
                  control={<Radio />}
                  label="Amount"
                />
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td>
              <label>Service Tax : </label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td style={{ display: "flex" }}>
              <TextField
                required
                margin="normal"
                value={input.serviceTax}
                onChange={handleChange}
                name="serviceTax"
                id="outlined-basic"
                label="Service Tax"
                variant="outlined"
                sx={{ width: "400px" }}
              />
              {input.serviceTaxType === "percentage" ? (
                <h4 style={{ paddingLeft: "20px" }}>Percentage (%)</h4>
              ) : (
                <h4 style={{ paddingLeft: "20px" }}>Amount (₹)</h4>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Service Fee Applicable:</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <Switch
                value={isServiceFeeApplicable}
                margin="normal"
                name="serviceFeeApplicable"
                checked={isServiceFeeApplicable}
                onChange={(e) => {
                  handleServiceFeeApplicable(e);
                }}
              />
            </td>
          </tr>
          {input.serviceFeeApplicable ? (
            <>
              <tr>
                <td>
                  <label>Service Fee Type :</label>
                </td>
                <td style={{ width: "100px" }}></td>
                <td>
                  <RadioGroup
                    required
                    margin="normal"
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="serviceFeeType"
                    onChange={handleChange}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="Percentage"
                      control={<Radio />}
                      label="Percentage"
                    />
                    <FormControlLabel
                      value="Amount"
                      control={<Radio />}
                      label="Amount"
                    />
                  </RadioGroup>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Service Fee : </label>
                </td>
                <td style={{ width: "200px" }}></td>
                <td style={{ display: "flex" }}>
                  <TextField
                    margin="normal"
                    required
                    onChange={handleChange}
                    value={input.serviceFee}
                    name="serviceFee"
                    id="outlined-basic"
                    label="Service Fee"
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                  {input.serviceFeeType === "Percentage" ? (
                    <h4 style={{ paddingLeft: "20px" }}>Percentage (%)</h4>
                  ) : (
                    <h4 style={{ paddingLeft: "20px" }}>Amount (₹)</h4>
                  )}
                </td>
              </tr>
            </>
          ) : (
            <div></div>
          )}

          <tr>
            <td>
              <label>Allow Event Booking :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <Switch
                margin="normal"
                value={isallowEventBooking}
                name="allowEventBooking"
                checked={isallowEventBooking}
                onChange={(e) => {
                  handleallowEventBooking(e);
                }}
              />
            </td>
          </tr>
          {input.allowEventBooking === true ? (
            <>
              <tr>
                <td>
                  <label>Event Booking Capacity :</label>
                </td>
                <td style={{ width: "200px" }}></td>
                <td>
                  <TextField
                    required
                    margin="normal"
                    value={input.eventBookingCapacity}
                    onChange={handleChange}
                    name="eventBookingCapacity"
                    id="outlined-basic"
                    label="Event booking Capacity"
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Event Online Availabilty(%) :</label>
                </td>
                <td style={{ width: "200px" }}></td>
                <td>
                  <TextField
                    required
                    margin="normal"
                    value={input.eventOnlineAvailability}
                    onChange={handleChange}
                    name="eventOnlineAvailability"
                    id="outlined-basic"
                    label="Event Online Availabilty(%)"
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Event Booking Minimum Capacity :</label>
                </td>
                <td style={{ width: "200px" }}></td>
                <td>
                  <TextField
                    required
                    margin="normal"
                    value={input.eventBookingMinimum}
                    onChange={handleChange}
                    name="eventBookingMinimum"
                    id="outlined-basic"
                    label="Event Booking Minimum Capacity"
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                  <Tooltip title="Click for Info">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            </>
          ) : (
            <div></div>
          )}
          <tr>
            <td>
              <label>Printer Availabile:</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <Switch
                value={isprinterAvailable}
                margin="normal"
                name="printerAvailable"
                checked={isprinterAvailable}
                onChange={(e) => {
                  handleprinterAvailable(e);
                }}
              />
            </td>
          </tr>
          {input.printerAvailable ? (
            <>
              <tr>
                <td>
                  <label>Printer Page Height (in mm):</label>
                </td>
                <td style={{ width: "200px" }}></td>
                <td>
                  <TextField
                    margin="normal"
                    required
                    value={input.printerPageHeight}
                    onChange={handleChange}
                    name="printerPageHeight"
                    id="outlined-basic"
                    label="Printer page height"
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Printer Page Width (in mm):</label>
                </td>
                <td style={{ width: "200px" }}></td>
                <td>
                  <TextField
                    required
                    margin="normal"
                    value={input.printerPageWidth}
                    onChange={handleChange}
                    name="printerPageWidth"
                    id="outlined-basic"
                    label="Printer page Width"
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                </td>
              </tr>
            </>
          ) : (
            <div></div>
          )}

          <tr>
            <td>
              <label>Restaurant Timings :</label>
            </td>
            <td style={{ width: "200px" }}></td>

            <td>
              <div style={{ display: "flex" }}>
                <Switch
                  margin="normal"
                  value={issameTimingsAsMonday}
                  name="sameTimingsAsMonday"
                  checked={issameTimingsAsMonday}
                  onChange={(e) => {
                    handlesameTimingsAsMonday(e);
                  }}
                />
                <p style={{ marginTop: "6px" }}>
                  Assign Monday Timings for all days
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td style={{ width: "200px" }}></td>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <td>You are saving the below time in Asia/Kolkata time zone </td>
              <td>&nbsp;</td>
              {days.map((day) => (
                <tr key={day.name}>
                  <td style={{ width: "100px" }}>{day.name}</td>
                  <td>
                    <TimePicker
                      required
                      value={input.restaurantTimings[day.name + "openingTime"]}
                      onChange={(newValue) =>
                        onChangeTime(day.name, "openingTime", newValue)
                      }
                    />
                  </td>
                  <td>
                    <TimePicker
                      required
                      onChange={(newValue) =>
                        onChangeTime(day.name, "closingTime", newValue)
                      }
                      value={input.restaurantTimings[day.name + "closingTime"]}
                    />
                  </td>
                </tr>
              ))}
            </div>
          </tr>
          <tr>
            <td>
              <label>Closed On</label>
            </td>
            <td style={{ width: "100px" }}></td>
            <td>
              <FormControl required>
                <InputLabel id="demo-simple-select-disabled-label">
                  Branch admin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  margin="normal"
                  id="demo-simple-select-required"
                  value={input.closedNo}
                  name="closedNo"
                  onChange={handleChange}
                  sx={{ width: "400px" }}
                >
                  <MenuItem value="default" disabled>
                    <em>Please select</em>
                  </MenuItem>
                  {days.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <td>
              <label>Contractual Commission :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                value={input.contractualCommission}
                margin="normal"
                onChange={handleChange}
                name="contractualCommission"
                id="outlined-basic"
                label="Contractual Commission"
                variant="outlined"
                sx={{ width: "400px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Order Mode:</label>
            </td>
            <td style={{ width: "100px" }}></td>
            <td>
              <FormControl required>
                <RadioGroup
                  required
                  margin="normal"
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="pickUp"
                    value="PickUp"
                    control={<Checkbox />}
                    label="PickUp"
                  />
                  <FormControlLabel
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="delivery"
                    value="Delivery"
                    control={<Checkbox />}
                    label="Delivery"
                  />
                </RadioGroup>
              </FormControl>
            </td>
          </tr>
          <Divider sx={{ marginTop: "10px", marginBottom: "20px" }}></Divider>

          <tr>
            <td></td>
            <td style={{ width: "100px" }}></td>
            <div>
              <Button type="submit">Submit</Button>
              <Button sx={{ marginLeft: "20px" }}>Save</Button>
              <Button sx={{ marginLeft: "20px" }}>Cancel</Button>
            </div>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default AddResturant;
