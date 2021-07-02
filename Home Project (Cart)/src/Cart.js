import React, { useState } from "react";

const Cart = () => {
  const [Cart, setCart] = useState([]);

  function clicked(e) {
    console.log(e);
    for (let i = 0; i < Cart.length; i++) {
      // eslint-disable-next-line
      if (Cart[i][0] == e[0]) {
        console.log("found", e);
        return;
      }
    }
    e.push(1);
    // setCart([...Cart, e]);
    Cart.push(e);
    setCart([...Cart]);
    calcTotal();
    console.log(Cart);
  }

  function quanChanged(e) {
    let { name, value } = e.target;
    for (let i = 0; i < Cart.length; i++) {
      // eslint-disable-next-line
      if (Cart[i][0] == name) {
        if (isNaN(value) || value < 1) {
          value = 1;
        }
        Cart[i][2] = value;
        setCart([...Cart]);
        calcTotal();
        console.log(Cart[i]);
      }
    }
  }
  const [Total, setTotal] = useState(0);

  function calcTotal() {
    let price = 0;
    Cart.forEach((element) => {
      price += element[1] * element[2];
    });
    setTotal(price);
  }

  function removeItem(x) {
    for (let i = 0; i < Cart.length; i++) {
      // eslint-disable-next-line
      if (Cart[i][0] == x) {
        console.log(Cart.splice(i, 1));
        setCart([...Cart]);
        calcTotal();
        return;
      }
    }
  }

  function checkout() {
    Cart.splice(0);
    setCart([]);
    console.log(Cart);
    calcTotal();
  }

  return (
    <>
    <div id="bd">
      <div className="container">
        <h1 className="text-center">Our Products</h1>
        <div className="items">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product-1</h5>
              <p className="card-text">Rs. 100</p>
              <button
                className="btn btn-success"
                onClick={() => clicked(["Product-1", 100])}
              >
                Add to cart
              </button>
            </div>
          </div>
          <br></br>
          <hr></hr>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product-2</h5>
              <p className="card-text">Rs. 200</p>
              <button
                className="btn btn-success"
                onClick={() => clicked(["Product-2", 200])}
              >
                Add to cart
              </button>
            </div>
          </div>
          <br></br><hr></hr>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product-3</h5>
              <p className="card-text">Rs. 300</p>
              <button
                className="btn btn-success"
                onClick={() => clicked(["Product-3", 300])}
              >
                Add to cart
              </button>
            </div>
          </div>
          <br></br><hr></hr>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product-4</h5>
              <p className="card-text">Rs. 400</p>
              <button
                className="btn btn-success"
                onClick={() => clicked(["Product-4", 400])}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <br></br><hr></hr>
          <h1 className="text-center">CART</h1>
          <div className="items">
            {Cart.map((item) => {
              return (
                <div className="card" key={item[0]}>
                  <div className="card-body">
                    <h3 className="card-title">{item[0]}</h3>
                    Quantity:
                    <input
                      className="card-input"
                      type="number"
                      value={item[2]}
                      name={item[0]}
                      onChange={quanChanged}
                    ></input>
                    <p className="card-text">Price: {item[1] * item[2]}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item[0])}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="text-center">
              <h2>Total: Rs.{Total}</h2>
              <button className="btn btn-primary chkout" id="bd1" onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Cart;
