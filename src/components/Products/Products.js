import React from 'react'
import Product from '../../components/Product/Product'
import './Products.css'

const Products = (props) => {

    return (
        <div className="products" >
            {< h2 className="top-products" > محصولات برتر</h2>}
            {
                props.children.map((item, index) => {
                    return (<Product
                        key={item.id}
                        title={item.title}
                        type={item.type}
                        price={item.price}
                        img={item.img}
                        add={() => props.addProduct(item.id)}
                        delete={() => props.deleteProduct(item.id)}
                    >
                    </Product>)
                })
            }
        </div >
    )
}


export default Products