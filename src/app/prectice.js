"use client"
import React, { useState } from "react";

const SortingVisualizer = () => {
  const [inputArray, setInputArray] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputArray(e.target.value);
  };

  // Merge Sort with visualization
  const mergeSortVisualize = (arr, depth = 0) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Log the splitting step
    setSteps((prevSteps) => [
      ...prevSteps,
      { depth, action: "split", left, right },
    ]);

    const sortedLeft = mergeSortVisualize(left, depth + 1);
    const sortedRight = mergeSortVisualize(right, depth + 1);

    // Merge the sorted arrays and log the merging step
    const merged = merge(sortedLeft, sortedRight);
    setSteps((prevSteps) => [
      ...prevSteps,
      { depth, action: "merge", merged },
    ]);

    return merged;
  };

  const merge = (left, right) => {
    let sortedArray = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        sortedArray.push(left[i]);
        i++;
      } else {
        sortedArray.push(right[j]);
        j++;
      }
    }
    return [...sortedArray, ...left.slice(i), ...right.slice(j)];
  };

  // Start sorting process
  const handleSort = () => {
    const array = inputArray
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num)); // Convert to numbers and remove invalid inputs

    setSteps([]); // Clear previous steps
    setCurrentStep(0);
    mergeSortVisualize(array);
  };

  // Navigate between steps
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Sorting Algorithm Visualizer</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={inputArray}
          onChange={handleInputChange}
          placeholder="Enter numbers separated by commas"
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleSort}
          style={{
            padding: "10px",
            marginLeft: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Visualize Sort
        </button>
      </div>
      <div>
        <h3>Step: {currentStep + 1} / {steps.length}</h3>
        {steps[currentStep] ? (
          <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginTop: "10px" }}>
            {steps[currentStep].action === "split" ? (
              <p>
                <strong>Split:</strong> Left: [{steps[currentStep].left.join(", ")}], Right: [{steps[currentStep].right.join(", ")}]
              </p>
            ) : (
              <p>
                <strong>Merge:</strong> Result: [{steps[currentStep].merged.join(", ")}]
              </p>
            )}
          </div>
        ) : (
          <p>No steps to display</p>
        )}
      </div>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          style={{
            padding: "10px",
            backgroundColor: currentStep === 0 ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentStep === 0 ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          Previous Step
        </button>
        <button
          onClick={handleNextStep}
          disabled={currentStep >= steps.length - 1}
          style={{
            padding: "10px",
            backgroundColor: currentStep >= steps.length - 1 ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentStep >= steps.length - 1 ? "not-allowed" : "pointer",
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
