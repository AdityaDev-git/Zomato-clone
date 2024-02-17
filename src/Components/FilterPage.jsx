import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredRestaurants } from "../features/restaurants/restaurantSlice";
import '../style/style.css'


const FilterPage = () => {
    const location = useLocation();
  const [filterValues, setFilterValues] = useState({
    mealtype: location.state.toLowecase,
    cuision: [],
    location: "",
    lcost: undefined,
    hcost: undefined,
    sort: 1,
  });
  const [page,setPage]=useState(1)
  const itemsPerPage = 2;
  let startIndex = itemsPerPage * page - itemsPerPage;
  let endIndex = itemsPerPage * page; 

  const meal = location.state;
  const dispatch = useDispatch();
  const restaurantsList = useSelector((state) => state.restaurant.filterData);


  useEffect(() => {
    dispatch(fetchFilteredRestaurants(filterValues));
  }, [dispatch, filterValues]);
//   console.log(restaurantsList);

  // Function to update filterValues
  const updateFilterValues = (newValues) => {
    setFilterValues((prevValues) => ({
      ...prevValues, // Maintain the previous state
      ...newValues, // Overwrite with new values
    }));
  };

  const changeCity = (e) => {
    updateFilterValues({
      location: e.target.value,
    });
  };

  const changeCuisine = (e,cuision) => {
    updateFilterValues({
      cuision: cuision.split(""),
    });
  };
  const changeCost = (e,lcost,hcost) => {
    updateFilterValues({
      lcost: lcost,
      hcost: hcost,
    });
  };
  const changeSort = (e,sortOrder) => {
    updateFilterValues({
      sort: sortOrder,
    });
  };

  const handlePage=(e,value)=>{
    if (page>1 && value === "minus") {
       setPage( page - 1)
       console.log(value);
    }
    if (page<restaurantsList.length && value === "plus") {
        setPage(page + 1)    
    }
  }

  return (
    <Layout>
      <div className="container py-4">
        <h1>{`${meal} Places`}</h1>
        <div className="filter-wraper">
            
            {/* filter  */}
          <div className="card py-3 px-4 left">
            <form action="">
              <p>select location</p>
              <div className="dropdown mb-3">
                <select name="Select Location" id="" onChange={changeCity}>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Gurgaon">Gurgaon</option>
                </select>
              </div>
              <div className="checkbox">
                <p>Cuisine</p>
                <ul role="list" className="pl-0">
                  <li>
                    <input type="checkbox" id="cuision-1" name="cuision" value="South Indain" onChange={(e) => changeCuisine(e, "South Indain")} />
                    <label htmlFor="cuision-1">South Indain</label>
                  </li>
                  <li>
                    <input type="checkbox" id="cuision-2" name="cuision" value="North Indain" onChange={(e) => changeCuisine(e, "North Indain")} />
                    <label htmlFor="cuision-2">North Indain</label>
                  </li>
                  <li>
                    <input type="checkbox" id="cuision-3" name="cuision" value="Chinese" onChange={(e) => changeCuisine(e, "Chinese")} />
                    <label htmlFor="cuision-3">Chinese</label>
                  </li>
                  <li>
                    <input type="checkbox" id="cuision-4" name="cuision" value="Fastfood" onChange={(e) => changeCuisine(e, "FastFood")} />
                    <label htmlFor="cuision-4">FastFood</label>
                  </li>
                  <li>
                    <input type="checkbox" id="cuision-5" name="cuision" value="Street Food" onChange={(e) => changeCuisine(e, "Street Food")} />
                    <label htmlFor="cuision-5">Street Food</label>
                  </li>
                </ul>
              </div>
              <div className="radio">
                <p>Cost for two</p>
                <ul role="list" className="pl-0">
                  <li>
                    <input type="radio" id="radio-1" name="cost" value="500" onChange={(e) => changeCost(e, 0, 500)} />
                    <label htmlFor="radio-1">Less than 500</label>
                  </li>
                  <li>
                    <input type="radio" id="radio-2" name="cost" value="500" onChange={(e) => changeCost(e, 500, 1000)} />
                    <label htmlFor="radio-2">500 to 1000</label>
                  </li>
                  <li>
                    <input type="radio" id="radio-3" name="cost" value="500" onChange={(e) => changeCost(e, 1000, 1500)} />
                    <label htmlFor="radio-3">1000 to 1500</label>
                  </li>
                  <li>
                    <input type="radio" id="radio-4" name="cost" value="500" onChange={(e) => changeCost(e, 1500, 2000)} />
                    <label htmlFor="radio-4">1500 to 2000</label>
                  </li>
                  <li>
                    <input type="radio" id="radio-5" name="cost" value="500" onChange={(e) => changeCost(e, 2000, 5000)} />
                    <label htmlFor="radio-5">2000+</label>
                  </li>
                </ul>
              </div>
              <div className="sort">
                <p>Sort</p>
                <ul role="list" className="pl-0">
                  <li>
                    <input type="radio" id="low-high" name="sort" value="1" onChange={(e)=>changeSort(e,1)} />
                    <label htmlFor="low-high">Price low to high</label>
                  </li>
                  <li>
                    <input type="radio" id="high-low" name="sort" value="-1" onChange={(e)=>changeSort(e,-1)} />
                    <label htmlFor="high-low">Price high to low</label>
                  </li>
                </ul>
              </div>
            </form>
          </div>

          {/* restaurant */}
          <div className="right">
            {restaurantsList.length>0?
             restaurantsList.slice(startIndex,endIndex).map((restaurant) => (
              <div className="card p-3" key={restaurant._id}>
                <div className="card-head d-flex align-items-center">
                  <div>
                    <img className="img-thumb mr-3" src={restaurant.thumb} alt="" />
                  </div>
                  <div>
                    <h3>{restaurant.name}</h3>
                    <h5>{restaurant.locality}</h5>
                    <p>{restaurant.address}</p>
                  </div>
                </div>
                  <hr/>
                <div className="card-detail">
                  <p>
                    <span>Cusines : </span> <span>Bakery</span>
                  </p>
                  <p>
                    <span>Cost for two : </span> <span>{restaurant.cost}</span>
                  </p>
                </div>
              </div>
            ))
        : <div className="card"><h3>No Result Found</h3></div>
        }

        {/* pagination  */}
        {restaurantsList.length>0?
        <div>
            <button className="btn btn-primary" onClick={(e)=>handlePage(e,"minus")}>&lt;</button>
            <button className="btn">{page}</button>
            <button className="btn btn-primary" onClick={(e)=>handlePage(e,"plus")}>&gt;</button>
        </div>
            :null
        }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FilterPage;
