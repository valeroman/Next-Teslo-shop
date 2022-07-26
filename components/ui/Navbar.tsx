import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UIContext } from '../../context';


export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UIContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSerchVisible, setIsSerchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }
 
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={ 1 } />

                <Box 
                    sx={{ display: isSerchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className='fadeIn'
                >
                    <NextLink href='/category/men'>
                        <Link>
                            <Button color={ asPath === '/category/men' ? 'primary' : 'info' }>Hombres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/women'>
                        <Link>
                            <Button color={ asPath === '/category/women' ? 'primary' : 'info' }>Mujeres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid'>
                        <Link>
                            <Button color={ asPath === '/category/kid' ? 'primary' : 'info' }>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>
                
                <Box flex={ 1 } />

                {/* Pantallas grandes */}
                {
                    isSerchVisible
                        ?   (
                                <Input
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                    className='fadeIn'
                                    autoFocus
                                    value={ searchTerm }
                                    onChange={ (e) => setSearchTerm( e.target.value )}
                                    onKeyUp={ (e) => e.key === 'Enter' && onSearchTerm() }
                                    type='text'
                                    placeholder="Buscar..."
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={ () => setIsSerchVisible(false) }
                                            >
                                            <ClearOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                            )
                        :   (
                                <IconButton
                                    className='fadeIn'
                                    onClick={ () => setIsSerchVisible(true) }
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                >
                                    <SearchOutlined />
                                </IconButton>
                            )
                }

                {/* Pantallas pequenas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ 2 } color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
