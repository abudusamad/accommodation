import {
	Box,
	Button,
	CardContent,
	Container,
	Grid,
	ListItem,
} from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getHotelBySlug } from "../api/request";
import { BookingModal } from "../components/BookingModal";
import { bookings } from "../data/dummy";

export default function HotelInfo() {
	const [open, setOpen] = useState(false);

	const params = useParams();
	const { slug } = params;

	const fetchHoteInfo = async () => {
		const { data } = await getHotelBySlug(slug);
		return data;
	};

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const { data } = useQuery("hotel-info", fetchHoteInfo);

	return (
		<Box display="none" flexDirection="column">
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
				<Box sx={{ flex: 1 }}>
					{data?.features.map((feature) => (
						<ListItem key={feature.id}>{feature.text}</ListItem>
					))}
				</Box>

				<CardContent>
					<Button onClick={handleOpen} variant="outlined">
						Reserve
					</Button>
				</CardContent>
			</Container>
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
}
