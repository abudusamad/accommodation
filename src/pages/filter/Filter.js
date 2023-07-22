import { Modal } from "@mui/material";
import Category from "./Category/Category";
import "./Filter.css";
import Price from "./Price/Price";

const Filter = ({ handleChange, open, handleClose }) => {

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<section className="filter rounded-xl" >
					<div className="logo-container">
						<h1>HnH</h1>
					</div>
					<Category handleChange={handleChange} />
					<Price handleChange={handleChange} />
				</section>
			</Modal>
		</>
	);
};

export default Filter;
