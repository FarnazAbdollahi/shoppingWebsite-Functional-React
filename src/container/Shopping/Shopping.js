import React, { useState, useEffect, useContext } from 'react'
import Wrapper from '../../hoc/Wrapper'
import Products from '../../components/Products/Products'
import CartBox from '../../components/cart/CartBox'
import Loader from '../../components/Loader/Loader'
import axios from '../../axios-orders'
import { AuthContext } from '../../context/auth-context'

const Shopping = () => {
    const [products, setProducts] = useState(null)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)

    const authContext = useContext(AuthContext)


    useEffect(() => {
        axios.get('https://functional-shop-default-rtdb.firebaseio.com/products.json')
            .then((response) => {
                setProducts(response.data)
            })
    })


    const deleteProductFromCart = (itemID) => {

        let element = selectedProducts.find((item) => {
            return item.id === itemID
        })
        if (element === undefined) {
            window.alert("Item is not selected")
        }
        else if (element.count === 1) {
            setSelectedProducts(selectedProducts.splice(selectedProducts.findIndex(index => index.id === itemID), 1))
            element.count = 0
        }
        else {
            let oldCount = element.count
            let newCount = oldCount - 1
            element.count = newCount
        }
        setSelectedProducts(selectedProducts)
        totalPriceHandler()
    }

    const addProductToCard = (itemID) => {
        let element = selectedProducts.find((item) => item.id === itemID)
        if (element === undefined) {
            let selectedPro = products[itemID]
            selectedPro.count = 1
            let updatedProducts = selectedProducts.concat(selectedPro)
            setSelectedProducts([...updatedProducts])

        }
        else {
            let oldCount = element.count
            let newCount = oldCount + 1
            element.count = newCount

            setSelectedProducts([...selectedProducts])
        }
        totalPriceHandler()
    }

    const changeCountHandler = (itemID, event) => {
        let element = selectedProducts.find((item) => {
            return item.id === itemID
        })
        if (element.count <= event.target.value) {
            deleteProductFromCart(itemID)
        }
        else {
            addProductToCard(itemID)
        }


    }

    const totalPriceHandler = () => {

        let itemPrice = 0
        let updatedTotalPrice = 0
        let totalPriceOfEachProduct = 0
        let i = 0

        totalPriceOfEachProduct = selectedProducts.map((item) => {
            itemPrice = Number(item.count) * Number(item.price)
            totalPriceOfEachProduct = Number(updatedTotalPrice) + Number(itemPrice)
            return totalPriceOfEachProduct
        })

        for (i = 0; i < totalPriceOfEachProduct.length; i++) {
            console.log(i)
            updatedTotalPrice = updatedTotalPrice + totalPriceOfEachProduct[i]
        }
        setTotalPrice(updatedTotalPrice)
    }

    const purchasedProductsHandler = () => {
        console.log("redirected")
        setLoading(true)

        axios.post('/orders.json', { order: selectedProducts, totalPrice: totalPrice })
            .then((response) => {
                setLoading(false)

            })
            .catch((error) => {
                setLoading(false)
            })


    }
    let productsControl = <Loader />
    if (products) {
        productsControl = (
            <Products
                addProduct={addProductToCard}
                deleteProduct={deleteProductFromCart}
            >
                {products}
            </Products>
        )
    }

    return (
        <Wrapper>
            <CartBox
                selectedProductsList={selectedProducts}
                totalPrice={totalPrice}
                changeCount={changeCountHandler}
                addProduct={addProductToCard}
                deleteProduct={deleteProductFromCart}
                purchaseHandler={purchasedProductsHandler}
            >
            </CartBox>
            {productsControl}
        </Wrapper>
    )
}


export default Shopping