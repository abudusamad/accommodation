import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Typography,
} from "@mui/material";
import { getDate } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; //
import "react-date-range/dist/theme/default.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { bookModalStyle } from "../helper/styles";
import { db, useAuth } from "../lib/firebase";

export const BookingModal = ({ open, handleClose, imageGallery }) => {
	const  currentUser  = useAuth();
	const navigate = useNavigate();
	const [guests, setGuests] = useState();
	const [selectedGuestCount, setSelectedGuestCount] = useState(1);
	const [dates, setDates] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: "selection",
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (event) => {
		setSelectedGuestCount(event.target.value);
	};

	function numberOfGuests(maxGuest) {
		const guestsArr = [];

		for (let i = 1; i <= maxGuest; i++) {
			guestsArr.push(i);
		}
		return guestsArr;
	}

	useEffect(() => {
		setGuests(numberOfGuests(imageGallery?.rooms[0]?.content?.split(" ")[0]));
	}, [imageGallery]);

	function getTotalNightsBooked() {
		const startDate = getDate(dates[0].startDate);
		const endDate = getDate(dates[0].endDate);
		const totalnightsBooked = endDate - startDate;
		return totalnightsBooked;
	}

	getTotalNightsBooked();

	const bookings = collection(db, "bookings");

	const handleReserve = async () => {
		setIsLoading(true);
		const { uid, displayName } = currentUser;
		await addDoc(bookings, {
			hotelAddress: imageGallery.address,
			hotelName: imageGallery.name,
			numberOfGuests: selectedGuestCount,
			bookingStartDate: `${dates[0].startDate}`,
			bookingEndDate: `${dates[0].endDate}`,
			price: imageGallery?.pricePerNight * getTotalNightsBooked(),
			bookedBy: {
				uid,
				displayName,
			},
		})
			.then(() => {
				toast.success("booking successfull");
				handleClose();
				navigate("/my-profile");
				setIsLoading(false);
			})
			.catch((error) => {
				toast.error(error);
				setIsLoading(false);
			});
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={bookModalStyle}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					${imageGallery?.pricePerNight} /night
				</Typography>
				<FormControl fullWidth sx={{ marginTop: 3 }}>
					<InputLabel id="demo-simple-select-label">
						Number of Guests
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={selectedGuestCount}
						label="Number of Adults"
						onChange={handleChange}
					>
						{guests?.map((guest) => (
							<MenuItem key={guest} value={guest}>
								{guest}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<InputLabel>Select Dates</InputLabel>
				<DateRange
					className="date-range"
					editableDateInputs={true}
					onChange={(item) => setDates([item.selection])}
					moveRangeOnFirstSelection={false}
					ranges={dates}
					minDate={new Date()}
				/>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginY: 2,
					}}
				>
					<Typography
						fontSize={17}
						fontWeight={"bold"}
						component="p"
						variant="h6"
					>
						${imageGallery?.pricePerNight} x{" "}
						{dates[0]?.endDate ? getTotalNightsBooked() : 0} nights
					</Typography>

					<Typography
						fontSize={17}
						fontWeight={"bold"}
						component="p"
						variant="h6"
					>
						$
						{dates[0]?.endDate
							? imageGallery?.pricePerNight * getTotalNightsBooked()
							: 0}
					</Typography>
				</Box>
				<Typography
					fontSize={20}
					fontWeight={"bold"}
					component="p"
					variant="h6"
				>
					Subtotal: $
					{dates[0]?.endDate
						? imageGallery?.pricePerNight * getTotalNightsBooked()
						: 0}
				</Typography>
				<Button
					onClick={handleReserve}
					sx={{ width: "100%", marginTop: 2 }}
					variant="outlined"
					color="primary"
					disabled={!dates[0].endDate}
				>
					{isLoading ? (
						<LoadingSpinner color={"primary"} size={20} />
					) : (
						"Reserve"
					)}
				</Button>
			</Box>
		</Modal>
	);
};
