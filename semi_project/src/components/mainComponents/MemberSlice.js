import { createSlice } from "@reduxjs/toolkit";



export const MemberSlice = createSlice({
  name : 'member',
  initialState : {
    value : {}
  },
  reducers:{
    saveToken : (state, action) => {
      state.value = {
        ...action.payload
      }
      console.log('saveToken',state.value);
    },
    clearToken : (state) => {
      state.value = {}
      console.log('clearToken', state.value);
    }
  }
});
//각 케이스에 대한 리듀서 함수들을 생성
export const {saveToken, clearToken} = MemberSlice.actions;
export default MemberSlice.reducer;