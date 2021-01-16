import React, {createContext, useState} from 'react';

export const RestaurantsContext = createContext({})

export function RestaurantsContextProvider(props) {
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurants, setSelectedRestaurants] = useState([])

    const addRestaurants = (restaurant) => {
        setRestaurants([restaurant, ...restaurants])
    }

    return (
        <RestaurantsContext.Provider value={{
            restaurants,
            setRestaurants,
            addRestaurants,
            selectedRestaurants,
            setSelectedRestaurants
        }}>
            {props.children}
        </RestaurantsContext.Provider>
    );
}

