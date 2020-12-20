import React from 'react'
import Cart from './Cart'
import './CartBox.css'
import { Link } from 'react-router-dom'

const CartBox = (props) => {


    const shoppingCartClose = () => {
        document.getElementById("shopping-cart").style.width = "0"
        console.log("close")
    }

    return (
        <div id="shopping-cart" className="sidenav">
            <div>
                <button className="close-btn" onClick={shoppingCartClose}>&times;</button>
            </div>
            <ul className="cart-list">
                {props.selectedProductsList.map((item, index) => {
                    return (
                        <Cart
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.img}
                            count={item.count}
                            changeCount={() => props.changeCount(item.id)}
                            add={() => props.addProduct(item.id)}
                            delete={() => props.deleteProduct(item.id)}
                        />
                    )
                })}
            </ul>

            <div className="cart-footer">
                <p className="total-price">مجموع پرداختی: {props.totalPrice}</p>
                <p className="purchase-handler">
                    <Link to="/checkout-order" onClick={props.purchaseHandler}>ثبت سفارش</Link>
                </p>

            </div>
        </div >)

}
export default CartBox