import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/products/$productId')({
  component: Product,
  loader: async ({ params }) => {
    const res = await fetch('https://api.escuelajs.co/api/v1/products/' + params.productId);
    return await res.json();
  },
});

function Product() {
  const { title } = Route.useLoaderData();
  return <div>Hello product with id of {title}!</div>;
}
