import "../pages/filter/Price/Price.css"
const Buttons = ({ onClickHandler, value, title }) => {
  
	return (
		<button
			onClick={onClickHandler}
			value={value}
            className="btns"
		>
			{title}
		</button>
	);
};

export default Buttons;
