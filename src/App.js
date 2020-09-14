import React, {Component} from "react";
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import PosterList from "./components/PosterList"
import AddPoster from "./components/AddPoster";
import PosterCart from "./components/PosterCart";
import data from "./Data";
import Context from "./Context";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            posters: [],
            cart: {}
        };
        this.routerRef = React.createRef();
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        let posters = localStorage.getItem("posters");
        let cart = localStorage.getItem("cart");

        user = user ? JSON.parse(user) : null;
        posters = posters ? JSON.parse(posters) : data.initProducts;
        cart = cart ? JSON.parse(cart) : {};

        this.setState({user, posters, cart});
    }

    login = (usn, pwd) => {
        let user = data.users.find(u => u.username === usn && u.password === pwd);
        if (user) {
            this.setState({user});
            localStorage.setItem("user", JSON.stringify(user));
            return true;
        }
        return false;
    };

    logout = e => {
        e.preventDefault();
        this.setState({user: null});
        localStorage.removeItem("user");
    };
    addProduct = (poster, callback) => {
        let posters = this.state.posters.slice();
        posters.push(poster);
        localStorage.setItem("posters", JSON.stringify(posters));
        this.setState({posters}, () => callback && callback());
    };
    addToCart = cartItem => {
        let cart = this.state.cart;
        if (cart[cartItem.id]) {
            cart[cartItem.id].amount += cartItem.amount;
        } else {
            cart[cartItem.id] = cartItem;
        }
        if (cart[cartItem.id].amount > cart[cartItem.id].poster.stock) {
            cart[cartItem.id].amount = cart[cartItem.id].poster.stock;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({cart});
    };
    removeFromCart = cartItemId => {
        let cart = this.state.cart;
        delete cart[cartItemId];
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({cart});
    };
    clearCart = () => {
        let cart = {};
        localStorage.removeItem("cart");
        this.setState({cart});
    };
    checkout = () => {
        if (!this.state.user) {
            this.routerRef.current.history.push("/login");
            return;
        }
        const cart = this.state.cart;
        const posters = this.state.posters.map(p => {
            if (cart[p.name]) {
                p.stock = p.stock - cart[p.name].amount;
            }
            return p;
        });
        this.setState({posters});
        this.clearCart();
    };

    render() {
        return (
        <Context.Provider
        value={{
            ...this.state,
            removeFromCart: this.removeFromCart,
            addToCart: this.addToCart,
            login: this.login,
            addProduct: this.addProduct,
            clearCart: this.clearCart,
            checkout: this.checkout
        }}
        >
            <Router ref={this.routerRef}>
                <div className="App">
                    <nav
                    className="navbar container"
                    role="navigation"
                    aria-label="main navigation"
                    >
                        <div className="navbar-brand">
                            <Link className="navbar-item is-size-4 " to="/">
                                printed inc.
                            </Link>
                            <a
                            role="button"
                            className="navbar-burger burger"
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                            onClick={e => {
                                e.preventDefault();
                                this.setState({showMenu: !this.state.showMenu});
                            }}
                            >
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>
                        <div className={`navbar-menu ${
                        this.state.showMenu ? "is-active" : ""
                        }`}>
                            <Link to="/posters" className="navbar-item">
                                Posters
                            </Link>
                            {this.state.user && this.state.user.accessLevel < 1 && (
                            <Link to="/add-poster" className="navbar-item">
                                Add Poster
                            </Link>
                            )}
                            <Link to="/cart" className="navbar-item">
                                Cart
                                <span className="tag is-primary" style={{marginLeft: "5px"}}>
                                    {Object.keys(this.state.cart).length}
                                </span>
                            </Link>
                            {!this.state.user ? (
                            <Link to="/login" className="navbar-item">
                                Admin Login
                            </Link>
                            ) : (
                            <a className="navbar-item" onClick={this.logout}>
                                Logout
                            </a>
                            )}
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={PosterList}/>
                        <Route exact path="/login" component={AdminLogin}/>
                        <Route exact path="/posters" component={PosterList}/>
                        <Route exact path="/add-poster" component={AddPoster}/>
                        <Route exact path="/cart" component={PosterCart}/>
                    </Switch>
                </div>
            </Router>
        </Context.Provider>
        );
    }

}

export default App;
