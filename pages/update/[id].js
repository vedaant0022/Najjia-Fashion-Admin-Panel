import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        details: '',
        brand: '',
        colors: '',
        sizes: '',
        gender: '',
        images: '',
        category: '',
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch the product details
            axios.get(`http://localhost:8000/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setError(error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/products/${id}`, product);
            if (response.status === 200) {
                router.push('/');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError(error);
        }
    };

    if (error) {
        return <div className='w-screen h-screen bg-white'>Error: {error.message}</div>;
    }

    return (
        <div className='w-screen h-screen bg-white'>
            <div className='px-4'>
                <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Details</label>
                        <input
                            type="text"
                            name="details"
                            value={product.details}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Colors</label>
                        <input
                            type="text"
                            name="colors"
                            value={product.colors}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Sizes</label>
                        <input
                            type="text"
                            name="sizes"
                            value={product.sizes}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={product.gender}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Images</label>
                        <input
                            type="text"
                            name="images"
                            value={product.images}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
