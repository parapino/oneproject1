import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import MyProducts from "./pages/MyProducts";
import LanguageInput from "./components/LanguageInput";
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./components/FavoritesContext";
import { CartProvider } from "./components/CartProvider";
import Footer from "./components/Footer";
import "./i18n";
import Products from "./components/Products";
import CartModal from "./components/CartModal";
import Rasmlar from "./components/Rasmlar";
import Favorites from "./pages/Favorites";
import { UserProductsProvider } from "./components/UserProductsContext";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <UserProductsProvider>
      <FavoritesProvider>
        <CartProvider>
          <div className={dark ? "dark" : ""}>
            <div className="flex flex-col min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
              <Navbar dark={dark} setDark={setDark}>
                <div className="ml-auto px-4">
                  <LanguageInput />
                </div>
              </Navbar>

              <main className="flex-1 pt-16 sm:pt-20 md:pt-24 min-h-0 overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/biz-haqimizda" element={<About />} />
                  <Route path="/rasmlar" element={<Gallery />} />
                  <Route path="/boglanish" element={<Contact />} />
                  <Route path="/detail/:id" element={<Detail />} />
                  <Route path="/myproducts" element={<MyProducts />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/rasmlar/:id?" element={<Rasmlar />} />
                  <Route
                    path="/products"
                    element={
                      <>
                        <Products />
                        <CartModal />
                      </>
                    }
                  />
                </Routes>
              </main>

              <div className="mt-auto">
                <Footer />
              </div>
            </div>
          </div>
        </CartProvider>
      </FavoritesProvider>
    </UserProductsProvider>
  );
}
