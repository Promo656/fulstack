import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantFinder from "../api/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";

function RestaurantDetailPage() {
    const {id} = useParams()
    const {selectedRestaurants, setSelectedRestaurants, reviews, setReviews} = useContext(RestaurantsContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setSelectedRestaurants(response.data.data.restaurant)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1 className='display-4 text-center'>{selectedRestaurants.name}</h1>
            <div className="text-center">
                <StarRating rating={selectedRestaurants.average_rating}/>
                <span
                    className='text-warning ml-1'>{selectedRestaurants.count ? `(${selectedRestaurants.count})` : "(0)"}</span>
            </div>
            <Reviews/>
            <AddReview/>
        </div>
    )
        ;
}

export default RestaurantDetailPage;