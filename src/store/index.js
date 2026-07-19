import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import businessReducer from './slices/businessSlice';
import expenseReducer from './slices/expenseSlice';
import categoryReducer from './slices/categorySlice';
import auditReducer from './slices/auditSlice';
import recurringReducer from './slices/recurringSlice';
import budgetReducer from './slices/budgetSlice';

const appReducer = combineReducers({
  auth: authReducer,
  business: businessReducer,
  expense: expenseReducer,
  category: categoryReducer,
  audit: auditReducer,
  recurring: recurringReducer,
  budget: budgetReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    // Kullanıcı çıkış yaptığında (logout), tüm Redux state'ini sıfırla (undefined yap)
    // Böylece önceki kullanıcının verileri (giderler, kategoriler) bellekte kalmaz.
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
