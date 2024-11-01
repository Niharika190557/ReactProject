import { configureStore, createSlice } from "@reduxjs/toolkit";

const productslice=createSlice({

name:'products',
initialState:{

    veg:[
        {name:'Tomato',price:200.5},
        {name:'Potato',price:100.8}
    ],
    nonveg:[
        {name:'chicken',price:800.5},
        {name:'fish',price:1000.5}
    ],
},
reducers:{}

});

const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state, action)=>{
            const item=state.find(item=>item.name===action.payload.name)
            if(item)
            {
                item.quantity+=1;
            }
            else
            {
                state.push({...action.payload,quantity:1});
            }
        },
        increment:(state,action)=>{
            const item=state.find(item=>item.name===action.payload)
            if(item)
            {
                item.quantity+=1;
            }
        },
        decrement:(state,action)=>{
            const item=state.find(item=>item.name===action.payload)
            if(item&&item.quantity>1)
            {
                item.quantity-=1;
            }
            else{
                return state.filter(item=>item.name!==action.payload)
            }
        },
        removeCart:(state,action)=>{
            const item=state.find(item=>item.name===action.payload)
            if(item)
            {
                state.pop({...action.payload,quantity:1});
            }


        }
    }

})

export const {addToCart,increment,decrement,removeCart}=cartSlice.actions
const store=configureStore({
    reducer:{
        products:productslice.reducer,
    cart:cartSlice.reducer,
    }
})




export default store;

