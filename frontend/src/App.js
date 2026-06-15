import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const products = [
  { id: 1, name: "Fresh Apples", price: 120, unit: "kg", image: "https://via.placeholder.com/150?text=Apples" },
  { id: 2, name: "Organic Milk", price: 60, unit: "litre", image: "https://via.placeholder.com/150?text=Milk" },
  { id: 3, name: "Tomatoes", price: 40, unit: "kg", image: "https://via.placeholder.com/150?text=Tomatoes" },
  { id: 4, name: "Potatoes", price: 30, unit: "kg", image: "https://via.placeholder.com/150?text=Potatoes" },
];

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const register = async () => {
    try {
      const res = await axios.post(`${API_URL}/register`, { email, password, mobile });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Registration failed. Check connection.");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setMessage(res.data.message);
      setLoggedIn(true);
    } catch (err) {
      setMessage("Login failed. Check credentials.");
    }
  };

  if (loggedIn) {
    return (
      <div className="dashboard">
        <nav className="navbar">
          <h1>CloudCart</h1>
          <div className="nav-info">
            <span>Items in Cart: {cart.length}</span>
            <button className="logout-btn" onClick={() => setLoggedIn(false)}>Logout</button>
          </div>
        </nav>
        <div className="main-content">
          <h2>Fresh Grocery Collection</h2>
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p className="price">₹{p.price} / {p.unit}</p>
                <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        
        {!isLogin && (
          <input 
            type="text" 
            placeholder="Mobile Number" 
            onChange={(e) => setMobile(e.target.value)} 
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email Address" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button className="submit-btn" onClick={isLogin ? login : register}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
        
        {message && <p className="status-msg">{message}</p>}
      </div>
    </div>
  );
}

export default App;
