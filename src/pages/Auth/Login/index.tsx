import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Link, Paper, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BackgroundImg from "../../../assets/images/login-bg.jpg";
import LogoImg from "../../../assets/images/logo.png";
import { useAlert } from "../../../hooks/useAlert";
import { useAuth } from "../../../hooks/useAuth";
import { useLoading } from "../../../hooks/useLoading";
import { RouteNames } from "../../../routes/RouteNames";

type LoginFormProps = {
  email: string;
  password: string;
};

const formSchema = Yup.object().shape({
  email: Yup.string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(5, "A senha deve conter ao menos 5 caracteres"),
});

const formOptions = { resolver: yupResolver(formSchema) };

const Login = () => {
  const { showLoading, hideLoading } = useLoading();
  const Alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>(formOptions);
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const signIn = (data: LoginFormProps) => {
    const { email, password } = data;


    try {
      showLoading();
      authenticate(email, password);
      navigate(RouteNames.Dashboard());
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
              id="email"
              inputProps={{
                ...register("email"),
              }}
              error={Boolean(errors?.email)}
              helperText={errors?.email?.message}
              label="E-mail"
              name="email"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              inputProps={{
                ...register("password"),
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
