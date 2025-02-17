import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
// import { UseProductsContextType } from "../context/ProductsProvider"
import { ReactElement } from "react"
import Product from "./Product"
import useWishlist from "../hooks/useWishlist"

const ProductList = ({ sortOrder }: { sortOrder: 'asc' | 'desc' }) => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart()
    const { products } = useProducts()
    const { wishlist } = useWishlist()

    const sortedProducts = [...products].sort((a,b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

    console.log("Wishlist:", wishlist);

    let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

    if (products?.length) {
        pageContent = sortedProducts.map(product => {
            const inCart: boolean = cart.some(item => item.sku == product.sku)
            const inWishlist: boolean = wishlist.some(item => item.sku === product.sku);

            console.log(`Product: ${product.sku}, In Wishlist: ${inWishlist}`);

            return (
                <Product 
                    key={product.sku}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                    inWishlist={inWishlist}
                />
            )
        })
    }

    const content = (
        <main className="main main--products">
            {pageContent}
        </main>
    )

    return content
}

export default ProductList