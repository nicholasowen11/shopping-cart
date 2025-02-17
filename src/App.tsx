import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import ProductList from "./components/ProductList"
import Wishlist from "./components/Wishlist"
import { useState } from "react"

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)
  const [viewWishlist, setViewWishlist] = useState<boolean>(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const pageContent = viewCart ? <Cart /> : viewWishlist ? <Wishlist /> : <ProductList sortOrder={sortOrder} />

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart}
       viewWishlist={viewWishlist} setViewWishlist={setViewWishlist}
       sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )
  return content
}

export default App
