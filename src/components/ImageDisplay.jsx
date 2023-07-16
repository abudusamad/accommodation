import React, { useState } from "react";
import image1 from "../data/Product8.jpg"
import image2 from "../data/Product1.jpg"
import image3 from "../data/Product2.jpg"
import image4 from "../data/Product3.jpg"
import image5 from "../data/Product4.jpg"
import image6 from "../data/Product5.jpg"
import image7 from "../data/Product6.jpg"
import image9 from "../data/Product7.jpg"
import image10 from "../data/Product9.jpg"

const ImageDisplay = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const images = [
        {
            image1,image2,image3,image4,image5,image6,image7,image9, image10
        }
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
