import React from 'react'
import './Cart.css'

const Cart = (props) => {

    return (
        < li className="chosen-product"  >
            <img className="chosen-product-image" alt="img" src={props.image} />
            <p className="chosen-product-title">{props.title}</p>
            <p className="chosen-product-price">{`${props.price} تومان`}</p>
            <div className="product-count">
                <button id="add" className="btn" onClick={props.add}>&#43;</button>
                <input
                    // ref={inputRef}
                    type="text"
                    id={props.id}
                    className="chosen-product-count"
                    value={props.count}
                    onChange={props.changeCount}
                />
                <button id="delete" className="btn" onClick={props.delete}>&minus;</button>
            </div>
        </li >
    )

}
export default Cart