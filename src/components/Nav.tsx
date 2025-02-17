type PropsType = {
    viewCart: boolean;
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
    viewWishlist: boolean;
    setViewWishlist: React.Dispatch<React.SetStateAction<boolean>>;
    sortOrder: "asc" | "desc";
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};

const Nav = ({ viewCart, setViewCart, viewWishlist, setViewWishlist, sortOrder, setSortOrder }: PropsType) => {
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <nav className="nav">
            {!viewWishlist && (
                <button onClick={() => setViewCart(!viewCart)}>
                    {viewCart ? "View Products" : "View Cart"}
                </button>
            )}
            {!viewCart && (
                <button onClick={() => setViewWishlist(!viewWishlist)}>
                    {viewWishlist ? "View Products" : "View Wishlist"}
                </button>
            )}
            {!(viewCart || viewWishlist) && (
                <button className="sort__button" onClick={toggleSortOrder}>
                    {sortOrder === "asc" ? "The Highest" : "The Lowest"}
                </button>
            )}
        </nav>
    );
};

export default Nav;
