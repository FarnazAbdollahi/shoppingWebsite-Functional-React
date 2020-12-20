import React, { useState, useEffect } from 'react'
import './Checkout.css'
import CheckoutItem from './CheckoutItem'
import axios from '../../axios-orders'


const Checkout = (props) => {
    const [cart, setCart] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)

    useEffect(() => {
        axios.get('https://functional-shop-default-rtdb.firebaseio.com/orders.json',)
            .then((response) => {
                let key = Object.keys(response.data)
                let data = response.data[key[key.length - 1]].order
                let totalPrice = response.data[key[key.length - 1]].totalPrice
                setCart(data)
                setTotalPrice(totalPrice)
            })
    })

    return (
        <div className="checkout">
            <h2> سفارش من</h2>
            {cart ?
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>تعداد</th>
                            <th>قیمت</th>
                            <th>نام محصول</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => {
                                return (
                                    <CheckoutItem
                                        key={index}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        image={item.img}
                                        count={item.count}
                                        changeCount={() => props.changeCountHandler(item.id)}
                                    />
                                )
                            })}
                    </tbody>
                </table>

                : <h1>سبدخرید شما خالی است</h1>}
            <p className="total-price">مجموع پرداختی: {totalPrice}</p>
            <p className="purchase-handler">
                <a href="/"> تایید سفارش و پرداخت</a>
            </p>
        </div>
    )
}

export default Checkout