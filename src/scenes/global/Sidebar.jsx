import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { tokens } from "../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Dashboard");
	const { activeMenu, setActiveMenu, screenSize } = useStateContext();

	const handleCloseSideBar = () => {
		if (activeMenu !== undefined && screenSize <= 900) {
			setActiveMenu(false);
		}
	};

	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.primary[400]} !important`,
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
				},
				"& .pro-inner-item:hover": {
					color: "#70d8bd !important",
				},
				"& .pro-menu-item.active": {
					color: "#70d8bd !important",
				},
			}}
			style={{ height: "150vh" }}
		>
			{activeMenu && (
				<>
					<ProSidebar collapsed={isCollapsed}>
						<Menu iconShape="square" className="fixed left-0 top-0">
							{/* LOGO AND MENU ICON */}
							<MenuItem
								onClick={() => setIsCollapsed(!isCollapsed)}
								icon={
									isCollapsed ? (
										<p
											className="text-3xl
										 "
										>
											HnH
										</p>
									) : undefined
								}
								style={{
									margin: "5px 0 5px 0",
									color: colors.grey[100],
								}}
							></MenuItem>
							<Box
								paddingLeft={isCollapsed ? undefined : "10%"}
								onClick={handleCloseSideBar}
							>
								<Item
									title="Dashboard"
									to="/dashboard"
									icon={
										<Tooltip title="Dashboard">
											<HomeOutlinedIcon />
										</Tooltip>
									}
									selected={selected}
									setSelected={setSelected}
								/>

								<Typography
									variant="h6"
									color={colors.grey[300]}
									sx={{ m: "15px 0 5px 20px" }}
								>
									Data
								</Typography>
								<Item
									title="Manage Team"
									to="/team"
									icon={<PeopleOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Contacts Information"
									to="/contacts"
									icon={<ContactsOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Invoices Balances"
									to="/invoices"
									icon={<ReceiptOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>

								<Typography
									variant="h6"
									color={colors.grey[300]}
									sx={{ m: "15px 0 5px 20px" }}
								>
									Pages
								</Typography>
								<Item
									title="Calendar"
									to="/calendar"
									icon={<CalendarTodayOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="FAQ Page"
									to="/faq"
									icon={<HelpOutlineOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>

								<Typography
									variant="h6"
									color={colors.grey[300]}
									sx={{ m: "15px 0 5px 20px" }}
								>
									Charts
								</Typography>
								<Item
									title="Bar Chart"
									to="/bar"
									icon={<BarChartOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Pie Chart"
									to="/pie"
									icon={<PieChartOutlineOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Line Chart"
									to="/line"
									icon={<TimelineOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Map"
									to="/geography"
									icon={<MapOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Box position="relative" top="2rem">
									<Item
										title="Log In"
										to="/"
										icon={<LogoutOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
							</Box>
						</Menu>
					</ProSidebar>
				</>
			)}
		</Box>
	);
};

export default Sidebar;
