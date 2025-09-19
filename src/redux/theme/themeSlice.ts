import { createSlice } from "@reduxjs/toolkit"

 type themeState={
    theme: 'dark' | 'light'
}

const initialState:themeState={
    theme:'light'
}

const slice=createSlice({
    initialState,
    name:'theme',
    reducers:{
        themeSwitching:(state)=>{
            const current_state= state.theme
            if(current_state==='dark'){
                state.theme='light'
            }


               if(current_state==='light'){
                state.theme='dark'
            }

        }
    }
})


export const { themeSwitching } = slice.actions
export default slice.reducer