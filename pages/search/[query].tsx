import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage, GetServerSideProps } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { db, dbProducts } from '../../database';
import { IProduct } from '../../interfaces/products';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aqui'}>
        <Typography variant='h1' component='h1' >Buscar productos</Typography>

        {
            foundProducts 
                ?  <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Término: { query }</Typography>
                :  (
                        <Box display='flex'>
                            <Typography variant='h2' sx={{ mb: 1 }} >No encontramos ningun producto</Typography>
                            <Typography variant='h2' sx={{ ml: 1 }} color='secondary' textTransform='capitalize'>{ query }</Typography>
                        </Box>
                    )
        }
        

        <ProductList products={ products }/>

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductByTerm( query );
    const foundProducts = products.length > 0;

    if ( !foundProducts ) {
        products = await dbProducts.getAllProducts();
    }

    // TODO: si no hay productos, retornar otros

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage;
