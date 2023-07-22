import Input from "../../../components/Input";
import "./Category.css";

function Category({ handleChange }) {
	 return (
			<div>
				<h2 className="sidebar-title">Location</h2>

				<div>
					<label className="sidebar-label-container">
						<input onChange={handleChange} type="radio" value="" name="test" />
						<span className="checkmark"></span>All
					</label>
					<Input
						handleChange={handleChange}
						value="Campus"
						title="Campus"
						name="test"
					/>
					<Input
						handleChange={handleChange}
						value="Ayiduase"
						title="Ayiduase"
						name="test"
					/>
					<Input
						handleChange={handleChange}
						value="Boadi"
						title="Boadi"
						name="test"
					/>
					<Input
						handleChange={handleChange}
						value="Top-High"
						title="Top-High"
						name="test"
					/>
				</div>
			</div>
		);
}

export default Category;
