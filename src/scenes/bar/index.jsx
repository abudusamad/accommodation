import React, { useState } from "react";

const ComponentList = () => {
	const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page
    const data = [
			"Item 1",
			"Item 2",
			"Item 3",
			"Item 4",
			"Item 5",
			"Item 6",
			"Item 7",
			"Item 8",
			"Item 9",
			"Item 10",
		];

	
	const totalPages = Math.ceil(data.length / itemsPerPage);

	const handleNext = () => {
		setCurrentPage((prevPage) =>
			prevPage === totalPages ? prevPage : prevPage + 1
		);
	};

	const handlePrevious = () => {
		setCurrentPage((prevPage) => (prevPage === 1 ? prevPage : prevPage - 1));
	};

	const renderItems = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const itemsToRender = data.slice(startIndex, endIndex);

		return itemsToRender.map((item, index) => <div key={index}>{item}</div>);
	};

	return (
		<div>
			{renderItems()}
			<div>
				<button onClick={handlePrevious} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button onClick={handleNext} disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
		</div>
	);
};

export default ComponentList;
