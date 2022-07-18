import { FC } from 'react';
import Head from 'next/head';
import { Navbar, SideMenu } from '../ui';

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;   // url completo para compartir en redes sociales
    children?: React.ReactNode | undefined;
}

export const ShopLayout:FC<Props> = ({ children, pageDescription, title, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name='descriptio' content={ pageDescription } />

            <meta name='og:title' content={ title } />
            <meta name='og:description' content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name='og:image' content={ imageFullUrl } />
                )
            }


        </Head>

        <nav>
           <Navbar />
        </nav>

        <SideMenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px',
        }}>
            { children }
        </main>

        <footer>
            {/* TODO: Footer */}
        </footer>
    </>
  )
}
