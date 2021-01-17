import React, {useContext, useEffect} from 'react';
import StarRating from "./StarRating";
import RestaurantFinder from "../api/RestaurantFinder";
import {useParams} from "react-router-dom";
import {RestaurantsContext} from "../context/RestaurantsContext";

function Reviews() {
    const {id} = useParams()
    const {reviews, setReviews} = useContext(RestaurantsContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setReviews(response.data.data.reviews)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    return (
        <div className='row row-cols-3 mb-2'>
              {
                  reviews.map(review =>
                    <div key={review.id} className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "30%"}}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span> <StarRating rating={review.rating}/> </span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Reviews;