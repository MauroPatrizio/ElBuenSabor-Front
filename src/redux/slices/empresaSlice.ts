import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface estadoInicialEmpresa {
	selectedEmpresa: IEmpresa | null;
}

const initialState: estadoInicialEmpresa = {
	selectedEmpresa: null,
};

const empresaSlice = createSlice({
	name: "empresa",
	initialState,
	reducers: {
		setSelectedEmpresa: (state, action: PayloadAction<IEmpresa>) => {
			state.selectedEmpresa = action.payload;
		},
		clearSelectedEmpresa: (state) => {
			state.selectedEmpresa = null;
		},
	},
});

export default empresaSlice.reducer;

export const { setSelectedEmpresa, clearSelectedEmpresa } = empresaSlice.actions;
