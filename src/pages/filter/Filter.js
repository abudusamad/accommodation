import Category from "./Category/Category";
import Price from "./Price/Price";

import "./Filter.css";

const Filter = ({ handleChange }) => {
  return (
    <>
      <section className="filter">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
      </section>
    </>
  );
};

export default Filter;
