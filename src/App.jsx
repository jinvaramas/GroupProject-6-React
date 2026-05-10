import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Head from "./components/Head";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function Layout() {
  return (
    <CartProvider>
      <Head />
      <Outlet />
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // แก้ตรงนี้: ใช้ index: true เพื่อบอกว่าเมื่อเข้าหน้าแรกสุด (/) ให้โชว์หน้านี้ทันที
        index: true,
        element: <ShopPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "product/:id/:slug",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
