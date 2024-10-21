const getStoredCart = () => {
    const storedCartString = localStorage.getItem('cart');
    if (storedCartString) {
        return JSON.parse(storedCartString);
    }
    return [];
}

const saveCartToLS = cart => {
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified)
}

const addToLS = id => {
    const cart = getStoredCart();
    cart.push(id);
    //save to local storage
    saveCartToLS(cart);
}

const removeFromLS = id => {
   
    const cart = getStoredCart(); //getStoredCart gives an array
    // removing every item of the same id. If we want to remove only one item, we will use slice, and remove with the index.
    const remaining = cart.filter(idx => idx!== id);
    saveCartToLS(remaining)

}

export { addToLS, getStoredCart, removeFromLS}