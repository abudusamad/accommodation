import { Box, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import Buttons from "../../components/Button";
import { tokens } from "../../theme";
import Filter from "../filter/Filter";
import "./Recommended.css";
import HostelList from "../../components/HostelCard";

const Recommended = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [open, setOpen] = useState(false);

	const filtering = async () => {
		return data;
	};

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const { data } = useQuery("filer", filtering);
	  const [selectedCategory, setSelectedCategory] = useState(null);

	

		// ----------- Radio Filtering -----------
		const handleChange = (event) => {
			setSelectedCategory(event.target.value);
		};

		// ------------ Button Filtering -----------
		const handleClick = (event) => {
			setSelectedCategory(event.target.value);
		};

		function filteredData(products, selected, query) {
			let filteredProducts = products;


			// Applying selected filter
			if (selected) {
				filteredProducts = filteredProducts.filter(
					({ category, company, newPrice, title }) =>
						category === selected ||
						company === selected ||
						newPrice === selected ||
						title === selected
				);
			}

			// return filteredProducts.map(
			// 	({ img, title, star, reviews, prevPrice, newPrice }) => (
			// 		<hostel
			// 			key={Math.random()}
			// 			img={img}
			// 			title={title}
			// 			star={star}
			// 			reviews={reviews}
			// 			prevPrice={prevPrice}
			// 			newPrice={newPrice}
			// 		/>
			// 	)
			// );
		}

		const result = filteredData( selectedCategory);
	 
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
