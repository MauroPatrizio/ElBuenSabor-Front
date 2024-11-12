import { configureStore } from "@reduxjs/toolkit";
import empresaSlice from "../slices/empresaSlice";
import sucursalSlice from "../slices/sucursalSlice";
import globalStylesSlice from "../slices/globalStylesSlice";

export const store = configureStore({
	reducer: {
		empresa: empresaSlice,
		sucursal: sucursalSlice,
		estilo: globalStylesSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
