import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

interface estadoInicialSucursal {
	selectedSucursal: ISucursal | null;
}

const initialState: estadoInicialSucursal = {
	selectedSucursal: null,
};

const sucursalSlice = createSlice({
	name: "sucursal",
	initialState,
	reducers: {
		setSelectedSucursal: (state, action: PayloadAction<ISucursal>) => {
			state.selectedSucursal = action.payload;
		},
		clearSelectedSucursal: (state) => {
			state.selectedSucursal = null;
		},
	},
});

export default sucursalSlice.reducer;

export const { setSelectedSucursal, clearSelectedSucursal } = sucursalSlice.actions;
