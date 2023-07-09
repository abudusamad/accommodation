import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
	
	setting: false,
	userProfile: false,
	notification: false,
};

export const ContextProvider = ({ children }) => {
	const [screenSize, setScreenSize] = useState(undefined);
	
	const [activeMenu, setActiveMenu] = useState(true);
	const [isClicked, setIsClicked] = useState(initialState);

	

	const handleClick = (clicked) =>
		setIsClicked({ ...initialState, [clicked]: true });

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<StateContext.Provider
			value={{
				
				activeMenu,
				screenSize,
				setScreenSize,
				handleClick,
				isClicked,
				initialState,
				setIsClicked,
				setActiveMenu,
				
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
