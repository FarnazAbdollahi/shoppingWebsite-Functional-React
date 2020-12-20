import React from 'react'
import './Checkout.css'

const CheckoutItem = (props) => {
    // constructor(props) {
    //     super(props)
    //     this.inputRef = React.createRef()
    // }

    return (
        <tr>
            <td>{props.count}</td>
            <td>{`${props.price} تومان`}</td>
            <td >{props.title}</td>
            <td><img className="chosen-product-image" alt="img" src={props.image} /></td>
            <td>&times;</td>
        </tr>

    )

}
export default CheckoutItem