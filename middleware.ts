// import { NextRequest, NextResponse } from 'next/server';
// import * as jose from 'jose';
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
////////////////////////////////////////////////////////////////////////////////////////////////
// export { default } from "next-auth/middleware";
// export const config = { matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'] }
/////////////////////////////////////////////////////////////////////////////////////////////////


export default withAuth(
    
    async function middleware(req) {
        
        const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        // console.log('[TOKEN]',req.nextauth.token);
        // console.log('[SESION]',session);

        const validRoles = ['admin'];
        if (req.nextUrl.pathname.startsWith('/admin')) {
            if (!validRoles.includes(session.user.role)) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        // if (req.nextUrl.pathname.startsWith('/api/admin')) {
        //     if (!validRoles.includes(session.user.role)) {
        //         return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
        //     }
        // }
    },
    // {
    //     callbacks: {
    //         authorized: ({ token }) => token?.role === "admin",
    //     },
        
    // },
)


    
export const config = { matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'] }




////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// export async function middleware(req: NextRequest) {

//     console.log('SOY MIDD');
 
//     try {
//         await jose.jwtVerify(req.cookies.get('token') as string,
//             new TextEncoder().encode(process.env.JWT_SECRET_SEED));        
//         return NextResponse.next();
 
//     } catch (error) {
//         console.log('SOY MIDD_ERR');
//         const { protocol, host, pathname  } = req.nextUrl
//         return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`);
//     }
 
// }

// export const config = {
//     matcher: ['/checkout/address', '/checkout/summary']
// };
 
// export const config = {
//     matcher: ['/checkout/:path*']
// };
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';
 
// export async function middleware(req: NextRequest) {
//   const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
 
 
//   if (!session) {
 
//     if (req.nextUrl.pathname.startsWith('/api/admin')) {
//       return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
//     }
 
//     const requestedPage = req.nextUrl.pathname;
//     return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url));;
//   }
 
//   const validRoles = ['admin'];
//   if (req.nextUrl.pathname.startsWith('/admin')) {
//     if (!validRoles.includes(session.user.role)) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }
 
//   if (req.nextUrl.pathname.startsWith('/api/admin')) {
//     if (!validRoles.includes(session.user.role)) {
//       return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
//     }
//   }
 
//   return NextResponse.next();
// }
 
// export const config = {
//     matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
// };