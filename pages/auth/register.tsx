import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import tesloApi from '../../api/tesloApi';
import { validations } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {

    const router = useRouter();

    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async ( { email, name, password }: FormData ) => {

        setShowError(false);

        const { hasError, message } = await registerUser(name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => { setShowError(false) }, 3000);
            return;
        }

        // TODO: Navegaar a la pantalla que el usuario estaba. 
        const destination = router.query.p?.toString() || '/';
        router.replace( destination );

        // try {

        //     const { data } = await tesloApi.post('/user/register', { email, name, password });
        //     const { token, user } = data;
        //     console.log({ token, user });
            
        // } catch (error) {
        //     console.log(error);
        //     setShowError(true);
        //     setTimeout(() => { setShowError(false) }, 3000);
        // }
    }

    return (
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>

                        <Grid item xs={ 12 }>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            <Chip 
                                    label='No reconocemos ese usuario / contraseña'
                                    color='error'
                                    icon={ <ErrorOutline /> }
                                    className='fadeIn'
                                    sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        
                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Nombre completo' 
                                variant='filled' 
                                fullWidth
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Correo' 
                                type='email'
                                variant='filled' 
                                fullWidth
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Contraseña' 
                                type='password' 
                                variant='filled' 
                                fullWidth
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Button 
                                type='submit' 
                                color='secondary' 
                                className='circular-btn' 
                                size='large' 
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='end'>
                            <NextLink href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login' } passHref>
                                <Link underline='always'>
                                    Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;