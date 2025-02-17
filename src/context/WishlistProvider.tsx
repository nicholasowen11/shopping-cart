import { useMemo, useReducer, createContext, ReactElement } from "react";

export type WishlistItemType = {
    sku: string,
    name: string,
    price: number,
};

type WishlistStateType = { wishlist: WishlistItemType[] };

const initWishlistState: WishlistStateType = { wishlist: [] };

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    CLEAR: "CLEAR",
};

export type WishlistReducerActionType = typeof REDUCER_ACTION_TYPE;

export type WishlistReducerAction = {
    type: string;
    payload?: WishlistItemType;
};

const reducer = (state: WishlistStateType, action: WishlistReducerAction): WishlistStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error("action.payload missing in ADD action");
            }

            const { sku, name, price } = action.payload;

            const itemExists = state.wishlist.some((item) => item.sku === sku);

            if (!itemExists) {
                return { ...state, wishlist: [...state.wishlist, { sku, name, price }] };
            }

            return state;
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error("action.payload missing in REMOVE action");
            }

            const { sku } = action.payload;
            const updatedWishlist = state.wishlist.filter((item) => item.sku !== sku);

            return { ...state, wishlist: updatedWishlist };
        }
        case REDUCER_ACTION_TYPE.CLEAR: {
            return { ...state, wishlist: [] };
        }
        default:
            throw new Error("Unidentified reducer action type");
    }
};

const useWishlistContext = () => {
    const [state, dispatch] = useReducer(reducer, initWishlistState);

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE;
    }, []);

    return { dispatch, REDUCER_ACTIONS, wishlist: state.wishlist };
};

export type UseWishlistContextType = ReturnType<typeof useWishlistContext>;

const initWishlistContextState: UseWishlistContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    wishlist: [],
};

const WishlistContext = createContext<UseWishlistContextType>(initWishlistContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const WishlistProvider = ({ children }: ChildrenType): ReactElement => {
    return <WishlistContext.Provider value={useWishlistContext()}>{children}</WishlistContext.Provider>;
};

export default WishlistContext
