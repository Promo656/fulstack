import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import {RestaurantsContextProvider} from "./context/RestaurantsContext";

function App() {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Switch>
                    <Route exact path='/' render={() => <Home/>}/>
                    <Route exact path='/restaurants/:id/update' render={() => <UpdatePage/>}/>
                    <Route exact path='/restaurants/:id' render={() => <RestaurantDetailPage/>}/>
                </Switch>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App;
