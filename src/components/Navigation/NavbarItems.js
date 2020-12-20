import React, { useContext } from 'react'
import "./NavbarItems.css"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import Wrapper from '../../hoc/Wrapper'

const NavbarItems = () => {

    const authContext = useContext(AuthContext)

    const shoppingCartOpen = () => {
        document.getElementById("shopping-cart").style.width = "26rem"
        console.log(document.getElementById("shopping-cart"))
    }

    return (
        <Wrapper>
            <div className="navbar" id="main">
                <h3 className="store-name">فروشگاه سبزیجات</h3>
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link to="/">خانه</Link>
                    </li>
                    {!authContext.isAuth && <li className="nav-item">
                        <Link to="/sign-in">ورود</Link>
                    </li>}

                    {!authContext.isAuth && <li className="nav-item">
                        <Link to="/sign-up">عضویت</Link>
                    </li>}

                    {authContext.isAuth && <li className="nav-item">
                        <a onClick={shoppingCartOpen} href="#">سبد خرید</a>
                    </li>}
                </ul >
            </div >
        </Wrapper>
    )
}

export default NavbarItems