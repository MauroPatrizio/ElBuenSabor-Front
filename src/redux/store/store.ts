import { configureStore } from "@reduxjs/toolkit";
import empresaSlice from "../slices/empresaSlice";
import sucursalSlice from "../slices/sucursalSlice";

export const store = configureStore({
	reducer: {
		empresa: empresaSlice,
		sucursal: sucursalSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
