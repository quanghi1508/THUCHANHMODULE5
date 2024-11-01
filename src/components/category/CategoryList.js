import {useEffect, useState} from "react";
import * as categoryService from "../../service/CategoryService";

function CategoryList() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getAllCategories()
    }, []);

    const getAllCategories = async () => {
        let categories = await categoryService.getAllCategories();
        setCategory(categories);
    };

    return (
        <div className="container mt-5">
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    category.map((item, index) =>
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default CategoryList;