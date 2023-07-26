import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";

import SocialAuth from "../../components/SocialAuth";
import SignupForm from "../../components/SignupForm";
import { motion } from "framer-motion";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
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
    y: 40,
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

const Signup = ({ setAuth }) => {
   const theme = useTheme();
		const colors = tokens(theme.palette.mode);
  return (
		<Box className="h-screen grid center">
			<Container maxWidth="sm">
				<ContentStyle
					className="shadow-2xl rounded-3xl"
					style={{ background: colors.primary[400] }}
				>
					<HeadingStyle component={motion.div} {...fadeInUp}>
						<Typography sx={{ color: colors.grey[400], mb: 5 }} variant="h5">
							Enter your details below.
						</Typography>
					</HeadingStyle>

					<SignupForm setAuth={setAuth} />
					<Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
						<Typography variant="body2" sx={{ color: colors.grey[400] }}>
							OR Continue With
						</Typography>
					</Divider>
					<Box component={motion.div} {...fadeInUp}>
						<SocialAuth />
					</Box>

					<Typography
						component={motion.p}
						{...fadeInUp}
						variant="body1"
						align="center"
						sx={{ color: colors.grey[400], mt: 2 }}
					>
						By registering, I agree to{" "}
						<Link underline="always" color={colors.redAccent[600]} href="#">
							Terms of Service
						</Link>{" "}
						&{" "}
						<Link underline="always" color={colors.redAccent[600]} href="#">
							Privacy Policy
						</Link>
					</Typography>

					<Typography
						component={motion.p}
						{...fadeInUp}
						variant="body1"
						align="center"
						sx={{ mt: 3, color: colors.grey[400] }}
					>
						Have an account?{" "}
						<Link
							variant="body1"
							component={RouterLink}
							to="/"
							sx={{ color: colors.grey[400] }}
						>
							Login
						</Link>
					</Typography>
				</ContentStyle>
			</Container>
		</Box>
	);
};

export default Signup;
