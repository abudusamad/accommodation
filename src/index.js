import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { UserContextProvider } from "./contexts/userContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ContextProvider>
		<React.StrictMode>
			<BrowserRouter>
				<UserContextProvider>
					<App />
				</UserContextProvider>
			</BrowserRouter>
		</React.StrictMode>
	</ContextProvider>
);
