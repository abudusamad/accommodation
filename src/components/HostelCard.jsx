import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { hostels } from "../data/dummy";
import Recommended from "../pages/Recommended/Recommended";
import { tokens } from "../theme";
const HeartIcon = styled.span`
	color: ${(props) => (props.liked ? "red" : "gray")};
`;

const HostelList = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [likedItems, setLikedItems] = useState([]);
	const [query, setQuery] = useState("");
	const [filteredData, setFilteredData] = useState(hostels);
	const [liked, setLiked] = useState(false);
	const handleLike = (index) => {
		const isLiked = likedItems.includes(index);
		setLiked(!liked);

		if (isLiked) {
			const updatedItems = likedItems.filter((id) => id !== index);
			setLikedItems(updatedItems);
		} else {
			const updatedItems = [...likedItems, index];
			setLikedItems(updatedItems);
		}
	};
	const navigate = useNavigate();
	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		setQuery(inputValue);

		if (inputValue === "") {
			setFilteredData(hostels); // Reset to original data when input is empty
		} else {
			const filteredResults = hostels.filter(
				(item) =>
					item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
					item.address.toLowerCase().includes(inputValue.toLowerCase()) ||
					item.namLoc.toLowerCase().includes(inputValue.toLowerCase())
			);
			setFilteredData(filteredResults);
		}
	};

	return (
		<div>
			<Box
				className="my-4 w-52 relative left-0 "
				flex
				justifyContent="space-between"
			>
				<Box
					display="flex"
					backgroundColor={colors.primary[400]}
					borderRadius="3px"
					marginLeft="10px"
				>
					<InputBase
						sx={{ ml: 2, flex: 1, width: "75%" }}
						placeholder="Search"
						value={query}
						onChange={handleInputChange}
					/>
					<IconButton type="button" sx={{ p: 1 }}>
						<SearchIcon />
					</IconButton>
				</Box>
			</Box>
			<Box className="absolute top-10  left-56">
				<Recommended />
			</Box>

			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1}>
					{(hostels, filteredData).map((hostel, index) => (
						<Grid
							xs={12}
							md={3}
							className="mx-3 my-5 rounded-2xl  shadow-2xl px-3"
							sx={{ backgroundColor: colors.primary[400] }}
						>
							<img
								src={hostel.image}
								alt={`Hostel ${index + 1}`}
								style={{
									width: "auto",
									height: "auto",
								}}
								key={hostel.id}
							/>

							<Box display="flex" flexDirection="column">
								<Typography
									variant="body1"
									color={colors.greenAccent[200]}
									fontWeight="bold"
									className="pt-2 pb-2 pl-3 capitalize"
								>
									{hostel.name}
								</Typography>
								<Typography variant="body1" className="pl-3">
									{hostel.address}
								</Typography>
								<Box
									display="flex"
									alignhostel="center"
									color={colors.grey[100]}
									fontWeight="bold"
									fontSize="0.654rem"
									textOverflow="none"
									overflow="none"
									onClick={() => navigate("/hostels")}
								>
									<IconButton>{hostel.likes} </IconButton>
									<IconButton>{hostel.likes}</IconButton>
									<IconButton>{hostel.likes}</IconButton>
									<IconButton>{hostel.likes}</IconButton>
									<IconButton>{hostel.dislikes}</IconButton>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="center"
										fontSize="0.654rem"
										flexWrap="wrap"
										overflow="none"
										textOverflow="none"
										className="md:overflow-hidden"
									>
										<span>{hostel.rating}</span>
										<Typography variant="body2" sx={{ paddingLeft: "0.2rem" }}>
											{hostel.reviews}
										</Typography>
									</Box>
								</Box>
								<Box display="flex">
									<Box>
										<Tooltip title={hostel.namLoc}>
											<IconButton>{hostel.location}</IconButton>
										</Tooltip>
									</Box>
									<Box fontSize="0.652rem">
										<Tooltip title={hostel.number}>
											<IconButton>{hostel.bed}</IconButton>
										</Tooltip>
									</Box>
									<Box>
										<Tooltip title={hostel.available}>
											<IconButton>{hostel.wifi}</IconButton>
										</Tooltip>
									</Box>
									<Box className="flex ">
										<IconButton
											onClick={() => handleLike(index)}
											className="text-xl"
										>
											<HeartIcon liked={likedItems.includes(index)}>
												&#9829;
											</HeartIcon>
										</IconButton>
										<Typography
											color={colors.grey[100]}
											fontWeight="bold"
											margin=" 0 5px"
											fontSize=".752rem"
											className="pt-3"
										>
											{hostel.price}
										</Typography>
									</Box>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
};

export default HostelList;
