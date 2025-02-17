import Nav from "./Nav"
import useCart from "../hooks/useCart"

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
    viewWishlist: boolean,
    setViewWishlist: React.Dispatch<React.SetStateAction<boolean>>,
    sortOrder: 'asc' | 'desc',
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>
}

const Header = ( {viewCart, viewWishlist, setViewCart, setViewWishlist, sortOrder, setSortOrder }: PropsType) => {
    const { totalItems, totalPrice } = useCart()

    const content = (
        <header className="header">
            <div className="header_title-bar">
                <h1>Acme Co.</h1>
                <div className="header_price-box">
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: {totalPrice}</p>
                </div>
            </div>
            <Nav viewCart={viewCart} setViewCart={setViewCart}
             viewWishlist={viewWishlist} setViewWishlist={setViewWishlist}
             sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </header>
    )

    return content
}

export default Header
