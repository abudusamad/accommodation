import {
	Box,
	Button,
	CardContent,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

import { BookingModal } from "../components/BookingModal";
import { bookings } from "../data/dummy";

export const ImageGallery = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	return (
		<>
			<Grid container spacing={0}>
				{bookings?.map((booking, index) => (
					<Grid key={index.id} xs={12} md={4}>
						<img
							src={booking.image}
							alt={`Hostel ${index + 1}`}
							className="p-4"
							style={{
								width: "auto",
								height: "100%",
							}}
						/>
					</Grid>
				))}
			</Grid>
			<Container
				maxWidth={"lg"}
				sx={{
					marginTop: 2,
				}}
			>
				<Box sx={{ marginTop: 2, display:"flex", justifyContent:"space-between" }}>
					<Typography variant="h5">What this place offers!!</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "sace-between",
							alignItems: "center",
						}}
					>
						<CardContent>
							<Button onClick={handleOpen} variant="outlined">
								Reserve
							</Button>
						</CardContent>
					</Box>
					<BookingModal open={open} handleClose={handleClose} />
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
			</Container>
		</>
	);
};
