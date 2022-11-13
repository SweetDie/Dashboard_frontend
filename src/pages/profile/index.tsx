import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button, Card, CardContent, CardHeader, createTheme, Divider, ThemeProvider } from "@mui/material";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Loader from "../../components/loader";
import { useActions } from "../../hooks/useActions";
import { ChangePasswordScheme } from "../auth/validation";
import { Field, Formik } from "formik";

const theme = createTheme();
const initialValues = { currentPassword: "", newPassword: "", confirmPassword: "" };

const Profile: React.FC<any> = () => {
    const { loading, user } = useTypedSelector((state) => state.UserReducer);
    const { UpdateUser, ChangePassword } = useActions();

    if (loading) {
        return <Loader />;
    }

    const handleUpdateProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const newUser = {
            id: user.id,
            name: data.get('Name'),
            surname: data.get('Surname'),
            phoneNumber: data.get('PhoneNumber')
        };

        UpdateUser(newUser);
    };

    const handleChangePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {        
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const newUser = {
            id: user.id,
            currentPassword: data.get('currentPassword'),
            newPassword: data.get('newPassword')
        }

        ChangePassword(newUser);
    };

    return (
        <ThemeProvider theme={theme}>
            <form
                autoComplete="off"
                noValidate
                onSubmit={handleUpdateProfileSubmit}
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the first name"
                                    label="Name"
                                    name="Name"
                                    defaultValue={user.name}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Surname"
                                    name="Surname"
                                    variant="outlined"
                                    defaultValue={user.surname}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    value={user.email}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="PhoneNumber"
                                    name="PhoneNumber"
                                    type="number"
                                    defaultValue={user.phoneNumber}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
            <form
                autoComplete="off"
                onSubmit={handleChangePasswordSubmit}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => { }}
                    validationSchema={ChangePasswordScheme}
                >
                    {({ errors, touched, isSubmitting, isValid, dirty }) => (
                        <Card sx={{ mt: 2 }}>
                            <CardHeader
                                subheader="Update password"
                                title="Password"
                            />
                            <Divider />

                            <CardContent>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Current password"
                                    margin="normal"
                                    name="currentPassword"
                                    type="password"
                                    variant="outlined"
                                />
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="New password"
                                    margin="normal"
                                    name="newPassword"
                                    type="password"
                                    variant="outlined"
                                />
                                {errors.newPassword && touched.newPassword ? (
                                    <div style={{ color: "red" }}>{errors.newPassword}</div>
                                ) : null}
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Confirm password"
                                    margin="normal"
                                    name="confirmPassword"
                                    type="password"
                                    variant="outlined"
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                                ) : null}
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 2
                                }}
                            >
                                <Button
                                    disabled={!(isValid && dirty)}
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    {isSubmitting ? "Loading" : "Update"}
                                </Button>
                            </Box>
                        </Card>
                    )}
                </Formik>
            </form >
        </ThemeProvider >
    )
}

export default Profile;