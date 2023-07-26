import { hostels } from "../data/dummy";
import cors from "cors";
import express from "express";
const app = express();

app.use(cors());

app.get("/", (req, res) => {
	const { q } = req.query;

	const keys = ["name", "namLoc", "address"];

	const search = (data) => {
		return data.filter((item) =>
			keys.some((key) => item[key].toLowerCase().includes(q))
		);
	};

	q ? res.json(search(hostels).slice(0, 10)) : res.json(hostels.slice(0, 10));
});

app.listen(5000, () => console.log("API is working!"));
