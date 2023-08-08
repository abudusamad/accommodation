import { CssBaseline, ThemeProvider } from "@mui/material";
import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import Login from "./pages/Home/Login";
import Signup from "./pages/Home/Signup";
import { ImageGallery } from "./pages/ImageGallery";
import MyProfile from "./pages/register/MyProfile.jsx";
import ComponentList from "./scenes/bar";
import Calendar from "./scenes/calendar/calendar";
import Dashboard from "./scenes/dashboard";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Invoices from "./scenes/invoices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorModeContext, useMode } from "./theme";
function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);
	const [setAuth] = useState(false);
	const queryClient = new QueryClient();
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<QueryClientProvider client={queryClient}>
					<Suspense fallback={<LoadingSkeleton />}>
						<div className="app">
							<Sidebar isSidebar={isSidebar} />
							<ToastContainer/>
							<main className="content">
								<Topbar setIsSidebar={setIsSidebar} />
								<Routes>
									<Route path="/" element={<Login setAuth={setAuth} />} />
									<Route
										path="/signup"
										element={<Signup setAuth={setAuth} />}
									/>
									<Route path="/dashboard" element={<Dashboard />} />
									<Route path="/geography" element={<Geography />} />
									<Route path="/calendar" element={<Calendar />} />
									<Route path="/faq" element={<FAQ />} />
									<Route path="/invoices" element={<Invoices />} />
									<Route path="/bar" element={<ComponentList />} />
									<Route path="/my-profile" element={<MyProfile />} />
									<Route path="/hostels" element={<ImageGallery />} />
								</Routes>
							</main>
						</div>
					</Suspense>
				</QueryClientProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
