'use client'
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/Shop/ProductCard";
import SportAIHeaderSection from "../components/Shop/SportHeaderSection";
import { useEffect } from "react";
import { fetchProducts } from "../lib/Redux/productSlice";




export default function Shop(){
    const dispatch = useDispatch();
    const {items} = useSelector(state=>state.products)
    
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])

    return(
        <>
            <SportAIHeaderSection/>
            <ProductCard data={items}/>
            
        </>
    )
}