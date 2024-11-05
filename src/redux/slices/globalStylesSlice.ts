import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StyleState {
	applyStyle: boolean;
}

const initialState: StyleState = {
	applyStyle: false,
};

const globalStylesSlice = createSlice({
	name: "estilo",
	initialState,
	reducers: {
		toggleGlobalStyle: (state, action: PayloadAction<boolean>) => {
			state.applyStyle = action.payload;
		},
	},
});

export default globalStylesSlice.reducer;

export const { toggleGlobalStyle } = globalStylesSlice.actions;
