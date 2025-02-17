import { useContext } from "react";
import WishlistContext from "../context/WishlistProvider";
import { UseWishlistContextType } from "../context/WishlistProvider";

const useWishlist = (): UseWishlistContextType => {
    return useContext(WishlistContext);
};

export default useWishlist;
