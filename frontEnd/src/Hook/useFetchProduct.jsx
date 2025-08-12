import React, { useEffect, useState } from 'react'
import axios from 'axios'


// ✅ Module-level cache — persists as long as the app is running (no full page reload)
const cache = {};


const useFetchProduct = (id=0) => {
    const [data,setData] = useState(id === -1 ? [] : {})
    const [loading,setLoading] = useState(false)
     const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
      }
    const url = id === 0 ? 'http://localhost:5000/api/products' : `http://localhost:5000/api/products/${id}`;
   





    useEffect(()=>{

      if(cache[url]){
        setData(cache[url])
        console.log(cache[url])
        return; // Don't fetch again
      }


      const controller = new AbortController();
      const signal = controller.signal
        const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get(url,{signal})
          // if (!response.ok) {
          //   throw new Error(`HTTP error! status: ${response.status}`);
          // }
          const products = await response.data;
          // console.log(products);
          cache[url]= response.data
          console.log(products)
          setData(products);
        } catch (error) {
         if (error.name !== 'AbortError') {
          console.error('Error fetching products:', error.message || error);
         }
        } finally {
          setLoading(false);
        }
      };
      fetchProducts()
       return () => {
      controller.abort(); // cancel fetch if id changes or component unmounts
    };
    },[url])

  return {
    data,loading
  }
}

export default useFetchProduct
