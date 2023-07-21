
import "./Recommended.css";
import Button from "../../components/Button";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";


const Recommended = ({ handleClick }) => {
  const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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
					<Button onClickHandler={handleClick} value="Filter" title="Filter" />
				</Box>
			</div>
		</>
	);
};

export default Recommended;
