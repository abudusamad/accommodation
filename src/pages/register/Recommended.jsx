import Button from "../../components/Button";

const Recommended = ({ handleClick }) => {
	return (
		<>
			<div >
				<h2 className=" mx-10 text-base">Recommended</h2>
				<div className="flex mx-10">
					<Button
						onClickHandler={handleClick}
						value=""
						title="Hostel & Homestel"
					/>
					<Button onClickHandler={handleClick} value="Hostel" title="Hostel" />
					<Button
						onClickHandler={handleClick}
						value="Homestel"
						title="Homestel"
					/>
					<Button
						onClickHandler={handleClick}
						value="Gh2000-3000"
						title="Gh2000-3000"
					/>
					<Button
						onClickHandler={handleClick}
						value="Gh3000-4000"
						title="Gh3000-4000"
					/>
					<Button
						onClickHandler={handleClick}
						value="Gh4000-5000"
						title="Gh4000-5000"
					/>
				</div>
			</div>
		</>
	);
};

export default Recommended;
