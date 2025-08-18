import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../Constant";
const ProductApiSlice = apiSlice.injectEndpoints({

    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>({
                url:PRODUCT_URL
            })
        }),
         getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`
            })
        })
    })

})

export const {useGetProductsQuery,useGetProductDetailsQuery} = ProductApiSlice