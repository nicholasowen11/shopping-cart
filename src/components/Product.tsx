import { ProductType } from "../context/ProductsProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { ReactElement } from "react";
import useWishlist from "../hooks/useWishlist";

type PropsType = {
    product: ProductType;
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
    inCart: boolean;
    inWishlist: boolean;
    isWishlistPage?: boolean;
};

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart, inWishlist, isWishlistPage = false }: PropsType): ReactElement => {
    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href;

    const { dispatch: wishlistDispatch, REDUCER_ACTIONS: WISHLIST_ACTIONS } = useWishlist();
    
    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
    
    const onAddToWishlist = () => wishlistDispatch({ type: WISHLIST_ACTIONS.ADD, payload: product });

    return (
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                { inCart ? " -> Item in Cart ✅" 
                : null}
                {
                    inWishlist ? " -> Item in Wishlist ❤️" 
                    : null
                }
            </p>
            <button onClick={onAddToCart}>Add to Cart 🛒</button>
            {!isWishlistPage && <button onClick={onAddToWishlist}>Add to Wishlist ❤️</button>}
        </article>
    );
};

export default Product;
