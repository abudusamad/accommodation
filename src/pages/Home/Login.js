import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Container, Divider, Link, Typography } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "react-hot-toast";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import SocialAuth from "../../components/SocialAuth";
import { auth, db, provider } from "../../lib/firebase";
import { tokens } from "../../theme";

const HeadingStyle = styled(Box)({
	textAlign: "center",
});

const ContentStyle = styled("div")({
	maxWidth: 480,
	padding: 25,
	margin: "auto",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0,
		transition: { duration: 0.6, ease: easing },
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: easing,
		},
	},
};

const Login = ({ setAuth }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const handleLogin = async () => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const user = result.user;
				if (user) {
					await setDoc(doc(db, "users", user.uid), {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					});
				}
			})
			.catch((error) => {
				const errorMessage = error.message;

				toast.error(errorMessage);
			});
		
	};
	return (
		<Box className="grid center h-screen">
			<Container maxWidth="sm">
				<ContentStyle className="shadow-2xl rounded-3xl" style={{background:colors.primary[400]}}>
					<HeadingStyle component={motion.div} {...fadeInUp}>
						<Typography variant="h4" sx={{ color: colors.grey[400], mb: 5 }}>
							Login to your account
						</Typography>
					</HeadingStyle>

					<LoginForm setAuth={setAuth} />

					<Divider
						sx={{ my: 3, color: colors.grey[100] }}
						component={motion.div}
						{...fadeInUp}
					>
						<Typography variant="body1" sx={{ color: colors.grey[400] }}>
							OR Continue With
						</Typography>
					</Divider>
					<Box component={motion.div} {...fadeInUp}>
						<SocialAuth onClick={handleLogin} />
					</Box>
					<Typography
						component={motion.p}
						{...fadeInUp}
						variant="h6"
						align="center"
						sx={{ mt: 3, color: colors.grey[400] }}
					>
						Don’t have an account?{" "}
						<Link variant="body1" component={RouterLink} to="/signup" sx={{color:colors.grey[400]}}>
							Sign up
						</Link>
					</Typography>
				</ContentStyle>
			</Container>
		</Box>
	);
};

export default Login;
