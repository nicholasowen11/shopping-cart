import useWishlist from "../hooks/useWishlist";
import WishlistItem from "./WishlistLineItem";

const Wishlist = () => {
    const { wishlist, dispatch, REDUCER_ACTIONS } = useWishlist();

    const onClearWishlist = () => {
        dispatch({ type: REDUCER_ACTIONS.CLEAR });
    };

    const totalItems = wishlist.length;
    const totalPrice = wishlist.reduce((acc, item) => acc + item.price, 0);

    return (
        <main className="main main--wishlist">
            <h2 className="offscreen">Wishlist</h2>

            {totalItems > 0 && (
                <>
                    <button className="wishlist__clear" onClick={onClearWishlist}>
                        Clear Wishlist ❌
                    </button>
                    <div className="cart__totals">
                        <p>Total Items: {totalItems}</p>
                        <p>Total Price: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalPrice)}</p>
                    </div>
                </>
            )}

            {totalItems === 0 ? (
                <h2>Your Wishlist is empty.</h2>
            ) : (
                <ul className="wishlist">
                    {wishlist.map(item => (
                        <WishlistItem key={item.sku} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />
                    ))}
                </ul>
            )}
        </main>
    );
};

export default Wishlist;
