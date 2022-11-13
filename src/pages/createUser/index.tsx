import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CreateUserSchema } from "../auth/validation";
import { Field, Formik } from "formik";
import Loader from "../../components/loader";
import { useActions } from "../../hooks/useActions";
import { ToastContainer } from "react-toastify";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme } from "@mui/material";
import { Navigate } from "react-router-dom";

const initialValues = { email: "", password: "", confirmPassword: "" };

const theme = createTheme();

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreateUser: React.FC = () => {
  const { CreateUser, GetRoles } = useActions();
  const { loading, roles, message } = useTypedSelector((state) => state.UserReducer);

  let allRoles: any[] = roles;

  useEffect(() => {
    GetRoles();
  }, []);

  const [role, setRole] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  if (message === "User successfully created.") {
    return <Navigate to="/dashboard/users" />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser = {
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      role: data.get('role')
    };

    CreateUser(newUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register user
          </Typography>
          <ToastContainer autoClose={5000} />
          <Formik
            initialValues={initialValues}
            onSubmit={() => { }}
            validationSchema={CreateUserSchema}
          >
            {({ errors, touched, isSubmitting, isValid }) => (
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    {errors.email && touched.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    {errors.password && touched.password ? (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-confirmPassword"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small">Role</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        name="role"
                        value={role}
                        label="Role"
                        onChange={handleChange}
                      >
                        {allRoles?.map((userRole) => (
                          <MenuItem
                            key={userRole}
                            value={userRole}
                            style={getStyles(userRole, userRole, theme)}
                          >
                            {userRole}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Button
                  disabled={!isValid}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? "Loading" : "Sign Up"}
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateUser;