// import { StrictMode } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
// import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import './style.css';
import { Suspense, lazy } from 'react';
import { API_BASE_URL } from './shared/utils/env';
// import ProductDetails from './features/products/pages/product-details';
// import { Login } from './routes/login';
// import { Products } from './routes/_auth/products/index.lazy';

// Import the generated route tree
// import { routeTree } from './routeTree.gen';

// Create a new router instance
// const router = createRouter({ routeTree });

// Register the router instance for type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router;
//   }
// }

const Login = lazy(() => import('./features/auth/pages/login'));
const Products = lazy(() => import('./features/products/pages/products-list'));
const ProductDetails = lazy(() => import('./features/products/pages/product-details'));
const ProductEdit = lazy(() => import('./features/products/pages/product-edit'));
const ProductCreate = lazy(() => import('./features/products/pages/product-create'));
const Layout = lazy(() => import('@shared/components/layout'));

const router = createHashRouter([
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
    children: [
      {
        path: 'new',
        loader: () => {
          return queryClient.ensureQueryData({
            queryKey: ['categories'],
            queryFn: async () => {
              const res = await fetch(API_BASE_URL + '/categories/');
              return await res.json();
            },
            // gcTime: 5000,
          });
        },
        element: <ProductCreate />,
      },
      {
        path: ':id/edit',
        loader: () => {
          return queryClient.ensureQueryData({
            queryKey: ['categories'],
            queryFn: async () => {
              const res = await fetch(API_BASE_URL + '/categories/');
              return await res.json();
            },
            // gcTime: 5000,
          });
        },
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
        loader: () => {
          return queryClient.ensureQueryData({
            queryKey: ['products'],
            queryFn: async () => {
              const res = await fetch(API_BASE_URL + '/products?offset=0&limit=10');
              return await res.json();
            },
            // gcTime: 5000,
          });
        },
        element: (
          <Suspense fallback={<div>Ładowanie użytkowników...</div>}>
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

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    // </StrictMode>
  );
}
