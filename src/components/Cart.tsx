import { useState } from "react";
import useCart from "../hooks/useCart";
import CartLineItem from "./CartLineItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Cart = () => {
    const [confirm, setConfirm] = useState<boolean>(false)

    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()

    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT })
        setConfirm(true)
    }

    const pageContent = confirm
    ? <h2>Thank you for your order.</h2>
    : 
    <>
        <h2 className="offscreen">Cart</h2>
        <ul className="cart">
            {cart.map(item => {
                return (
                    <CartLineItem
                    key={item.sku}
                    item={item}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                />
                )
            })}
        </ul>
        <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="h6">Total Items: {totalItems}</Typography>
        <Typography variant="h6">Total Price: {totalPrice}</Typography>

        <Button 
            variant="contained" 
            color="primary" 
            disabled={!totalItems} 
            onClick={onSubmitOrder}
            sx={{ mt: 2 }}
        >
            Place Order
            </Button>
        </Box>
        {/* <div className="cart__totals">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPrice}</p>
            <button className="cart__submit" disabled={!totalItems} onClick={onSubmitOrder}>
                Place Order
            </button>
        </div> */}
    </>

    const content = (
        <main className="main main--cart">
            {pageContent}
        </main>
    )

    return content
}

export default Cart