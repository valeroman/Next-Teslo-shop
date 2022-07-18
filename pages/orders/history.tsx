
import NextLink from 'next/link';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid',
        headerName: 'pagada',
        description: 'Muestra información si esta pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )       
        }
    },

    {
        field: 'orden',
        headerName: 'Ver orden',
        description: 'Muestra información si esta pagada la orden o no',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${ params.row.id }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )       
        }
    }
];

const rows = [
    { id: 1, paid: true, fullname: 'Román Valero' },
    { id: 2, paid: false, fullname: 'Carola Visconti' },
    { id: 3, paid: true, fullname: 'Maximiliano Valero' },
    { id: 4, paid: false, fullname: 'Ramning Valero' },
    { id: 5, paid: true, fullname: 'Yari Valero' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container sx={{ my: 2 }}>
            <Grid item xs={ 12 } sx={{ height: 650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage;