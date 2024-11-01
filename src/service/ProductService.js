import axios from "axios";

const URL_PRODUCTS = "http://localhost:3030/products";

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${URL_PRODUCTS}/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};

export const getAllStudents = async (searchName, searchCategory) => {
    try {
        let params = {};
        if (searchName) {
            params.name = `*${searchName}*`;
        }

        let res = await axios.get(URL_PRODUCTS, { params });

        if (searchCategory) {
            res.data = res.data.filter(product => product.category.id === searchCategory);
        }

        return res.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return [];
    }
}

export const saveProduct = async (product) => {
    try {
        await axios.post(URL_PRODUCTS, product)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${URL_PRODUCTS}/${productId}`);
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
}

export const updateProduct = async (productId, updatedProduct) => {
    try {
        await axios.put(`${URL_PRODUCTS}/${productId}`, updatedProduct);
        return true;
    } catch (error) {
        console.error("Error updating product:", error);
        return false;
    }
};