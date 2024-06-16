//store.js
import {configureStore} from '@reduxjs/toolkit';
import MemberSlice from './MemberSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

//로컬 스토리지에 저장하는 방식으로 
//redux-persist 설치하여 사용한다.

//로컬스토리지 셋팅값
const persistConfig = {
  key: 'login_app',
  storage,
}

//만든 슬라이스, 리듀서를 등록
const persistedReducer = persistReducer(persistConfig, MemberSlice)

//리덕스 생성시 등록한 persistedReducer 설정
export const store = configureStore({
  reducer : {
    member : persistedReducer
  },
  devTools : process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

