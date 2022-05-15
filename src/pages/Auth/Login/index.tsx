import { Box, Button, Grid, Link, Paper, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import BackgroundImg from "../../../assets/images/login-bg.jpg";
import LogoImg from "../../../assets/images/logo.png";
import { useAlert } from "../../../hooks/useAlert";
import { useLoading } from "../../../hooks/useLoading";
import { RouteNames } from "../../../routes/RouteNames";

type LoginFormProps = {
  email: string;
  password: string;
};

const Login = () => {
  const { showLoading, hideLoading } = useLoading();
  const Alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const signIn = (data: LoginFormProps) => {
    console.log(data);
    try {
      showLoading();
    } catch (err: any) {
      console.log({ err });
      Alert.error.show();
    } finally {
      hideLoading();
    }
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
          <form style={{ maxWidth: 350 }} onSubmit={handleSubmit(signIn)}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="email"
              inputProps={{
                ...register("email", {
                  required: true,
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Digite um e-mail válido",
                  },
                }),
              }}
              error={Boolean(errors?.email)}
              helperText={errors?.email?.message}
              label="E-mail"
              name="email"
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="password"
              inputProps={{
                ...register("password", {
                  required: true,
                  minLength: {
                    value: 5,
                    message: "A senha deve conter ao menos 5 dígitos",
                  },
                }),
              }}
              label="Senha"
              type="password"
              error={Boolean(errors?.password)}
              helperText={errors?.password?.message}
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
