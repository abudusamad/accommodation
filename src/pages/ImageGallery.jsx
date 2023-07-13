import {
	Box,
	Button,
	CardContent,
	Container,
	Grid,
	ListItem,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BookingModal } from "../components/BookingModal";
import { getHotelBySlug } from "../components/api/request";
import { bookings } from "../data/dummy";

export const ImageGallery = () => {
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
				<Typography fontSize={22} sx={{ lineHeight: 1.9, marginBottom: 3 }}>
					{data?.name}
				</Typography>
				<ImageGallery images={data?.images} />

				<Box
					sx={{ display: "flex", marginTop: 2, gap: "0 12px", color: "gray" }}
				>
					{data?.rooms.map((room) => (
						<Typography key={room.id} variant="caption">
							{room.content}
						</Typography>
					))}
				</Box>
				<Typography variant="subtitle1" sx={{ marginTop: 2 }}>
					{data?.aboutThePlace}
				</Typography>
				<Box sx={{ marginTop: 2 }}>
					<Typography variant="h5">What this place offers!!</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "sace-between",
							alignItems: "center",
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
					</Box>
				</Box>
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
		</>
	);
};
