import { ProductType } from "../context/ProductsProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { ReactElement } from "react";
import useWishlist from "../hooks/useWishlist";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type PropsType = {
    product: ProductType;
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
    inCart: boolean;
    inWishlist: boolean;
    isWishlistPage?: boolean;
};

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart, inWishlist }: PropsType): ReactElement => {
    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href;

    const { dispatch: wishlistDispatch, REDUCER_ACTIONS: WISHLIST_ACTIONS } = useWishlist();
    
    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
    
    const onAddToWishlist = () => wishlistDispatch({ type: WISHLIST_ACTIONS.ADD, payload: product });

    return (
        <Card sx={{ maxWidth: 345, width: "100%", boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                    <img src={img} alt={product.name} className="product__img" />
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                    {   
                        inCart ? " -> Item in Cart ✅" 
                        : null}
                    {
                        inWishlist ? " -> Item in Wishlist ❤️" 
                        : null
                    }
                </Typography>
                <Button variant="contained" color="primary" onClick={onAddToCart} sx={{ marginTop: 2 }}>
                    Add to Cart 🛒
                </Button>
                <Button variant="contained" color="primary" onClick={onAddToWishlist} sx={{ marginTop: 2 }}>
                    Add to Wishlist ❤️
                </Button>
            </CardContent>
        </Card>
        // <article className="product">
        //     <h3>{product.name}</h3>
        //     <img src={img} alt={product.name} className="product__img" />
        //     <p>
        //         {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
        //         { inCart ? " -> Item in Cart ✅" 
        //         : null}
        //         {
        //             inWishlist ? " -> Item in Wishlist ❤️" 
        //             : null
        //         }
        //     </p>
        //     <button onClick={onAddToCart}>Add to Cart 🛒</button>
        //     {!isWishlistPage && <button onClick={onAddToWishlist}>Add to Wishlist ❤️</button>}
        // </article>
    );
};

export default Product;