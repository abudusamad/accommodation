import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the default styles

const SignInComponent = () => {
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
		<div>
			{/* Your sign-in form */}
			<button onClick={handleSignIn}>Sign In</button>
			{isSignedIn && <div>Welcome, user!</div>}
		</div>
	);
};

export default SignInComponent;
