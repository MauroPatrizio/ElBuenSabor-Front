//sucursalSlice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

interface estadoInicialSucursal {
	sucursales: ISucursal[];
	selectedSucursal: ISucursal | null;
}

const initialState: estadoInicialSucursal = {
	sucursales: [],
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
		setListaSucursales: (state, action: PayloadAction<ISucursal[]>) => {
			state.sucursales = action.payload;
		},
	},
});

export default sucursalSlice.reducer;

export const { setSelectedSucursal, clearSelectedSucursal, setListaSucursales } =
	sucursalSlice.actions;
