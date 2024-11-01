import { useEffect, useState } from "react";
import * as productService from "../../service/ProductService";
import { Link, useNavigate } from "react-router-dom";
import * as categoryService from "../../service/CategoryService";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    useEffect(() => {
        getAllProducts(searchName, searchCategory);
    }, [searchName, searchCategory]);

    const getAllProducts = async (searchName, searchCategory) => {
        let products = await productService.getAllStudents(searchName, searchCategory);
        setProducts(products);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        let categories = await categoryService.getAllCategories();
        setCategories(categories);
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (confirmDelete) {
            const result = await productService.deleteProduct(productId);
            if (result) {
                alert("Sản phẩm đã được xóa thành công!");
                getAllProducts(searchName, searchCategory); // Cập nhật danh sách sản phẩm
            } else {
                alert("Đã xảy ra lỗi khi xóa sản phẩm.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={searchName}
                    placeholder="Nhập tên sản phẩm"
                    onChange={(e) => setSearchName(e.target.value)}
                /><br />
                <select
                    className="form-control ml-3"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                >
                    <option value="">Chọn thể loại</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select><br />
                <Link to="/createProduct" className="btn btn-primary">Thêm mới</Link>
            </div>

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Thể loại</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Ngày nhập</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.category.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.date}</td>
                            <td>
                                <Link to={`/EditProduct/${item.id}`} className="btn btn-warning mr-2">Sửa</Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
