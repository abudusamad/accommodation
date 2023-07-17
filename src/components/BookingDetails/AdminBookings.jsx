import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/SideBar";

const ViewBookings = () => {
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

  const { cardData } = useSelector((state) => state.setCardData);
  const Location = useLocation();
  const { data, path, user } = Location.state;

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  // This Page Data

  // Hotel data,parking data, hotelandparking data
  const [datafromId, setDatafromId] = useState({});
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const FetchDatafromId = async () => {
    let url = "";
    if (data) {
      if (data.Booking_type === "hotel") {
        url = `${api}/hotels/gethotelbyid/${data.hotelData._id}`;
        const response = await axios.get(url);

        setDatafromId(response.data);
      } else if (data.Booking_type === "hotelandparking") {
        url = `${api}/hotelandparking/gethotelandparkingById/${data.HotelAndParkingId}`;
        const response = await axios.get(url);
        setDatafromId(response.data);
      } else {
        url = `${api}/parking/getParkingById/${data.parkingData._id}`;
        const response = await axios.get(url);
        setDatafromId(response.data);
      }
    }
  };

  let cardPicture = "";

  if (data.Booking_type === "hotel") {
    if (
      (data.hotelData.photos && data.hotelData.photos.length !== 0) ||
      (data.hotelData.hotel_photos && data.hotelData.photos.length !== 0)
    ) {
      cardPicture = data.hotelData.photos[0];
    }
  } else if (data.Booking_type === "parking") {
    if (data.parkingData.photos && data.parkingData.photos.length !== 0) {
      cardPicture = data.parkingData.photos[0];
    }
  }

  useEffect(() => {
    FetchDatafromId();
  }, []);

  const startDateObject = new Date(data.checkIn);
  const endDateObject = new Date(data.checkOut);

  let Nights = 0;
  const timeDiff = Math.abs(
    startDateObject.getTime() - endDateObject.getTime()
  );
  Nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const startDateString = startDateObject
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);
  const endDateString = endDateObject
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);

  const startDate = startDateString.split(" ")[0];
  const startTime = startDateString.split(" ")[1];
  const endDate = endDateString.split(" ")[0];
  const endTime = endDateString.split(" ")[1];

  let totalSingle = 0;
  let totalTwin = 0;
  let totalFamily = 0;
  let singleRoomsArray = [];
  let twinRoomsArray = [];
  let familyRoomsArray = [];

  data.room.forEach((room) => {
    if (room.Room_type === "Single") {
      totalSingle++;
      singleRoomsArray.push(room.Room_no);
    } else if (room.Room_type === "Twin") {
      totalTwin++;
      twinRoomsArray.push(room.Room_no);
    } else {
      totalFamily++;
      familyRoomsArray.push(room.Room_no);
    }
  });

  let roomDetails = {
    totalSingle: totalSingle,
    singleRoomsArray: singleRoomsArray,
    totalTwin: totalTwin,
    twinRoomsArray: twinRoomsArray,
    totalFamily: totalFamily,
    familyRoomsArray: familyRoomsArray,
  };

  const [loading, setLoading] = useState(true);

  if (data.Booking_type === "hotel") {
    if (!data.hotelData) {
      setLoading(true);
    }
  } else if (data.Booking_type === "parking") {
    if (!data.parkingData) {
      setLoading(true);
    }
  }
  useEffect(() => {
    if (data.parkingData) {
      setLoading(false);
    }
  }, [data.parkingData]);

  const showFacilities = (param) => {
    return (
      <>
        <div className="mt-1 mb-0 text-muted" style={{ fontSize: "12px" }}>
          {param.Facilities.length > 0 && (
            <>
              {param.Facilities.slice(3, 7).map((facility, index) => (
                <React.Fragment key={index}>
                  <span>{facility}</span>
                  {index !== param.Facilities.slice(3, 7).length - 1 && (
                    <span className="text-primary"> • </span>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          <br />
        </div>
        <div className="mb-1 text-muted small" style={{ fontSize: "12px" }}>
          {param.Facilities.length > 0 && (
            <>
              {param.Facilities.slice(0, 3).map((facility, index) => (
                <React.Fragment key={index}>
                  <span>{facility}</span>
                  {index !== param.Facilities.slice(0, 3).length - 1 && (
                    <span className="text-primary"> • </span>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          <br />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="py-2">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <h1 className="mb-3 card-title fw-bold bg-info rounded-3 p-3 text-dark">
                        Your Booking Details
                      </h1>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between ">
                        <div className="d-flex my-1">
                          <i className="fas fa-calendar-alt mt-1"></i>
                          <span className="mx-1 ">{startDate}</span>
                        </div>
                        <div className="d-flex my-1">
                          <i className="fas fa-calendar-alt mt-1"></i>
                          <span className="mx-1 ">{endDate}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <i className="fas fa-moon"></i>
                        <span>{Nights ? `${Nights} Nights` : ""} </span>
                      </div>
                      {data.Booking_type === "hotel" ||
                      data.Booking_type === "hotelandparking" ? (
                        <div className="d-flex justify-content-between my-1">
                          <i className="fas fa-users"></i>
                          <span>
                            {data.bookingData.persons
                              ? `${data.bookingData.persons.adults} Adults`
                              : ""}
                            {data.bookingData.persons
                              ? `,${data.bookingData.persons.children} Child`
                              : ""}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <hr />
                    <div>
                      {(data.Booking_type === "hotel" ||
                        data.Booking_type === "hotelandparking") && (
                        <>
                          <small className="fw-bold text-dark">
                            Rooms Details:
                          </small>
                          <div className="text-muted small">
                            {roomDetails.totalSingle > 0 && (
                              <div>
                                {roomDetails.totalSingle}x Single Room : Room
                                Numbers:{" "}
                                {roomDetails.singleRoomsArray.join(", ")}
                              </div>
                            )}
                            {roomDetails.totalTwin > 0 && (
                              <div>
                                {roomDetails.totalTwin}x Twin Room : Room
                                Numbers: {roomDetails.twinRoomsArray.join(", ")}
                              </div>
                            )}
                            {roomDetails.totalFamily > 0 ? (
                              <div>
                                {roomDetails.totalFamily}x Family Room : Room
                                Numbers:{" "}
                                {roomDetails.familyRoomsArray.join(", ")}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      )}
                      {data.parkingData && (
                        <>
                          <small className="fw-bold text-dark">
                            Parking Details:
                          </small>
                          <div className="text-muted flex-row justify-content-between">
                            {data.bookingData.parking.Total_slots > 0 && (
                              <>
                                <div className="d-flex justify-content-between">
                                  <h5>Total Slots</h5>
                                  <span>
                                    {data.bookingData.parking.Total_slots}
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h5>Total Price</h5>
                                  <span>
                                    {data.bookingData.parking.Parking_price}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="py-2 d-flex flex-column">
                <div className="justify-content-center">
                  <div className="card shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row text-center">
                        <h1 className="mb-3 fw-bold d-inline bg-info rounded-3 p-3 text-dark">
                          {data.Booking_type === "hotel"
                            ? "Hotel"
                            : data.Booking_type === "parking"
                            ? "Parking"
                            : data.Booking_type === "hotelandparking"
                            ? "Hotel And Parking"
                            : ""}
                          Details
                        </h1>
                      </div>
                      <div className="row">
                        <div className="col-md-3 col-xl-3 col-sm-12">
                          <div className="h-100 bg-image hover-zoom ripple rounded ripple-surface">
                            <img
                              src={cardPicture}
                              className=""
                              style={{
                                objectFit: "cover",
                                // imageRendering: "crisp-edges",
                              }}
                            />
                            <Link to="/">
                              <div className="hover-overlay">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor:
                                      "rgba(253, 253, 253, 0.15)",
                                  }}
                                ></div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-9 col-lg-9 col-xl-9">
                          <h5>
                            {data.Booking_type === "hotel"
                              ? data.hotelData.name
                              : data.Booking_type === "hotelandparking"
                              ? data.hotelAndParkingData.hotel_name
                              : data.Booking_type === "parking"
                              ? data.parkingData.name
                              : null}
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
                              value={
                                data.Booking_type === "hotel"
                                  ? data.hotelData.rating
                                  : data.Booking_type === "parking"
                                  ? data.parkingData.rating
                                  : data.Booking_type === "hotelandparking"
                                  ? data.hotelAndParkingData.hotel_rating
                                  : 5
                              }
                              precision={1}
                              getLabelText={getLabelText}
                              // onChange={(event, newValue) => {
                              //   setValue(newValue);
                              // }}
                              // onChangeActive={(event, newHover) => {
                              //   setHover(newHover);
                              // }}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                            {
                              <Box
                                className="ms-3"
                                sx={{ mb: 1, fontSize: 17 }}
                              >
                                {
                                  labels[
                                    data.Booking_type === "hotel"
                                      ? data.hotelData.rating
                                      : data.Booking_type === "parking"
                                      ? data.parkingData.rating
                                      : data.Booking_type === "hotelandparking"
                                      ? data.hotelAndParkingData.hotel_rating
                                      : 5
                                  ]
                                }
                              </Box>
                            }
                          </Box>

                          {data.Booking_type === "hotel" ? (
                            <>{showFacilities(data.hotelData)}</>
                          ) : data.Booking_type === "parking" ? (
                            <>{showFacilities(data.parkingData)}</>
                          ) : (
                            <>{showFacilities(data.hotelAndParkingData)}</>
                          )}

                          <p className="w-100">
                            {data.Booking_type === "hotel" &&
                              data.hotelData.description}
                            {data.Booking_type === "hotelandparking" &&
                              data.hotelAndParkingData.description}
                            {data.Booking_type === "parking" &&
                              data.parkingData.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="">
              <div className="py-2">
                <div className="justify-content-center">
                  <div className="card border rounded-3 shadow">
                    <div className="card-body">
                      <div className="text-center mb-4">
                        <span className="mb-0 fw-bold text-center fs-2 border-bottom border-dark text-dark">
                          Your Price Summary
                        </span>
                      </div>
                      {data.Booking_type === "hotel" ||
                      data.Booking_type === "hotelandparking" ? (
                        <div className="row">
                          <div className="col-md-12">
                            <h5>Room Booked</h5>
                            {roomDetails.totalSingle > 0 ? (
                              <div className="d-flex justify-content-between align-items-center">
                                <span>Single Room</span>
                                <span className="fw-bold">
                                  {`${roomDetails.totalSingle}x Single Room${
                                    roomDetails.totalSingle > 1 ? "s" : ""
                                  }`}
                                </span>
                              </div>
                            ) : null}{" "}
                            {roomDetails.totalTwin > 0 ? (
                              <div className="d-flex justify-content-between align-items-center ">
                                <span>Twin Room</span>
                                <span className="fw-bold">
                                  {`${roomDetails.totalTwin}x Twin Room${
                                    roomDetails.totalTwin > 1 ? "s" : ""
                                  } `}
                                </span>
                              </div>
                            ) : null}{" "}
                            {roomDetails.totalFamily > 0 ? (
                              <div className="d-flex justify-content-between align-items-center ">
                                <span>Family Room</span>
                                <span className="fw-bold">
                                  {`${roomDetails.totalFamily}x Family Room${
                                    roomDetails.totalFamily > 1 ? "s" : ""
                                  }`}
                                </span>
                              </div>
                            ) : null}{" "}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="row mt-3">
                            <div className="col-md-12">
                              <h5>Parking Details</h5>
                              <div className="d-flex justify-content-between align-items-center ">
                                <span>Total Slots Booked</span>
                                <span className="fw-bold">
                                  {`${
                                    data.bookingData.parking.Total_slots
                                  } Slot${
                                    data.bookingData.parking.Total_slots > 1
                                      ? "s"
                                      : ""
                                  }`}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center ">
                                <span>Parking price:</span>
                                <span className="fw-bold">
                                  {`${data.bookingData.parking.Parking_price} PKR`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}
                      <hr />

                      <div
                        className="row mt-4 p-4 rounded-1"
                        style={{ backgroundColor: "#ebf3ff" }}
                      >
                        <div className="col-md-12">
                          <span className="text-dark fw-bold fs-2 border-bottom border-dark fs-2">
                            Total Price{" "}
                          </span>
                          <div className="border-bottom pb-2">
                            <div className="d-flex justify-content-between align-items-center text-white p-2">
                              <div className="fw-bold fs-4 text-dark"></div>
                              <div>
                                <span className="fw-bold text-dark fs-3">
                                  PKR {data.total_price}
                                </span>
                                <br />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBookings;
