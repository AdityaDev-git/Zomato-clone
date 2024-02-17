import React from "react";
import Layout from "../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../features/stripe/stripeSlice";
import { useLocation } from "react-router-dom";
import "../style/style.css";
import { IoRadioButtonOn } from "react-icons/io5";

const Cart = () => {

  const location = useLocation();
  const menuItems = location.state;
  const dispatch = useDispatch();
  const {isPayment }= useSelector((state) => state.stripe);
  let selected;

  const handleAdd=(id)=>{
    selected = menuItems.find((i)=>i.img === id);
    console.log(selected);
  }
    const handleClickPay=()=>{
        dispatch(payment(selected))
        console.log(isPayment);
    }

  return (
    <Layout>
      <div className="container py-4">
        {menuItems.map((menu) => (
            <div key={menu.img}>
          <div className="menucard" >
            <div className="menu-l">
              <IoRadioButtonOn className={menu.type === "veg" ? "text-success" : "text-danger"} />
              <h5>{menu.name}</h5>
              <h6>{menu.price}</h6>
              <p>{menu.desc}</p>
            </div>
            <div className="menu-r">
              <img src={menu.img} alt="" />
              <div className="d-flex align-items-center justify-content-center p-1">
                <button className="btn btn-sm btn-outline-danger mr-1" onClick={handleAdd(menu.img)} >Add</button>
              </div>
            </div>
          </div>
            <hr />
            </div>
        ))}
        <div className="d-flex align-items-baseline justify-content-between w-100">
          <h5 className="text-success">Subotal: $100</h5>
          <button className="btn btn-danger" onClick={()=>handleClickPay()}>Pay Now</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
