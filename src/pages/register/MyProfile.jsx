import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { upload, useAuth } from "../../lib/firebase";
// import {
// 	formatDistance,
// 	formatDistanceToNow,
// 	formatISO,
// 	getDate,
// 	getDay,
// } from "date-fns";

function createData(
	HotelName,
	HotelAddress,
	NumberOfGuests,
	BookingDate,
	ExpireDate,
	Price
) {
	return {
		HotelName,
		HotelAddress,
		NumberOfGuests,
		BookingDate,
		ExpireDate,
		Price,
	};
}

const rows = [
	createData("Hotel Name", "Oyo", "Allahabad", "1/1/2023", "11/1/2023", 2, 256),
];

export default function MyProfile() {
	// const { currentUser } = useContext(AuthContext);
	const [bookings] = useState([]);
  const currentUser = useAuth();
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photoURL, setPhotoURL] = useState(
		"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
	);

	function handleChange(e) {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	}

	function handleClick() {
		upload(photo, currentUser, setLoading);
	}

	useEffect(() => {
		if (currentUser?.photoURL) {
			setPhotoURL(currentUser.photoURL);
		}
	}, [currentUser]);


	return (
		<>
			<Container maxWidth={"lg"}>
				<Box
					sx={{
						marginTop: 3,
						display: "flex",
						alignItems: "center",
						gap: "0 14px",
					}}
				>
					<img
						style={{
							borderRadius: "100%",
							width: 60,
							height: 60,
							objectFit: "cover",
						}}
						src={currentUser?.photoURL}
						alt={currentUser?.displayName}
					/>
					<Typography variant={"h6"}>{currentUser?.displayName}</Typography>
					<div className="fields">
						<input type="file" onChange={handleChange} />
						<button disabled={loading || !photo} onClick={handleClick}>
							Upload
						</button>
					</div>
				</Box>
				<Typography marginTop={3} fontWeight={"bold"} variant={"h6"}>
					Booking History
				</Typography>
				<TableContainer component={Paper} sx={{ marginTop: 3 }}>
					<Table sx={{ width: "100%" }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Hostel Name</TableCell>
								<TableCell align="right">Hostel Address</TableCell>
								<TableCell align="right">Check In</TableCell>
								<TableCell align="right">Check Out</TableCell>
								<TableCell align="right">Number of Student</TableCell>
								<TableCell align="right">Gender</TableCell>
								<TableCell align="right">Price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bookings.map((row, index) => (
								<TableRow
									key={index}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row?.data?.hotelName}
									</TableCell>
									<TableCell align="right">{row?.data?.hotelAddress}</TableCell>
									<TableCell align="right">
										{row?.data?.bookingStartDate
											.split(" ")
											.slice(0, 4)
											.join(" ")}
									</TableCell>
									<TableCell align="right">
										{row?.data?.bookingEndDate.split(" ").slice(0, 4).join(" ")}
									</TableCell>
									<TableCell align="right">
										{row?.data?.numberOfGuests}
									</TableCell>
									<TableCell align="right">${row?.data?.price}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
}
