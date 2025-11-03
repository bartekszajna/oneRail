import { createHashRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { ROUTES } from "./models"
import { protectedLoader, getProductsQuery, getCategoriesQuery, getProductQuery, notAuthenticatedLoader } from './loaders';


const Login = lazy(() => import('../features/auth/pages/login'));
const Signup = lazy(() => import('../features/auth/pages/signup'));
const ProductsList = lazy(() => import('../features/products/pages/products-list'));
const ProductDetails = lazy(() => import('../features/products/pages/product-details'));
const ProductEdit = lazy(() => import('../features/products/pages/product-edit'));
const ProductCreate = lazy(() => import('../features/products/pages/product-create'));
const NotFound = lazy(() => import('../features/not-found/'));
const NotAuthenticatedLayout = lazy(() => import('@/shared/components/layouts/not-authenticated-layout'));
const AuthenticatedLayout = lazy(() => import('@/shared/components/layouts/authenticated-layout'));

export const router = createHashRouter([
  {
    path: ROUTES.ROOT,
    element: <NotAuthenticatedLayout/>,
    loader: notAuthenticatedLoader,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.LOGIN} replace />
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <Signup />,
      },
    ]
  },
  
  {
    path: ROUTES.PRODUCTS,
    element: <AuthenticatedLayout />,    
    children: [
      {
        path: ROUTES.NEW,
        loader: protectedLoader(getCategoriesQuery),
        element: <ProductCreate />,
      },
      {
        path: ROUTES.EDIT,
        loader: protectedLoader(getCategoriesQuery),
        element: <ProductEdit />,
      },
      {
        path: ROUTES.DETAILS,
        loader: protectedLoader(getProductQuery),
        element: <ProductDetails />,
      },
      {
        index: true,
        loader: protectedLoader(getProductsQuery),
        element: <ProductsList />,
      },
    ],
  },
  {
    path: ROUTES.ERROR,
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.ERROR} />,
  },
]);
