import { Box, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import Buttons from "../../components/Button";
import { tokens } from "../../theme";
import Filter from "../filter/Filter";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [open, setOpen] = useState(false);

	const filtering = async () => {
		return data;
	};

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const { data } = useQuery("filer", filtering);

	return (
		<>
			<div>
				<h2 className="recommended-title">Recommended</h2>
				<Box className="recommended-flex">
					<Buttons
						onClickHandler={handleClick}
						value=""
						title="Hostel & Homestel"
					/>
					<Buttons onClickHandler={handleClick} value="Hostel" title="Hostel" />
					<Buttons
						onClickHandler={handleClick}
						value="Homestel"
						title="Homestel"
					/>

					<Button
						onClick={handleOpen}
						variant="outlined"
						sx={{
							color: colors.grey[400],
							":hover": " background-color: rgb(218, 218, 218)",
						}}
					>
						Filter
					</Button>
				</Box>
			</div>
			<Filter Filter={data} open={open} handleClose={handleClose} />
		</>
	);
};

export default Recommended;
