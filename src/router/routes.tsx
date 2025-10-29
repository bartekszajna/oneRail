import { createHashRouter, Navigate, redirect } from 'react-router-dom';
import { lazy } from 'react';
import { getAccessToken } from '@shared/utils/authStorage';
import type { Products } from '../features/products/api/models';

import { protectedLoader, getProductsQuery, getCategoriesQuery, getProductQuery } from './loaders';

const Login = lazy(() => import('../features/auth/pages/login'));
const Signup = lazy(() => import('../features/auth/pages/signup'));
const Products = lazy(() => import('../features/products/pages/products-list'));
const ProductDetails = lazy(() => import('../features/products/pages/product-details'));
const ProductEdit = lazy(() => import('../features/products/pages/product-edit'));
const ProductCreate = lazy(() => import('../features/products/pages/product-create'));
const MainLayout = lazy(() => import('@/shared/components/main-layout'));

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'products',
    element: <MainLayout />,
    loader: () => {
      if (!getAccessToken()) {
        throw redirect('/login');
      }
    },
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
