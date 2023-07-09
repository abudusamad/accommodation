import { Box } from "@mui/material";
import HostelList from "../../components/HostelCard";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";
import { useState } from "react";

const Dashboard = () => {
		const {  isLoading } = useState("")

		return isLoading ? (
			<LoadingSkeleton />
		) : (
				<Box margin='20px'>
					<HostelList/>
			</Box>
		);
};

export default Dashboard;
