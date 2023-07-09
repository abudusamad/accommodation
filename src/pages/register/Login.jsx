import React, { useEffect } from "react";
import { Container, Typography ,IconButton } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";


export default function Login() {
	const navigate = useNavigate();

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

	useEffect(() => {
		auth.onAuthStateChanged((user) => user && navigate("/dashboard"));
	});

	return (
		<>
			<Container
				sx={{ display: "grid", placeContent: "center", height: "100vh" }}
				maxWidth="md"
			>
				<Typography textAlign={"center"} variant="h4" sx={{ marginBottom: 4 }}>
					hnh Accommodation
				</Typography>
				<IconButton onClick={handleLogin}>
					<FcGoogle />
				</IconButton>
			</Container>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 1500,
					style: {
						fontSize: 14,
					},
				}}
			/>
		</>
	);
}
