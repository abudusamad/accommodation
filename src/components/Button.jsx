import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const Button = ({ onClickHandler, value, title }) => {
    const theme = useTheme();
		const colors = tokens(theme.palette.mode);
	return (
		<button
			onClick={onClickHandler}
			value={value}
            className="p-3 mr-3 bg-transparent border-0 rounded-md cursor-pointer bg-slate-100"
            color={ colors.primary[400] }
            backgroundColor={colors.primary[400]}
		>
			{title}
		</button>
	);
};

export default Button;
