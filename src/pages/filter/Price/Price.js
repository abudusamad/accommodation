import Input from "../../../components/Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
		<>
			<div className="ml">
				<h2 className="sidebar-title price-title">Price</h2>

				<label className="sidebar-label-container">
					<input onChange={handleChange} type="radio" value="" name="test2" />
					<span className="checkmark"></span>All
				</label>

				<Input
					handleChange={handleChange}
					value={50}
					title="Gh2000 -3000"
					name="test2"
				/>

				<Input
					handleChange={handleChange}
					value={100}
          title="Gh3000 - Gh4000"
					name="test2"
				/>

				<Input
					handleChange={handleChange}
					value={150}
					title="Gh4000 - Gh5000"
					name="test2"
				/>

				<Input
					handleChange={handleChange}
					value={200}
					title="Over Gh6000"
					name="test2"
				/>
			</div>
		</>
	);
};

export default Price;
