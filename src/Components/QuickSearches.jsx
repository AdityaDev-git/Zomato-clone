import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMealType } from "../features/restaurants/restaurantSlice";


const QuickSearches = () => {
  const dispatch = useDispatch();
  const mealtype = useSelector((state) => state.restaurant.meal);

  useEffect(() => {
    dispatch(fetchMealType());
  }, [dispatch]);

  return (
    <>
      <div className="container py-4 px-4">
        <h1>Quick Searches</h1>
        <p>Discover restaurants by type of meal</p>
        <div className="wrapper align-items-center justify-content-center mt-3" >
        {mealtype.map(item =>(
            <div className="mealcard" key={item._id}>
              <div className="mealcard-img">
                <img src={item.image} alt="" />
              </div>
              <div className="d-flex flex-column justify-content-center px-4">
                <h3>{item.name}</h3>
                <p>{item.content}</p>
              </div>
            </div>
        ))}
          </div>
      </div>
    </>
  );
};

export default QuickSearches;
