import React, {useState} from 'react';
import RestaurantFinder from "../api/RestaurantFinder";
import {useHistory, useParams, useLocation} from "react-router-dom";

function AddReview() {
    const {id} = useParams()
    let history = useHistory()
    let location = useLocation()
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await RestaurantFinder.post(`/${id}/addReview`, {name, review: reviewText, rating})
            history.push('/')
            history.push(location.pathname)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='mb-2'>
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id='name'
                            placeholder='name'
                            value={name}
                            onChange={(event => setName(event.currentTarget.value))}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select
                            id="rating"
                            className='custom-select'
                            value={rating}
                            onChange={(event => setRating(event.currentTarget.value))}
                        >
                            <option disabled>Rating</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea
                        id='Review'
                        className='form-control'
                        value={reviewText}
                        onChange={event => setReviewText(event.currentTarget.value)}
                    ></textarea>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary" type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default React.memo(AddReview);