import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
// import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
// import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';

type FormData = {
    email: string;
    password: string;
}


const LoginPage = () => {

    const router = useRouter();

    // const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    // console.log({errors});
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then( prov => {
            // console.log({ prov });
            setProviders(prov);
        })
    },[]);

    const onLoginUser = async( { email, password }: FormData ) => {
        
        setShowError(false);

        // const isValidLogin = await loginUser( email, password );

        //////////////////////////////////////////////////////////////////////////////////
        // Autenticacion personalizada
        // if ( !isValidLogin ) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return
        // }

        // // navegar a la pantalla que el usuario estaba
        // const destination = router.query.p?.toString() || '/';
        // router.replace( destination );

        /////////////////////////////////////////////////////////////////////////////////
        // try {
        //     const { data } = await tesloApi.post('/user/login', { email, password });
        //     const { token, user } = data;
        //     console.log({ token, user });

        // } catch (error) {
        //     console.log('Error en las credenciales');
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        // }

        await signIn('credentials', { email, password })
    }

    return (
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={ handleSubmit( onLoginUser ) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>

                    <Grid container spacing={2}>

                        <Grid item xs={ 12 }>
                            <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
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
                                type='email' 
                                label='Correo' 
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
                            <NextLink href={ router.query.p ? `/auth/register?p=${ router.query.p }` : '/auth/register' } passHref>
                                <Link underline='always'>
                                    No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values( providers ).map((provider: any) => {

                                    if ( provider.id === 'credentials' ) return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={ provider.id }
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1 }}
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )
                                })
                            }
                        </Grid>

                    </Grid>

                </Box>
            </form>
        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   
    const session = await getSession({ req });

    console.log('QUERY', query);

    const { p = '/', callbackUrl } = query;

    if ( session ) {
        return {
            redirect: {
                destination: callbackUrl!.toString(),
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default LoginPage;