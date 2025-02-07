import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// Allow all origins
app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post("https://fake-bills-website.onrender.com/predict", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Prediction failed" });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app; // Required for Vercel deployment
