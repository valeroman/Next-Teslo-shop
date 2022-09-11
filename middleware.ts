// import { NextRequest, NextResponse } from 'next/server';
// import * as jose from 'jose';

export { default } from "next-auth/middleware";
export const config = { matcher: ["/checkout/:path*"] }
 
 
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