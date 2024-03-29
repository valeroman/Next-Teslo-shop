import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { initialData } from '../../database/products';

const product = initialData.products[0];


const ProductPage = () => {
  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>

      <Grid container spacing={3} sx={{ backgroundColor: 'green' }}>

        <Grid item xs={12} sm={7} sx={{ backgroundColor: 'orange' }}>
          <ProductSlideshow 
            images={ product.images }
          />
        </Grid>

        <Grid item xs={12} sm={5} sx={{ backgroundColor: 'yellow' }}>
          <Box display='flex' flexDirection='column'>
            
            {/* titulos */}
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${ product.price }` }</Typography>

            {/* cantidad */}
            <Box sx={{ my: 2, backgroundColor: 'pink' }}>
              {/* Se puede editar la cantidad */}
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter />
              <SizeSelector 
                // selectedSize={ product.sizes[0] } 
                sizes={ product.sizes } 
              />
            </Box>

            {/* Agregar al carrito */}
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponible" color="error" variant='outlined' />  */}

            {/* Descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>

    </ShopLayout>
  )
}

export default ProductPage;