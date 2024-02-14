import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { Tabs, Tab } from "react-bootstrap";
import "../style/style.css";

const Details = () => {

  const location = useLocation();
  const restaurant = location.state;
  
  return (
    <Layout>
      <div className="container py-4">
        <div className="resto-banner">
          <img src={restaurant.thumb} alt="" />
        </div>
        <div className="d-flex flex-wrap justify-content-between py-4">
        <h1>{restaurant.name}</h1>
        <button className=" btn btn-danger">Place Order</button>
        </div>
        <div className="details">
          <Tabs defaultActiveKey="home" id="tab">
            <Tab eventKey="home" title="Overview">
              <h5 className="mt-3">{restaurant.locality}</h5>
              <h5>Cuisine</h5>
                <p>{restaurant.Cuisine[0].name}</p>
              <h5>Average Cost</h5>
              <p>{restaurant.cost} ₹</p>
            </Tab>
            <Tab eventKey="profile" title="Contact">
              <h5 className="mt-3">Phone Number</h5>
              <p className="text-danger">555-123-4567</p>
              <h5>{restaurant.name}</h5>
              <p>{restaurant.address}</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
