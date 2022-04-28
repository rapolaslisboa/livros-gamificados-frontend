import { Box, Button, Grid, Link, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import BackgroundImg from "../../../assets/images/login-bg.jpg";
import LogoImg from "../../../assets/images/logo.png";
import { useLoading } from "../../../hooks/useLoading";
import { useAlert } from "../../../hooks/useAlert";
import { RouteNames } from "../../../routes/RouteNames";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();
  const Alert = useAlert();

  const signIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      showLoading();
    } catch (err: any) {
      console.log({ err });
      Alert.error.show();
    } finally {
      hideLoading();
    }
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          overflow: "hidden",
          backgroundImage: `url(${BackgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img style={{ width: "100%", maxWidth: 450 }} src={LogoImg} />
          <form style={{ maxWidth: 350 }} onSubmit={signIn}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              id="email"
              label="E-mail"
              onChange={handleEmail}
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Senha"
              onChange={handlePassword}
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid
              flexDirection="column"
              rowGap={1}
              alignItems="center"
              container
            >
              <Grid item xs>
                <Link underline="hover" href="#" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  underline="hover"
                  href={RouteNames.SignUp()}
                  variant="body2"
                >
                  Ainda não se cadastrou? Cadastre-se
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export { Login };
