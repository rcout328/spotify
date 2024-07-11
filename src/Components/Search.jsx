import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [message, setMessage] = useState("");
  const [predictedResult, setPredictedResult] = useState("");
  const [error, setError] = useState(""); // New state for error messages

  const predictMessage = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5001/predict", {
        message: message,
      });
      setPredictedResult(response.data.predicted_result);
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again."); // Set error message
      setPredictedResult(""); // Clear previous prediction result
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Scam or Ham Message Classifier</h2>
      <textarea
        rows={4}
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          minHeight: 100,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginVertical: 10,
          fontFamily: "Arial, sans-serif",
        }}
      />
      <button
        style={{
          padding: 10,
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={predictMessage}
      >
        Predict
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message in red */}
      {predictedResult && <p>Predicted result: {predictedResult}</p>}
    </div>
  );
};

export default Search;
