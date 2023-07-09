import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { hostels } from "../data/dummy";
import { tokens } from "../theme";
import axios from "axios";

const HostelList = ({ reserve }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [likedItems, setLikedItems] = useState([]);
	const [query, setQuery] = useState("");
	const [data, setData] = useState([]);

	const handleLike = (index) => {
		const isLiked = likedItems.includes(index);

		if (isLiked) {
			const updatedItems = likedItems.filter((id) => id !== index);
			setLikedItems(updatedItems);
		} else {
			const updatedItems = [...likedItems, index];
			setLikedItems(updatedItems);
		}
	};
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get(`http://localhost:ReacApp?q=${query}`);
			setData(res.data);
		};
		if (query.length === 0 || query.length > 2) fetchData();
	}, [query]);


	return (
		<div>
			<Box className="my-4 w-52 relative left-0 ">
				<Box
					display="flex"
					backgroundColor={colors.primary[400]}
					borderRadius="3px"
					marginLeft="10px"
				>
					<InputBase
						sx={{ ml: 2, flex: 1, width: "75%" }}
						placeholder="Search"
						onChange={(e) => setQuery(e.target.value.toLowerCase())}
					/>
					<IconButton type="button" sx={{ p: 1 }}>
						<SearchIcon />
					</IconButton>
				</Box>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1}>
					{hostels?.map((hostel, index) => (
						<Grid
							key={index}
							xs={12}
							md={3}
							className="mx-3 my-5 rounded-2xl  shadow-2xl"
							sx={{ backgroundColor: colors.primary[400] }}
						>
							<img
								src={hostel.image}
								alt={`Hostel ${index + 1}`}
								style={{
									width: "auto",
									height: "60%",
								}}
								onClick={() => navigate("/reserve")}
								data={data}
							/>
							<Box display="flex" flexDirection="column">
								<Typography
									variant="h2 "
									color={colors.greenAccent[200]}
									fontWeight="bold"
									className="pt-2 pb-2 pl-3 uppercase"
								>
									{hostel.name}
								</Typography>
								<Typography variant="h5" className="pl-3">
									{hostel.address}
								</Typography>
								<Box
									display="flex"
									alignhostel="center"
									color={colors.grey[100]}
									fontWeight="bold"
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
									>
										<span>{hostel.rating}</span>
										<Typography variant="h6" sx={{ paddingLeft: "4px" }}>
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
									<Box>
										<Tooltip title={hostel.number}>
											<IconButton>{hostel.bed}</IconButton>
										</Tooltip>
									</Box>
									<Box>
										<Tooltip title={hostel.available}>
											<IconButton>{hostel.wifi}</IconButton>
										</Tooltip>
									</Box>
									<Box className="flex">
										<button
											onClick={() => handleLike(index)}
											className={likedItems.includes(index) ? "Liked" : ""}
										>
											{likedItems.includes(index) ? "Liked" : "like"}
											<IconButton>{hostel.favourite}</IconButton>
										</button>
										<Box
											display="flex"
											color={colors.grey[100]}
											className="pt-2"
										>
											<Typography
												variant="h5"
												color={colors.grey[100]}
												fontWeight="bold"
												margin=" 0 5px"
											>
												{hostel.price}
											</Typography>
											<span>AUD Total</span>
										</Box>
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
