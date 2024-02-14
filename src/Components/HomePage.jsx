import React, { useState }  from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../style/style.css'
import QuickSearches from './QuickSearches'
import { useEffect } from "react";
import {  fetchRestaurantsList } from "../features/restaurants/restaurantSlice";
import { Typeahead } from "react-bootstrap-typeahead";

export const HomePage = () => {

  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedResto, setSelectedResto] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restoList }= useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurantsList());
  }, [dispatch]);

  const cityList = restoList.reduce((values,item)=> {
    if (!values.includes(item.city)) {
        values.push(item.city);
    }
    return values;
  },[]);

  const handleCitySelection=(value)=>{
    setSelectedCity(value);
  }
  const filteredRestaurants  = setSelectedCity ? restoList.filter(restaurant=>restaurant.city === selectedCity[0]): [];

  const handleRestoSelection= (resto)=>{
    setSelectedResto(resto);
    navigate("/details",{state:resto[0]});
  }

  return (
    <>
    <div className="container-xxxl header-img">
                <div className="header-blend d-flex flex-column align-items-center justify-content-center container-fluid">
                <div className="container text-right pt-3">
                    <button className="login btn border-0">Login</button>
                    <button className="createA btn rounded-1">Create an account</button>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center text-center px-4 pt-3 pb-5">
                        <div className="logo rounded-circle text-center">
                            <p className='px-4'>e!</p>
                        </div>
                        <h1 className='head-title pb-3'>Find the best restaurants, cafes, and bars</h1>
                        <div className="search-box container d-flex flex-wrap gap-2 align-items-center justify-content-center">
                             <Typeahead
                              id='location-typehead'
                              className='p-3 flex-grow-1'
                              labelKey="name"
                              onChange={(selected)=>handleCitySelection(selected)}
                              options={cityList}
                              selected={selectedCity}
                              placeholder="type a city name..."
                            />
                             <Typeahead
                              id='restaurants-typehead'
                              className='p-3 flex-grow-1'
                              labelKey="name"
                              onChange={(selected)=>handleRestoSelection(selected)}
                              options={filteredRestaurants}
                              selected={selectedResto}
                              placeholder="Search for restaurants..."
                              />
                        </div>
                </div>
                </div>
            </div>
            <QuickSearches/>
    </>
  )
}
