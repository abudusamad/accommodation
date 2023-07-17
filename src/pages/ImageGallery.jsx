import {
	Box,
	Button,
	CardContent,
	Grid,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { BookingModal } from "../components/BookingModal";
import { bookings } from "../data/dummy";
import { tokens } from "../theme";

export const ImageGallery = ({ images }) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const fetchHoteInfo = async () => {
		return data;
	};

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const { data } = useQuery("hotel-info", fetchHoteInfo);
	return (
		<Box width="98%">
			<Grid container spacing={0}>
				{bookings?.map((Booking, index) => (
					<Grid key={index.id} md={4} xs={12}>
						<img
							src={Booking.image}
							alt={`Hostel ${Booking + 1}`}
							style={{
								width: "auto",
								height: "98%",
							}}
							className="p-3"
							sx={{backgroundColor:colors.grey[400]}}
						/>
						
					</Grid>
				))}
			</Grid>
			<Box sx={{ marginTop: 2 }} paddingLeft="10px">
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5">What this place offers!!</Typography>

					<CardContent>
						<Button
							onClick={handleOpen}
							variant="outlined"
							className="hover:bg-white"
							sx={{ backgroundColor: "white" }}
						>
							Reserve
						</Button>
					</CardContent>
				</Box>
			</Box>
			<BookingModal hotelInfo={data} open={open} handleClose={handleClose} />

			<Toaster
				position="top-right"
				toastOptions={{
					duration: 1500,
					style: {
						fontSize: 14,
					},
				}}
			/>
		</Box>
	);
};
