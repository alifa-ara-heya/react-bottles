import './Bottle.css'
import PropTypes from 'prop-types';
const Bottle = ({bottle, handleAddToCart}) => {
    // console.log(bottle);
    const {price, img, name} = bottle;
    return (
        <div className="bottle">
            <h2>Bottle: {name}</h2>
            <img src={img} alt="" />
            <p>Price: ${price}</p>
            <button onClick={()=>handleAddToCart(bottle)}>Purchase</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handleAddToCart: PropTypes.func.isRequired
}


export default Bottle;