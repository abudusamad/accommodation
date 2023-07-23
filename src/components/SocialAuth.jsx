import { IconButton, Stack } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import the default styles
import { auth, db, provider } from "../lib/firebase";

const SocialAuth = () => {
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

	const [isSignedIn, setIsSignedIn] = useState(false);

	const handleSignIn = () => {
		// Your sign-in logic here, assuming signInSuccess() returns true on successful sign-in
		const signInSuccess = true;

		if (signInSuccess) {
			setIsSignedIn(true);
			toast.success("Successfully signed in!", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000, // Duration the toast will be shown (in milliseconds)
			});
		} else {
			// Handle sign-in failure if needed
			toast.error("Sign-in failed. Please try again.", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			});
		}
	};
	
	return (
		<>
			<Stack direction="row" spacing={2}>
				<IconButton
					sx={{
						border: "2px solid #ccc",
						borderRadius: "5px",
						padding: "0.5675rem",
						flex: 1,
					}}
					onClick={(handleLogin, handleSignIn)}
				>
					<FcGoogle color="#DF3E30" width={22} height={22} />
					{isSignedIn && <div>Welcome, user!</div>}
				</IconButton>
				<IconButton
					sx={{
						border: "2px solid #ccc",
						borderRadius: "5px",
						padding: "0.5675rem",
						flex: 1,
					}}
					onClick={handleLogin}
				>
					<BsGithub color="#1877F2" width={22} height={22} />
				</IconButton>
			</Stack>
		</>
	);
};

export default SocialAuth;
