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

  const calculateExpression = (expression) => {
    let numbers = [];
    let operators = [];
    let currentNumber = "";

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(char) || char === ".") {
        currentNumber += char;
      } else {
        if (currentNumber !== "") {
          numbers.push(parseFloat(currentNumber));
          currentNumber = "";
        }
        operators.push(char);
      }
    }

    if (currentNumber !== "") {
      numbers.push(parseFloat(currentNumber));
    }

    let total = numbers[0]; 

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const nextNumber = numbers[i + 1];

      switch (operator) {
        case "+":
          total += nextNumber;
          break;
        case "-":
          total -= nextNumber;
          break;
        case "*":
          total *= nextNumber;
          break;
        case "/":
          total /= nextNumber;
          break;
        default:
          throw new Error("Invalid operator");
      }
    }

    return total;
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <Container maxWidth="sm">
        <Box mt={5}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            value={result}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
            placeholder="Result"
          />
          <Grid container spacing={2}>
            {[7, 8, 9, "/"].map((value) => (
              <Grid item xs={3} key={value}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={buttonStyles}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </Button>
              </Grid>
            ))}
            {[4, 5, 6, "*"].map((value) => (
              <Grid item xs={3} key={value}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={buttonStyles}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </Button>
              </Grid>
            ))}
            {[1, 2, 3, "-"].map((value) => (
              <Grid item xs={3} key={value}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={buttonStyles}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </Button>
              </Grid>
            ))}
            {[0, ".", "=", "+"].map((value) => (
              <Grid item xs={3} key={value}>
                <Button
                  fullWidth
                  variant="contained"
                  color={value === "=" ? "secondary" : "primary"}
                  sx={value === "=" ? equalButtonStyles : buttonStyles}
                  onClick={
                    value === "=" ? handleCalculate : () => handleClick(value)
                  }
                >
                  {value}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={clearButtonStyles}
                onClick={handleClear}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Calculator;