import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImg from "../../../assets/images/signup-bg.jpg";
import { useAlert } from "../../../hooks/useAlert";
import { useLoading } from "../../../hooks/useLoading";
import { RouteNames } from "../../../routes/RouteNames";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();
  const Alert = useAlert();
  const navigate = useNavigate();

  const signUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      showLoading();
      Alert.success.show("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate(RouteNames.Login());
      }, 5000);
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

  // border-radius: 20px;
  // max-width: 300px;
  // display: flex;
  // margin-right: auto;
  // margin-left: auto;

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={3}
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
          <Typography component="h1" variant="h4">
            Cadastre-se
          </Typography>
          <Typography textAlign="center" mt={2} component="h3" variant="body1">
            Crie uma conta e acesse nossa plataforma!
          </Typography>
          <form style={{ marginTop: 40, maxWidth: 350 }} onSubmit={signUp}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  underline="hover"
                  href={RouteNames.Login()}
                  variant="body2"
                >
                  Já possui uma conta? Logue
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export { SignUp };
