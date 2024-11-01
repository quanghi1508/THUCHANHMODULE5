import './App.css';
import React from "react";
import CategoryList from "./components/category/CategoryList";
import ProductList from "./components/product/ProductList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ProductCreate from "./components/product/ProductCreate";
import EditProduct from "./components/product/EditProduct";

function App() {
    return (
        <BrowserRouter>
            <div className="container mt-5">
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">Cửa hàng thuốc</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink
                                        to="/listCategory"
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                                    >
                                        Danh sách loại sản phẩm
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/listProducts"
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                                    >
                                        Danh sách sản phẩm
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/createProduct"
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                                    >
                                        Thêm sản phẩm mới
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <div className="col-md-12">
                        <Routes>
                            <Route path="/listCategory" element={<CategoryList />} />
                            <Route path="/listProducts" element={<ProductList />} />
                            <Route path="/createProduct" element={<ProductCreate />} />
                            <Route path="/editProduct/:id" element={<EditProduct />} />
                        </Routes>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
