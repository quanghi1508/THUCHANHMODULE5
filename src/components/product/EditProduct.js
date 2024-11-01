import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import * as productService from "../../service/ProductService";
import * as categoryService from "../../service/CategoryService";

function EditProduct() {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null); // Dùng null cho giá trị khởi tạo
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadProductDetails();
        loadCategories();
    }, []);

    const loadProductDetails = async () => {
        const response = await productService.getProductById(id);
        setProduct({
            ...response,
            category: JSON.stringify(response.category) // Convert category to JSON string for select input
        });
    };

    const loadCategories = async () => {
        const response = await categoryService.getAllCategories();
        setCategories(response);
    };

    const objectValid = {
        code: Yup.string().required("Mã sản phẩm không được để trống!!!")
            .matches(/^PROD-\d{4}$/, 'Mã sản phẩm phải theo định dạng PROD-XXXX !!!'),
        name: Yup.string().required("Tên sản phẩm không được để trống!!!"),
        price: Yup.number().required("Giá sản phẩm không được để trống!!!"),
        quantity: Yup.number().required("Số lượng sản phẩm không được để trống!!!")
            .positive('Số lượng phải lớn hơn 0!!!')
            .integer('Số lượng phải là số nguyên!!!'),
        date: Yup.date().required("Ngày nhập kho không được để trống!!!")
            .max(new Date(), 'Ngày không được lớn hơn ngày hiện tại!!!'),
        description: Yup.string().required("Mô tả sản phẩm không được để trống!!!")
    };

    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const updateProduct = async (value) => {
        value.price = +value.price;
        value.quantity = +value.quantity;
        let date = parseDate(value.date);
        value.date = formatDate(date);
        value.category = JSON.parse(value.category); // Parse category from JSON string

        const result = await productService.updateProduct(id, value);
        if (result) {
            toast.success("Sản phẩm đã được cập nhật thành công!");
            navigate("/listProducts");
        } else {
            toast.error("Đã xảy ra lỗi khi cập nhật sản phẩm.");
        }
    };

    return (
        <>
            {product && (
                <Formik
                    initialValues={product}
                    onSubmit={updateProduct}
                    validationSchema={Yup.object(objectValid)}
                    enableReinitialize // Cho phép reinitialize form khi product thay đổi
                >
                    <>
                        <div className="card">
                            <div className="card-header">
                                <h2>Chỉnh sửa sản phẩm</h2>
                            </div>
                            <div className="card-body">
                                <Form className="container mt-3">
                                    <div className="form-group mb-3">
                                        <label htmlFor="code">Mã sản phẩm:</label>
                                        <Field name="code" className="form-control" />
                                        <ErrorMessage name="code" component="div" className="text-danger" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Tên sản phẩm:</label>
                                        <Field name="name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="category">Thể loại:</label>
                                        <Field name="category" as="select" className="form-control">
                                            <option value="">Chọn thể loại</option>
                                            {categories.map((item) => (
                                                <option key={item.id} value={JSON.stringify(item)}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="category" component="div" className="text-danger" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="price">Giá:</label>
                                        <Field name="price" type="number" className="form-control" />
                                        <ErrorMessage name="price" component="div" className="text-danger" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="quantity">Số lượng:</label>
                                        <Field name="quantity" type="number" className="form-control" />
                                        <ErrorMessage name="quantity" component="div" className="text-danger" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="date">Ngày nhập sản phẩm:</label>
                                        <Field name="date" type="date" className="form-control" />
                                        <ErrorMessage name="date" component="div" className="text-danger" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Mô tả sản phẩm:</label>
                                        <Field name="description" as="textarea" className="form-control" />
                                        <ErrorMessage name="description" component="div" className="text-danger" />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                                </Form>
                            </div>
                        </div>
                    </>
                </Formik>
            )}
        </>
    );
}

export default EditProduct;
