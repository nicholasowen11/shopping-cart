// import { ChangeEvent, ReactElement } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";

type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {

  const img: string = new URL(`../images/${item.sku}.jpg`, 
    import.meta.url
  ).href

  console.log(img)

  const lineTotal: number = (item.qty * item.price)

  const highestQty: number = 20 > item.qty ? 20 : item.qty

  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

  // const options: ReactElement[] = optionValues.map(val => {
  //   return <option key={`opt${val}`} value={val}>{val}</option>
  // })

  const onChangeQty = (event: SelectChangeEvent<number>) => {
    dispatch({
        type: REDUCER_ACTIONS.QUANTITY,
        payload: { ...item, qty: Number(event.target.value) }
    });
  };

  // const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
  //   dispatch({
  //     type: REDUCER_ACTIONS.QUANTITY,
  //     payload: { ...item, qty: Number(e.target.value) }
  //   })
  // }

  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item,
  })

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">
        {item.name}
      </div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      {/* <select 
      name="itemQty" 
      id="itemQty" 
      className="cart__select"
      value={item.qty}
      aria-label="Item Quantity"
      onChange={onChangeQty}>
        {options}
      </select> */}

      <Select 
        value={item.qty}
        onChange={onChangeQty}
        displayEmpty
        sx={{ width: 80, height: 30, fontSize: "0.875rem", padding: "4px" }}
        >
        {optionValues.map(val => (
          <MenuItem key={val} value={val}>{val}</MenuItem>
        ))}
      </Select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal)}
      </div>

      <button 
      className="cart__button"
      aria-label="Remove Item From Cart"
      title="Remove Item From Cart"
      onClick={onRemoveFromCart}>
        &#x274c;
      </button>
    </li>
  )

  return content
}

export default CartLineItem