import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {

    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
            .catch(error => console.error(error));
    }, [])


    // load cart from local storage
    useEffect(() => {
        console.log(bottles.length);
        if (bottles.length > 0) {
            const storedCart = getStoredCart();
            console.log(storedCart, bottles);
            const savedCart = [];
            for (const id of storedCart) {
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if (bottle) {
                    savedCart.push(bottle)
                }
            }
            console.log('saved cart', savedCart);
            setCart(savedCart);
        }
    }, [bottles])


    const handleAddToCart = bottle => {
        // console.log('Bottle is going to be added');
        // console.log(bottle);
        const newCart = [...cart, bottle];
        setCart(newCart);

        // adding cart data to local storage
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id => {
        // 1. remove from visual cart
        //2. remove from local storage
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart)
        removeFromLS(id);
        
    }

    return (
        <div>
            <h2>Bottles available: {bottles.length} </h2>
            {/* <h4>Cart: {cart.length}</h4> */}
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottles">
                {
                    bottles.map(bottle => <Bottle key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}
                    ></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;