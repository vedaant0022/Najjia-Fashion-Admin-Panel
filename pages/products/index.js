
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getproduct } from '../api/API';
import axios from 'axios';

export default function index() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

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

        fetchProducts();
    }, [products]);

    if (error) {
        return <div className='w-screen h-screen bg-white'>Error: {error.message}</div>;
    }
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
                    {products.map(product => (
                        <div>
                            <p>{product.title}</p>
                        </div>
                        
                    ))}
                </div>






            </div>
        </div>
    )
}
// {products.length === 0 ? (
//     <p>No Products Found</p>
// ):(
//     <p>There are some products</p>
// )}