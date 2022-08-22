import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';
import Cookies from 'js-cookie';

type FormData = {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}

const getAddressFromCookies = ():FormData => {

    return {
        firstName : Cookies.get('firstName') || '',
        lastName  : Cookies.get('lastName') || '',
        address   : Cookies.get('address') || '',
        address2  : Cookies.get('address2') || '',
        zip       : Cookies.get('zip') || '',
        city      : Cookies.get('city') || '',
        country   : Cookies.get('country') || '',
        phone     : Cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onAddressUser = async( { firstName, lastName, address, address2, zip, city, country, phone }: FormData ) => {
        
        Cookies.set('firstName',firstName);
        Cookies.set('lastName',lastName);
        Cookies.set('address',address);
        Cookies.set('address2',address2 || '');
        Cookies.set('zip',zip);
        Cookies.set('city',city);
        Cookies.set('country',country);
        Cookies.set('phone',phone);
        
        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title="Dirección" pageDescription={'Confirmar dirección del destino'}>
            
            <form onSubmit={ handleSubmit( onAddressUser ) } noValidate>
                <Typography variant='h1' component='h1'>Dirección</Typography>

                <Grid container spacing={ 2 } sx={{ mt: 2 }}>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Nombre' 
                            variant='filled' 
                            fullWidth
                            { ...register('firstName', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.firstName }
                            helperText={ errors.firstName?.message } 
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Apellido' 
                            variant='filled' 
                            fullWidth
                            { ...register('lastName', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.lastName }
                            helperText={ errors.lastName?.message } 
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Dirección' 
                            variant='filled' 
                            fullWidth 
                            { ...register('address', {
                                required: 'Este campo es requerido',
                            })}
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Dirección 2 (opcional)' 
                            variant='filled' 
                            fullWidth
                            { ...register('address2')}
                            error={ !!errors.address2 }
                            helperText={ errors.address2?.message } 
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Código Postal' 
                            variant='filled' 
                            fullWidth
                            { ...register('zip', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.zip }
                            helperText={ errors.zip?.message }  
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Ciudad' 
                            variant='filled' 
                            fullWidth
                            { ...register('city', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.city }
                            helperText={ errors.city?.message }  
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant='filled'
                                label="País"
                                defaultValue={ countries[0].code }
                                { ...register('country', {
                                    required: 'Este campo es requerido',
                                })}
                                error={ !!errors.country }
                                // helperText={ errors.country?.message } 
                            >
                                {
                                    countries.map( country => (
                                        <MenuItem
                                            key={ country.code }
                                            value={ country.code }
                                        >
                                            { country.name }
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Télefono' 
                            variant='filled' 
                            fullWidth
                            { ...register('phone', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.phone }
                            helperText={ errors.phone?.message }  
                        />
                    </Grid>

                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button  type='submit'  color='secondary' className='circular-btn' size='large'>
                        Revisar pedido
                    </Button>
                </Box>

            </form>



        </ShopLayout>

    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
     
//     const { token = '' } = req.cookies;

//     let isValidToken = false;

//     try {

//         await jwt.isValidToken( token );
//         isValidToken = true;
        
//     } catch (error) {
//         isValidToken = false;
//     }

//     if ( !isValidToken ) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }

export default AddressPage;