import React, { useState } from "react";
import "./book.css";

const RoomBooking = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [checkInDate, setCheckInDate] = useState("2023-4-24");
  const [checkOutDate, setCheckOutDate] = useState("2023-4-28");
  const [parkingName, setParkingName] = useState("Delhi Parking");
  const [totalSlotsBooked, setTotalSlotsBooked] = useState(3);
  const [totalPrice, setTotalPrice] = useState(1200);
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState([]);

  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    const room = rooms.find((r) => r.room._id === roomId);
    setSelectedRoom(room);
    setSelectedRoomNumber(null);
  };

  const handleRoomNumberChange = (event) => {
    setSelectedRoomNumbers((prevSelectedRoomNumbers) => {
      const roomNumber = event.target.value;
      if (prevSelectedRoomNumbers.includes(roomNumber)) {
        return prevSelectedRoomNumbers.filter((num) => num !== roomNumber);
      } else {
        return [...prevSelectedRoomNumbers, roomNumber];
      }
    });
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRoomNumbers([...selectedRoomNumbers, value]);
    } else {
      setSelectedRoomNumbers(
        selectedRoomNumbers.filter((roomNumber) => roomNumber !== value)
      );
    }
  };


  const handleParkingNameChange = (e) => {
    setParkingName(e.target.value);
  };

  const handleTotalSlotsBookedChange = (e) => {
    setTotalSlotsBooked(parseInt(e.target.value));
  };

  const handleTotalPriceChange = (e) => {
    setTotalPrice(parseInt(e.target.value));
  };

  return (
    <div className="card p-3">
      <h2 className="card-title">Rooms</h2>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="roomSelect">Select Room Type:</label>
          <select
            id="roomSelect"
            className="form-control"
            onChange={handleRoomChange}
          >
            <option value="">Choose Room Type</option>
            {rooms.map((room) => (
              <option key={room.room._id} value={room.room._id}>
                {room.room.type}
              </option>
            ))}
          </select>
        </div>
        
        {selectedRoom && (
          <div className="selected-room-container">
            <h3>{selectedRoom.room.type}</h3>
            <ul>
              {selectedRoom.room.room_no.map((room) => (
                <li key={room.number}>
                  <label>
                    <input
                      type="checkbox"
                      name="roomNumber"
                      //   value={room.number}
                      value={selectedRoomNumbers}
                      checked={selectedRoomNumbers.includes(room.number)}
                      onChange={handleRoomNumberChange}
                    />
                    Room No {room.number}{" "}
                    {room.available ? (
                      <span className="text-success">Available</span>
                    ) : (
                      <span className="text-danger">Not Available</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <label htmlFor="checkInDate">Check In:</label>
              <p className="form-control-static">{checkInDate}</p>
            </div>
            <div className="col-6">
              <label htmlFor="checkOutDate">Check Out:</label>
              <p className="form-control-static">{checkOutDate}</p>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="parkingName">Parking Name:</label>
          <input
            type="text"
            id="parkingName"
            className="form-control"
            value={parkingName}
            // onChange={handleParkingNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalSlotsBooked">Total Slots Booked:</label>
          <input
            type="number"
            id="totalSlotsBooked"
            className="form-control"
            value={totalSlotsBooked}
            // onChange={handleTotalSlotsBookedChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Total Price:</label>
          <input
            type="number"
            id="totalPrice"
            className="form-control"
            value={totalPrice}
            // onChange={handleTotalPriceChange}
          />
        </div>
        <button className="btn btn-primary">Book Room</button>
      </div>
    </div>
  );
};

export default RoomBooking;
