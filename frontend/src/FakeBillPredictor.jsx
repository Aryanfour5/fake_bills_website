import { useState } from "react";
import axios from "axios";
import "./FakeBillPredictor.css";

const FakeBillPredictor = () => {
  const [features, setFeatures] = useState({
    diagonal: "",
    height_left: "",
    height_right: "",
    margin_low: "",
    margin_upper: "",
    length: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        features: Object.values(features).map(Number), // Convert to numbers
      });
      setPrediction(response.data.prediction[0] === 1 ? "Fake Bill" : "Genuine Bill");
    } catch (err) {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Fake Bill Detection</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(features).map((key) => (
          <div key={key}>
            <label>{key.replace("_", " ")}:</label>
            <input
              type="number"
              name={key}
              value={features[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {prediction && <h3>Prediction: {prediction}</h3>}
    </div>
  );
};

export default FakeBillPredictor;
