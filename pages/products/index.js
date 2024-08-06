
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';


export default function index() {

    const router = useRouter();


    const [products, setProducts] = useState([]);
    const [category, setcategory] = useState([]);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products');
                console.log(response.status);
                console.log(response);

                if (!response.status == 200) {
                    throw new Error('Network response was not ok');

                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError('Expected JSON response from server');
                }

                const data = await response.data;
                console.log(data);
                setProducts(data);
            }
            catch (error) {
                console.error('Error fetching products:', error);
                setError(error);
            }
        };

        const fetchcategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/categories');
                console.log(response.status);
                console.log(response);

                if (!response.status == 200) {
                    throw new Error('Network response was not ok');

                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError('Expected JSON response from server');
                }

                const data = await response.data;
                console.log(data);
                setcategory(data);
            }
            catch (error) {
                console.error('Error fetching products:', error);
                setError(error);
            }
        };

        fetchcategories
        fetchProducts();
    }, []);

    if (error) {
        return <div className='w-screen h-screen bg-white'>Error: {error.message}</div>;
    }

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            const data = await response.json();
            console.log('Product deleted:', data);
            // Update the product list after deletion
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            setError(error);
        }
    };

    const handleEdit = (productId) => {
        router.push(`/update/${productId}`);
    };

    return (
        <div className='w-screen h-screen bg-white'>
            <div className='px-4'>
                <header>
                    <div className="mx-auto max-w-screen-2xl  py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">View All Products</h1>

                                <p className="mt-1.5 text-md text-gray-500 max-w-lg">Let's create a new product. 🎉</p>
                            </div>

                            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">


                                <Link
                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-500 px-5 py-3 text-green-500 transition hover:bg-gray-50 hover:text-green-700 focus:outline-none focus:ring"
                                    href={'/products/Add'}
                                >
                                    <span className="text-sm font-medium"> Create Products </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>


                                </Link>
                            </div>
                        </div>
                    </div>
                </header>


                <hr class="my-1 h-px border-0 bg-gray-300" />
                {/* Products */}
                <div>

                    <div>
                        {products.length === 0 ? (
                            <p>No Products Found</p>
                        ) : (


                            <div class="ml-5 mr-5">
                                <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
                                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
                                            {/* <th scope="col" class="px-6 py-4 font-medium text-gray-900">Price</th> */}
                                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Category</th>
                                            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                                        </tr>
                                    </thead>

                                    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                                        {products.map(product => (
                                            <tr>

                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Image src={product.images[0]} style={{ height: '35px', width: '35px', borderRadius: '10px', marginTop: '8px' }} />
                                                    <th class="px-6 py-4 font-medium text-gray-900">{product.title}</th>
                                                </div>
                                                <td class="px-6 py-4">{product.description}</td>
                                                {/* <td class="px-6 py-4">{product.price}</td> */}
                                                <td class="px-6 py-4">{product.category}</td>

                                                <div style={{ display: 'flex', flexDirection: 'row', gap: 25 }}>
                                                    <div className='mt-3 '>

                                                        <button
                                                            class="flex  gap-4 px-6 py-4 font-medium bg-green-500 text-white border-green-500 rounded-xl h-5"
                                                            onClick={() => handleEdit(product._id.toString())}

                                                        >
                                                            <p style={{ justifyContent: 'center', justifyItems: 'center', marginTop: '-10px' }}>Edit</p>
                                                        </button>

                                                    </div>
                                                    <div className='mt-3  '>
                                                        <button
                                                            onClick={() => deleteProduct(product._id.toString())}
                                                            class="flex  gap-4 px-6 py-4 font-medium bg-red-500 text-white border-red-500 rounded-xl h-5"   >
                                                            <p style={{ justifyContent: 'center', justifyItems: 'center', marginTop: '-10px' }}>Delete</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>


                        )}
                    </div>


                </div>






            </div>
        </div>
    )
}
