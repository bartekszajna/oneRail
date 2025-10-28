import { createHashRouter, Navigate, redirect } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { API_BASE_URL } from '@shared/utils/env';
import { getAccessToken } from '@shared/utils/authStorage';
import type { Categories, Products } from '../features/products/api/models';
import { api } from '../api/axiosClient';
import { queryClient } from '@/lib/queryClient';
import { protectedLoader, getProductsQuery, getCategoriesQuery } from './loaders';

const Login = lazy(() => import('../features/auth/pages/login'));
const Products = lazy(() => import('../features/products/pages/products-list'));
const ProductDetails = lazy(() => import('../features/products/pages/product-details'));
const ProductEdit = lazy(() => import('../features/products/pages/product-edit'));
const ProductCreate = lazy(() => import('../features/products/pages/product-create'));
const Layout = lazy(() => import('@shared/components/layout'));

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Ładowanie strony XD...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: 'products',
    element: <Layout />,
    loader: () => {
      if (!getAccessToken()) {
        throw redirect('/login');
      }
    },
    children: [
      {
        path: 'new',
        loader: () => {
          return queryClient.ensureQueryData({
            queryKey: ['categories'],
            queryFn: async () => {
              const res = await api.get<Categories>('/categories/');
              return res.data;
            },
            // gcTime: 5000,
          });
        },
        element: <ProductCreate />,
      },
      {
        path: ':id/edit',
        loader: protectedLoader(getCategoriesQuery),
        element: <ProductEdit />,
      },
      {
        path: ':id',
        loader: ({ params }) => {
          return queryClient.ensureQueryData({
            queryKey: ['products', params.id],
            queryFn: async () => {
              const res = await fetch(API_BASE_URL + '/products/' + params.id);
              return await res.json();
            },
            // gcTime: 5000,
          });
        },
        element: <ProductDetails />,
      },
      {
        index: true,
        loader: protectedLoader(getProductsQuery),
        element: (
          <Suspense fallback={<div>Ładowanie produktów...</div>}>
            <Products />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <h1>NOT FOUND!</h1>,
  },
]);
