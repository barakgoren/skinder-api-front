import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { serverUrl } from "../server";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        SKINDER
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface FormErrors {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export default function SignUp() {
  const [errors, setErrors] = useState<FormErrors>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let newErrors: FormErrors = {
      email: undefined,
      password: undefined,
      username: undefined,
    };
    let emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    let usernamePattern = new RegExp(/^[a-z0-9.-]+$/);

    if (!data.get("email")) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(data.get("email") as string)) {
      newErrors.email = "Email is invalid";
    }
    if (!data.get("username")) {
      newErrors.username = "Username is required";
    } else if (!usernamePattern.test(data.get("username") as string)) {
      newErrors.username = "Username is invalid";
    }

    if (!data.get("password")) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    if (newErrors.email || newErrors.password || newErrors.username) {
      return;
    }

    let newUser = {
      name: data.get("firstName") + " " + data.get("lastName"),
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password"),
    };

    axios
      .post(serverUrl + "/api/users/register", newUser)
      .then((response) => {
        console.log(response);
        alert("User created successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Error creating user");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors?.username ? true : false}
                  required
                  fullWidth
                  id="username"
                  label="User name"
                  name="username"
                  autoComplete="username"
                  helperText={errors?.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors?.email ? true : false}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errors?.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors?.password ? true : false}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={errors?.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                my: 2,
                color: "white",
                backgroundColor: "#10897b",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: "#0d7266",
                  color: "white",
                  borderColor: "black",
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">
                  <Typography variant="body2" sx={{ color: "#10897b" }}>
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
