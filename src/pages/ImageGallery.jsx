import { Grid} from "@mui/material";
import React from "react";
import { bookings } from "../data/dummy";

export const ImageGallery = () => {
  return (
		<Grid container spacing={0}>
			{bookings?.map((booking, index) => (
				<Grid key={index.id} xs={12} md={4}>
					<img
						src={booking.image}
            alt={ `Hostel ${index + 1}` }
            className="p-4"
						style={{
							width: "auto",
              height: "100%",
              
						}}
					/>
				</Grid>
			))}
		</Grid>
	);
};
