import { WishlistItemType } from "../context/WishlistProvider";
import { WishlistReducerAction } from "../context/WishlistProvider";
import useCart from "../hooks/useCart";

type PropsType = {
    item: WishlistItemType;
    dispatch: React.Dispatch<WishlistReducerAction>;
    REDUCER_ACTIONS: any;
};

const WishlistLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
    const { dispatch: cartDispatch, REDUCER_ACTIONS: CART_ACTIONS } = useCart();

    const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href;

    const onRemoveFromWishlist = () => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

    const onAddToCart = () => {
        cartDispatch({ type: CART_ACTIONS.ADD, payload: { ...item, qty: 1 } });
        onRemoveFromWishlist();
    };

    return (
        <li className="wishlist__item">
            <img src={img} alt={item.name} className="wishlist__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price)}
            </div>
            <button className="wishlist__button" onClick={onAddToCart}>
                Add to Cart 🛒
            </button>
            <button className="wishlist__button" onClick={onRemoveFromWishlist}>
                ❌
            </button>
        </li>
    );
};