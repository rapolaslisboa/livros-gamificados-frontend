import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BackgroundImg from "../../../assets/images/signup-bg.jpg";
import { useAlert } from "../../../hooks/useAlert";
import { useLoading } from "../../../hooks/useLoading";
import { RouteNames } from "../../../routes/RouteNames";
import { authService } from "../../../services/authService";

type SignUpFormProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  subscriptionPlan: string;
};

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve conter ao menos 3 caracteres"),
  lastName: Yup.string()
    .required("O sobrenome é obrigatório")
    .min(3, "O sobrenome deve conter ao menos 3 caracteres"),
  email: Yup.string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(5, "A senha deve conter ao menos 5 caracteres"),
  passwordConfirmation: Yup.string()
    .required("A senha de confirmação é obrigatória")
    .oneOf([Yup.ref("password")], "As senhas não conferem"),
  subscriptionPlan: Yup.string().required(),
});

const formOptions = { resolver: yupResolver(formSchema) };

const SignUp = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();
  const Alert = useAlert();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpFormProps>(formOptions);

  const signUp = async (data: SignUpFormProps, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    try {
      const { signUp } = authService();
      showLoading();
      await signUp(data);
      alert("Cadastro realizado com sucesso!")
      setTimeout(() => {
        navigate(RouteNames.Login());
      }, 1000);
    } catch (err: any) {
      console.log({ err });
    } finally {
      hideLoading();
    }
  };

  const handleSubscriptionPlan = (event: SelectChangeEvent) => {
    setSubscriptionPlan(event.target.value);
  };

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
          <Typography textAlign="center" component="h1" variant="h4">
            Cadastre-se
          </Typography>
          <Typography textAlign="center" mt={2} component="h3" variant="body1">
            Crie uma conta e acesse nossa plataforma!
          </Typography>
          <form
            data-testid="SignUp.Form"
            style={{ marginTop: 40, maxWidth: 350 }}
            onSubmit={handleSubmit(signUp)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  fullWidth
                  data-testid="FirstName.Input"
                  inputProps={{
                    ...register("firstName"),
                  }}
                  error={Boolean(errors?.firstName)}
                  helperText={errors?.firstName?.message}
                  id="firstName"
                  label="Nome"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="lastName"
                  data-testid="LastName.Input"
                  inputProps={{
                    ...register("lastName"),
                  }}
                  error={Boolean(errors?.lastName)}
                  helperText={errors?.lastName?.message}
                  label="Sobrenome"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  data-testid="Email.Input"
                  inputProps={{
                    ...register("email"),
                  }}
                  error={Boolean(errors?.email)}
                  helperText={errors?.email?.message}
                  label="E-mail"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Senha"
                  data-testid="Password.Input"
                  inputProps={{
                    ...register("password"),
                  }}
                  error={Boolean(errors?.password)}
                  helperText={errors?.password?.message}
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="passwordConfirmation"
                  label="Confirmar Senha"
                  data-testid="PasswordConfirmation.Input"
                  inputProps={{
                    ...register("passwordConfirmation"),
                  }}
                  error={Boolean(errors?.passwordConfirmation)}
                  helperText={errors?.passwordConfirmation?.message}
                  type="password"
                  id="passwordConfirmation"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="subscription-plan-select-label">
                    Plano
                  </InputLabel>
                  <Select
                    labelId="subscription-plan-select-label"
                    id="subscription-plan-select"
                    data-testid="SubscriptionPlan.Select"
                    inputProps={{
                      ...register("subscriptionPlan"),
                    }}
                    value={subscriptionPlan}
                    error={Boolean(errors?.subscriptionPlan)}
                    label="Plano"
                    onChange={handleSubscriptionPlan}
                  >
                    <MenuItem value="Free">Free</MenuItem>
                    <MenuItem value="Premium">Premium</MenuItem>
                    <MenuItem value="VIP">VIP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid="SignUp.Button"
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
