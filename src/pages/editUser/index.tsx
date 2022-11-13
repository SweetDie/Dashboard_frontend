import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button, Card, CardContent, CardHeader, createTheme, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme, ThemeProvider } from "@mui/material";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Loader from "../../components/loader";
import { useActions } from "../../hooks/useActions";
import { Field, Formik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import { getAccessToken } from "../../services/api-user-service";

const theme = createTheme();
const initialValues = { currentPassword: "", newPassword: "", confirmPassword: "" };

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EditUser: React.FC<any> = () => {
    const { loading, allUsers, roles } = useTypedSelector((state) => state.UserReducer);
    const { id } = useParams();
    const { GetRoles, EditUser, GetAllUsers } = useActions();

    const findUser = (u: any) => u.id === id;
    const userIndex = allUsers.findIndex(findUser);
    const user: any = allUsers[userIndex];

    let allRoles: any[] = roles;

    useEffect(() => {
        GetRoles();
    }, []);

    const [role, setRole] = useState(user.role);
    const [redirect, setRedirect] = useState(false);
    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    };

    if (loading) {
        return <Loader />;
    }

    if (redirect) {
        return <Navigate to="../users" />
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const newUser = {
            id: user.id,
            name: data.get('Name'),
            surname: data.get('Surname'),
            phoneNumber: data.get('PhoneNumber'),
            email: data.get('email'),
            role: data.get('role'),
            token: getAccessToken()
        };

        EditUser(newUser);
        setRedirect(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title={`Edit ${user.name}`}
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
                                    variant="outlined"
                                    defaultValue={user.email}
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
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <FormControl fullWidth>
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
                            Save
                        </Button>
                    </Box>
                </Card>
            </form>
        </ThemeProvider >
    )
}

export default EditUser;