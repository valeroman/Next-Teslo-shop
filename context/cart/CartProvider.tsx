import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';


export interface CartState {
    cart: ICartProduct[];
    children?: React.ReactNode | undefined;
    numberOfItems: number,
    subTotal: number,
    tax: number,
    total: number,
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}

export const CartProvider:FC<CartState> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect( () => {
       
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [];
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
        
    },[]);

    useEffect(() => {
        Cookie.set('cart', JSON.stringify( state.cart ));
    },[state.cart]);

    useEffect(() => {
       
        const numberOfItems = state.cart.reduce( (prev, current) => current.quantity + prev, 0 );
        const subTotal = state.cart.reduce( (prev, current) => (current.price * current.quantity) + prev ,0 );
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * ( taxRate + 1 )
        }

        // console.log({ orderSummary });

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });

    },[state.cart]);



    const addProductToCart = ( product: ICartProduct ) => {
       
        // Verificar si existe un producto con ese id, lo agrego
        const productInCart = state.cart.some( p => p._id === product._id );    // some si existe regresa true, si no regresa false
        // si no existe ese producto lo agrego
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [ ...state.cart, product ] });

        // Verifica si existe el producto con el mismo id y con la misma talla
        const productInCartButDifferentSize = state.cart.some( p =>  p._id === product._id && p.size === product.size);
        // si no existe ese producto con el mismo id y talla lo agrego
        if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [ ...state.cart, product ] });

        // Si existe ese producto con el mismo id y la misma talla Acumulo
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
    }

    const updateQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            updateQuantity,
            removeCartProduct
        }}>
            { children }
        </CartContext.Provider>
    )
}