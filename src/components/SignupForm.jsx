import { useTheme } from "@emotion/react";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
	Box,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { tokens } from "../theme";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
	opacity: 1,
	y: 0,
	transition: {
		duration: 0.6,
		ease: easing,
		delay: 0.16,
	},
};

const SignupForm = ({ setAuth }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const SignupSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("First name required"),
		lastName: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Last name required"),
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		validationSchema: SignupSchema,
		onSubmit: () => {
			setTimeout(() => {
				setAuth(true);
				navigate("/", { replace: true });
			}, 2000);
		},
	});

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form
				autoComplete="off"
				noValidate
				onSubmit={handleSubmit}
			>
				<Stack spacing={3} >
					<Stack
						component={motion.div}
						initial={{ opacity: 0, y: 60 }}
						animate={animate}
						direction={{ xs: "column", sm: "row", color: colors.grey[400] }}
						spacing={2}
					>
						<TextField
							fullWidth
							label="First name"
							{...getFieldProps("firstName")}
							error={Boolean(touched.firstName && errors.firstName)}
							helperText={touched.firstName && errors.firstName}
						/>

						<TextField
							fullWidth
							label="Last name"
							{...getFieldProps("lastName")}
							error={Boolean(touched.lastName && errors.lastName)}
							helperText={touched.lastName && errors.lastName}
							sx={{ color: colors.grey[400] }}
						/>
					</Stack>

					<Stack
						spacing={3}
						component={motion.div}
						initial={{ opacity: 0, y: 40 }}
						animate={animate}
						sx={{ color: colors.grey[400] }}
					>
						<TextField
							fullWidth
							autoComplete="username"
							type="email"
							label="Email address"
							{...getFieldProps("email")}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
							sx={{ color: colors.grey[400] }}
						/>

						<TextField
							fullWidth
							sx={{ color: colors.grey[400] }}
							autoComplete="current-password"
							type={showPassword ? "text" : "password"}
							label="Password"
							{...getFieldProps("password")}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											edge="end"
											onClick={() => setShowPassword((prev) => !prev)}
										>
											<Icon
												icon={
													showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
												}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
						/>
					</Stack>

					<Box
						component={motion.div}
						initial={{ opacity: 0, y: 20 }}
						animate={animate}
					>
						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isSubmitting}
							sx={{
								backgroundColor: colors.greenAccent[600],
							} }
							className="text-white"
						>
							Sign up
						</LoadingButton>
					</Box>
				</Stack>
			</Form>
		</FormikProvider>
	);
};

export default SignupForm;
