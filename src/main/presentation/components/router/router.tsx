import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../../pages";

const Router: React.FC = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login validation={undefined}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router