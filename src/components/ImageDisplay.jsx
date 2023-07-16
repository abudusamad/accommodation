import React, { useState } from "react";

const ImageDisplay = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const images = [
		"image1.jpg",
		"image2.jpg",
		"image3.jpg",
		// Add more image file names here
	];

	const handleClick = () => {
		setCurrentImage((prevImage) => (prevImage + 1) % images.length);
	};

	return (
		<div>
			<img
				src={require(`./images/${images[currentImage]}`).default}
				alt={`Image ${currentImage + 1}`}
				style={{ maxWidth: "300px", maxHeight: "300px" }}
			/>
			<button onClick={handleClick}>Next Image</button>
		</div>
	);
};

export default ImageDisplay;
