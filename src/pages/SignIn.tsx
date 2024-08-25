import React, { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AppContext } from "../context/Context";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      className="flex items-center justify-center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        <Typography
          variant="body2"
          sx={{
            color: "#10897b",
            marginX: 0.5,
            "&:hover": {
              color: "#0d7266",
            },
          }}
        >
          SKINDER
        </Typography>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const context = useContext(AppContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user = {
      username: data.get("username"),
      password: data.get("password"),
    };
    context?.login(user.username as string, user.password as string);
  };

  return (
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                sx={{
                  color: "#10897b",
                  "&.Mui-checked": {
                    color: "#10897b",
                  },
                }}
              />
            }
            label="Remember me"
          />
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"/"}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#10897b",
                    "&:hover": {
                      color: "#0d7266",
                    },
                  }}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/signup"}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#10897b",
                    "&:hover": {
                      color: "#0d7266",
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
