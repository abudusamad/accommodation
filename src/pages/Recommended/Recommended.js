import { Box, useTheme} from "@mui/material";
import Button from "../../components/Button";
import { tokens } from "../../theme";
import "./Recommended.css";
import { useState } from "react";
import { useQuery } from "react-query";
import Filter from "../filter/Filter";

const Recommended = ({ handleClick }) => {
	const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);


	const fetchHoteInfo = async () => {
		return data;
	};

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const { data } = useQuery("hotel-info", fetchHoteInfo);
	return (
		<>
			<div>
				<h2 className="recommended-title">Recommended</h2>
				<Box className="recommended-flex" backgroundColor={colors.primary[400]}>
					<Button
						onClickHandler={handleClick}
						value=""
						title="Hostel & Homestel"
					/>
					<Button onClickHandler={handleClick} value="Hostel" title="Hostel" />
					<Button
						onClickHandler={handleClick}
						value="Homestel"
						title="Homestel"
					/>
					<Button
						onClick={handleOpen}
						variant="outlined"
						className="hover:bg-white"
						sx={{ backgroundColor: "white" }}
						title="Filter"
					/>
				</Box>
				<Filter hotelInfo={data} open={open} handleClose={handleClose} />
			</div>
		</>
	);
};

export default Recommended;
