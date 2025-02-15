import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", 
    },
    secondary: {
      main: "#ff5722", 
    },
    error: {
      main: "#f44336",
    },
  },
});

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = calculateExpression(input);
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const buttonStyles = {
    color: "#fff",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  };

  const equalButtonStyles = {
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e64a19", 
    },
  };

  const clearButtonStyles = {
    color: "#fff",
    "&:hover": {
      backgroundColor: "#d32f2f", 
    },
  };

}