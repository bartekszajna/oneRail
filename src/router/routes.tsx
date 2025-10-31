import { createHashRouter, Navigate, redirect } from 'react-router-dom';
import { lazy } from 'react';
import { deleteAccessToken, getAccessToken } from '@shared/utils/authStorage';
import type { Products } from '../features/products/api/models';

import { protectedLoader, getProductsQuery, getCategoriesQuery, getProductQuery } from './loaders';
import { checkAuthenticatedStatus } from '@/features/auth/api/api';

const Login = lazy(() => import('../features/auth/pages/login'));
const Signup = lazy(() => import('../features/auth/pages/signup'));
const Products = lazy(() => import('../features/products/pages/products-list'));
const ProductDetails = lazy(() => import('../features/products/pages/product-details'));
const ProductEdit = lazy(() => import('../features/products/pages/product-edit'));
const ProductCreate = lazy(() => import('../features/products/pages/product-create'));
const NotAuthenticatedLayout = lazy(() => import('@/shared/components/layouts/not-authenticated-layout'));
const AuthenticatedLayout = lazy(() => import('@/shared/components/layouts/authenticated-layout'));

export const router = createHashRouter([
  {
    path: '/',
    element: <NotAuthenticatedLayout/>,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const pathname = url.hash.replace('#', '') || '/';
      const token = getAccessToken();

      if (token) {
        try {
          await checkAuthenticatedStatus();
          if (pathname === '/') {
            return redirect('/products');
          }
        } catch {
          deleteAccessToken();
          if (pathname !== '/login' && pathname !== '/signup') {
            return redirect('/login');
          }
        }
      }
      return null;
    },
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ]
  },
  
  {
    path: 'products',
    element: <AuthenticatedLayout />,
    // loader: () => {
    //   if (!getAccessToken()) {
    //     throw redirect('/login');
    //   }
    // },

    
    children: [
      {
        path: 'new',
        loader: protectedLoader(getCategoriesQuery),
        element: <ProductCreate />,
      },
      {
        path: ':id/edit',
        loader: protectedLoader(getCategoriesQuery),
        element: <ProductEdit />,
      },
      {
        path: ':id',
        loader: protectedLoader(getProductQuery),
        element: <ProductDetails />,
        errorElement: <h1 className='text-4xl'>Wrong id</h1>,
      },
      {
        index: true,
        loader: protectedLoader(getProductsQuery),
        element: <Products />,
      },
    ],
  },
  {
    path: '*',
    element: <h1>NOT FOUND!</h1>,
  },
]);
