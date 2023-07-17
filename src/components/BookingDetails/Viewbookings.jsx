import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import LabelIcon from "@mui/icons-material/Label";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

// export default ViewBookings;
const ViewBookings = () => {
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const steps = ["Your Selection", "Your Details", "Final Step"];

  const { cardData } = useSelector((state) => state.setCardData);
  const { options } = useSelector((state) => state.searchOption);
  const { booked_property } = useSelector((state) => state.getBookedDetails);
  const { dates } = useSelector((state) => state.searchDate);
  const datesParking = useSelector((state) => state.searchParkingDate.dates);
  const { c } = useSelector((state) => state.searchVehicle);

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const roomPrice = 150;
  const parkingPrice = 20;
  const additionalCharges = true;
  const additionalChargesDescription = "Room Service";
  const additionalChargesPrice = 20;
  const taxDescription = "Tax (10%)";
  const taxPrice = 200;
  

  let src;
  if (booked_property.photos && booked_property.photos[0]) {
    src = booked_property.photos[0];
  } else if (booked_property.hotel_photos && booked_property.hotel_photos[0]) {
    src = booked_property.hotel_photos[0];
  } else {
    src = null;
  }
  const singleRoomsArray = [];
  const twinRoomsArray = [];
  const familyRoomsArray = [];
  const Rooms = booked_property.Rooms;
  let room, room_no;


  if (options.singleRoom > 0) {
    for (let i = 0; i < Rooms.length; i++) {
      room = Rooms[i].room;
      room_no = Rooms[i].room_no;
      if (room.type === "Single") {
        for (let j = 0; j < room_no.length; j++) {
          if (j < options.singleRoom) {
            let roomObj = {
              ...room_no[j],
              RoomId: room._id,
              Room_price: room.price,
            };
            singleRoomsArray.push(roomObj);
          } else {
            break;
          }
        }
      }
    }
  }
  if (options.twinRoom > 0) {
    for (let i = 0; i < Rooms.length; i++) {
      room = Rooms[i].room;
      room_no = Rooms[i].room_no;
      if (room.type === "Twin") {
        for (let j = 0; j < room_no.length; j++) {
          if (j < options.twinRoom) {
            let roomObj = {
              ...room_no[j],
              RoomId: room._id,
              Room_price: room.price,
            };
            twinRoomsArray.push(roomObj);
          } else {
            break;
          }
        }
      }
    }
  }
  if (options.familyRoom > 0) {
    for (let i = 0; i < Rooms.length; i++) {
      room = Rooms[i].room;
      room_no = Rooms[i].room_no;
      if (room.type === "Family") {
        for (let j = 0; j < room_no.length; j++) {
          if (j < options.familyRoom) {
            let roomObj = {
              ...room_no[j],
              RoomId: room._id,
              Room_price: room.price,
            };
            familyRoomsArray.push(roomObj);
          } else {
            break;
          }
        }
      }
    }
  }

  // User Id Data
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const userId = loggedinUser.user._id;
  // Hotel Id Data
  const hotelId = booked_property._id;
  // Dates Data
  const checkIn = dates[0];
  const checkOut = dates[1];
  // Room Details
  let roomArray = [];
  let tempObj = {};

  // Let Parking data
  let parking = {};

  if (options.singleRoom > 0) {
    singleRoomsArray.map((room) => {
      tempObj = {
        Room_type: "Single",
        RoomId: room.RoomId,
        Room_no: room.number,
        Room_price: room.Room_price,
      };
      roomArray.push(tempObj);
    });
  }
  if (options.twinRoom > 0) {
    twinRoomsArray.map((room) => {
      tempObj = {
        Room_type: "Twin",
        RoomId: room.RoomId,
        Room_no: room.number,
        Room_price: room.Room_price,
      };
      roomArray.push(tempObj);
    });
  }
  if (options.familyRoom > 0) {
    familyRoomsArray.map((room) => {
      tempObj = {
        Room_type: "Family",
        RoomId: room.RoomId,
        Room_no: room.number,
        Room_price: room.Room_price,
      };
      roomArray.push(tempObj);
    });
  }

  roomArray = JSON.stringify(roomArray);

  if (booked_property.parking_name) {
    parking = {
      Total_slots: c,
      Parking_price: booked_property.parking_price,
    };
    parking = JSON.stringify(parking);
  }

  let CorrectCheckIn = "";
  let CorrectCheckOut = "";

  if (dates && dates.length === 2) {
    let startingDate = dates[0];
    const [startday, startmonth, startyear] = startingDate
      .split("-")
      .map(Number);
    CorrectCheckIn = startyear + "-" + startmonth + "-" + startday;
    startingDate = new Date(startyear, startmonth - 1, startday); // Note: month is 0-indexed in JavaScript
    let endingDate = dates[1];
    const [endday, endmonth, endyear] = endingDate.split("-").map(Number);
    CorrectCheckOut = endyear + "-" + endmonth + "-" + endday;
    endingDate = new Date(endyear, endmonth - 1, endday); // Note: month is 0-indexed in JavaScript
  }

  let Facilities = [];
  if (booked_property.Facilities) {
    Facilities = [...booked_property.Facilities];
  }

  const HandleBooking = async () => {
    // Api Request
    if (!booked_property.parking_name) {
      const hotelURL = `${api}/booking/addBooking?userId=${userId}&hotelId=${hotelId}&room=${roomArray}&checkIn=${CorrectCheckIn}&checkOut=${CorrectCheckOut}&adults=${options.adult}&children=${options.children}`;
      const requestOptions = {
        method: "POST",
      };
      try {
        const response = await fetch(hotelURL, requestOptions);
        const data = await response.json();
        if (response.ok) {
          alert("Booking Successful");
        } else {
          alert("Booking Failed");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const hotelandparkingURL = `${api}/booking/addHotelAndParkingBooking?userId=${userId}&HotelAndParkingId=${hotelId}&room=${roomArray}&checkIn=${CorrectCheckIn}&checkOut=${CorrectCheckOut}&parking=${parking}`;
      const requestOptions = {
        method: "POST",
      };
      try {
        const response = await fetch(hotelandparkingURL, requestOptions);
        const data = await response.json();
        if (response.ok) {
          alert("Booking Successful");
        } else {
          alert("Booking Failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container "
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ width: "100%", my: 2 }}>
          <Stepper activeStep={1}>
            {steps.map((label, index) => {
              const labelProps = {};
              return (
                <Step key={label}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        <div className="row">
          <div className="col-md-4">
            <div className="py-2">
              
              <div className="">
                <div className="card-body">
                  <div className="text-center">
                    <h5 className="mb-3 card-title fw-bold text-dark">
                      Your Booking Details
                    </h5>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex my-1">
                        <i className="fas fa-calendar-alt mt-1"></i>
                        <span className="mx-1">{dates[0]}</span>
                      </div>
                      <div className="d-flex my-1">
                        <i className="fas fa-calendar-alt mt-1"></i>
                        <span className="mx-1">{dates[1]}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <i className="fas fa-moon"></i>
                      <span>{booked_property.Nights} Nights</span>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <i className="fas fa-users"></i>
                      <span>
                        {options.adult} Adults, {options.children} Child
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <small className="fw-bold text-dark">You selected:</small>
                    <div className="text-muted small">
                      {options.singleRoom > 0
                        ? `${options.singleRoom}x Single Room`
                        : null}{" "}
                      {options.twinRoom > 0
                        ? `- ${options.twinRoom}x Twin Room`
                        : null}{" "}
                      {options.familyRoom > 0
                        ? `- ${options.familyRoom}x Family Room`
                        : null}{" "}
                    </div>
                    <Link to="/listhotel" className="small">
                      Change Your Selection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="py-2 d-flex flex-column">
              <div className="justify-content-center">
                <div className=" shadow-0 ">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3 col-xl-3 col-sm-12">
                        <div className="h-100 bg-image hover-zoom ripple rounded ripple-surface">
                          <img
                            src={src}
                            style={{ objectFit: "cover" }}
                            className="w-100 h-100"
                          />
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-9 col-lg-9 col-xl-9">
                        <h5>
                          {booked_property
                            ? booked_property.hotel_name
                              ? booked_property.hotel_name
                              : booked_property.name
                              ? booked_property.name
                              : "Desalis Hotel"
                            : "Hotel Pod Roza"}
                        </h5>
                        <Box
                          className="justify-content-start"
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="hover-feedback"
                            readOnly
                            value={
                              booked_property
                                ? booked_property.rating
                                  ? booked_property.rating
                                  : booked_property.rating
                                  ? booked_property.rating
                                  : 4
                                : 4
                            }
                            precision={1}
                            getLabelText={getLabelText}
                            
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          {
                            <Box className="ms-3" sx={{ mb: 1, fontSize: 17 }}>
                              {
                                labels[
                                  booked_property
                                    ? booked_property.rating
                                      ? booked_property.rating
                                      : booked_property.hotel_rating
                                      ? booked_property.hotel_rating
                                      : 4
                                    : 4
                                ]
                              }
                            </Box>
                          }
                        </Box>
                        <div
                          className="mt-1 mb-0 text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          {Facilities.length > 0 && (
                            <>
                              {Facilities.slice(3, 7).map((facility, index) => (
                                <React.Fragment key={index}>
                                  <span>{facility}</span>
                                  {index !==
                                    Facilities.slice(3, 7).length - 1 && (
                                    <span className="text-primary"> • </span>
                                  )}
                                </React.Fragment>
                              ))}
                            </>
                          )}
                          <br />
                        </div>
                        <div
                          className="mb-1 text-muted small"
                          style={{ fontSize: "12px" }}
                        >
                          {Facilities.length > 0 && (
                            <>
                              {Facilities.slice(0, 3).map((facility, index) => (
                                <React.Fragment key={index}>
                                  <span>{facility}</span>
                                  {index !==
                                    Facilities.slice(0, 3).length - 1 && (
                                    <span className="text-primary"> • </span>
                                  )}
                                </React.Fragment>
                              ))}
                            </>
                          )}
                          <br />
                          
                        </div>
                        <p className="w-100 fst-italic text-muted">
                          {booked_property
                            ? booked_property.description
                              ? booked_property.description.slice(0, 320) +
                                `...`
                              : booked_property.hotel_description
                              ? booked_property.hotel_description.slice(
                                  0,
                                  320
                                ) + `...`
                              : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint veritatis quod aut dolor quae nihil inventore harum expedita nobis nisi."
                            : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint veritatis quod aut dolor quae nihil inventore harum expedita nobis nisi."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <hr />
        </div>
        <div className="row ">
          <div className="col-md-12">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <h5 className="text-dark fw-bold my-3">Rooms To Be Booked</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row mb-3">
                    {options.singleRoom > 0 && (
                      <>
                        <div className="col-md-4">
                          <LabelIcon color="primary" className="mx-2" />
                          <span>Single Room(s):</span>
                        </div>
                        <div className="col-md-8 justify-content-end">
                          <span className="fw-bold">
                            {singleRoomsArray.map(
                              (room, index) =>
                                `Room No: ${room.number}${
                                  index === singleRoomsArray.length - 1
                                    ? ""
                                    : ", "
                                }`
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="row mb-3">
                    {options.twinRoom > 0 ? (
                      <>
                        <div className="col-md-4">
                          <LabelIcon color="primary" className="mx-2" />
                          <span>Twin Room(s):</span>
                        </div>
                        <div className="col-md-8 justify-content-end">
                          <span className="fw-bold">
                            {twinRoomsArray.map(
                              (room, index) =>
                                `Room No: ${room.number}${
                                  index === twinRoomsArray.length - 1
                                    ? ""
                                    : ", "
                                }`
                            )}
                          </span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row mb-3">
                    {options.familyRoom > 0 ? (
                      <>
                        <div className="col-md-4">
                          <LabelIcon color="primary" className="mx-2" />
                          <span>Family Room(s):</span>
                        </div>
                        <div className="col-md-8 justify-content-end">
                          <span className="fw-bold">
                            {familyRoomsArray.map(
                              (room, index) =>
                                `Room No: ${room.number}${
                                  index === familyRoomsArray.length - 1
                                    ? ""
                                    : ", "
                                }`
                            )}
                          </span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <hr />
        </div>
        <div className="row">
          <div className="">
            <div className="py-2">
              <div className="justify-content-center">
                <div className="">
                  <div className="card-body">
                    <div className="row text-start mb-4">
                      <h5 className="mb-0 fw-bold text-dark">
                        Your Price Summary
                      </h5>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <Root>
                          <Divider className=" text-muted fs-6">
                            Rooms Booked
                          </Divider>
                        </Root>
                        {options.singleRoom > 0 ? (
                          <div className="d-flex justify-content-between align-items-center">
                            <span>
                              <LabelIcon color="primary" className="mx-2" />
                              Single Room
                            </span>
                            <span className="fw-bold">
                              {`${options.singleRoom}x  ${booked_property.SingleRoomPrice}`}
                            </span>
                          </div>
                        ) : null}{" "}
                        {options.twinRoom > 0 ? (
                          <div className="d-flex justify-content-between align-items-center ">
                            <span>
                              <LabelIcon color="primary" className="mx-2" />
                              Twin Room
                            </span>
                            <span className="fw-bold">
                              {`${options.twinRoom}x  ${booked_property.TwinRoomPrice}`}
                            </span>
                          </div>
                        ) : null}{" "}
                        {options.familyRoom > 0 ? (
                          <div className="d-flex justify-content-between align-items-center ">
                            <span>
                              <LabelIcon color="primary" className="mx-2" />
                              Family Room
                            </span>
                            <span className="fw-bold">
                              {`${options.familyRoom}x  ${booked_property.FamilyRoomPrice}`}
                            </span>
                          </div>
                        ) : null}{" "}
                      </div>
                    </div>
                    {booked_property.parking_name && (
                      <>
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <Root>
                              <Divider className=" text-muted fs-6">
                                Booked Parking
                              </Divider>
                            </Root>
                            <span>{booked_property.parking_name}</span>
                            <div className="d-flex justify-content-between align-items-center ">
                              <span>
                                <LabelIcon color="primary" className="mx-2" />
                                Parking price:
                              </span>
                              <span className="fw-bold">
                                {`${c}x ${booked_property.parking_price}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {additionalCharges && (
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <Root>
                            <Divider className=" text-muted fs-6">
                              Additonal Charges
                            </Divider>
                          </Root>
                          <div className="d-flex justify-content-between align-items-center">
                            <span>
                              <LabelIcon color="primary" className="mx-2" />
                              {additionalChargesDescription}:
                            </span>
                            <span className="fw-bold">
                              ${additionalChargesPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <Root>
                          <Divider className=" text-muted fs-6">
                            Tax Details
                          </Divider>
                        </Root>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <LabelIcon color="primary" className="mx-2" />
                            {taxDescription}:
                          </span>
                          <span className="fw-bold">${taxPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row mt-4 p-4 rounded-1"
                      style={{ backgroundColor: "#ebf3ff" }}
                    >
                      <div className="col-md-12">
                        <div className="border-bottom pb-2">
                          <div className="d-flex justify-content-between align-items-center text-white p-2">
                            <h5 className="text-dark fw-bold fs-2">
                              Total Price
                            </h5>
                            <div>
                              <span className="fw-bold ms-1 text-dark fs-4">
                                PKR $
                                {booked_property.parking_price
                                  ? booked_property.Total_Price +
                                    220 +
                                    booked_property.parking_price * c
                                  : booked_property.Total_Price + 220}
                                {booked_property.StandardPrice && (
                                  <small>
                                    Total Price = $
                                    {booked_property.StandardPrice + 220}
                                  </small>
                                )}
                              </span>
                              <br />
                              <small className="text-dark ms-1">
                                +PKR ${taxPrice + additionalChargesPrice} taxes
                                and charges
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <button
                            className="btn mt-3 btn-primary btn-sm fw-bold text-light fs-6 "
                            onClick={HandleBooking}
                          >
                            Book For PKR
                            {booked_property.parking_price
                              ? booked_property.Total_Price +
                                220 +
                                booked_property.parking_price * c
                              : booked_property.Total_Price + 220}
                            {booked_property.StandardPrice && (
                              <small>
                                Total Price = $
                                {booked_property.StandardPrice + 220}
                              </small>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewBookings;
