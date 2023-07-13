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
			
		</Box>
	);
}
