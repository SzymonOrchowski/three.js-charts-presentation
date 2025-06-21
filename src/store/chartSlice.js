import { createSlice } from '@reduxjs/toolkit';
import presets from '../data/data.json'; // Import the new JSON file

// Get the name of the first preset to use as the default
const initialPresetName = Object.keys(presets)[0];

const initialState = {
  presetNames: Object.keys(presets), // An array of preset names for the UI
  activePresetName: initialPresetName,
  currentChartData: presets[initialPresetName], // The actual data object for the active preset
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    loadPreset: (state, action) => {
      const presetName = action.payload;
      if (state.presetNames.includes(presetName)) {
        state.activePresetName = presetName;
        state.currentChartData = presets[presetName];
      }
    },
    updateCellValue: (state, action) => {
      const { rowIndex, valueIndex, newValue } = action.payload;
      state.currentChartData.data[rowIndex].values[valueIndex] = newValue;
    },
    updateColumnName: (state, action) => {
      const { columnIndex, newName } = action.payload;
      state.currentChartData.columnNames[columnIndex] = newName;
    },
    updateRowName: (state, action) => {
      const { rowIndex, newName } = action.payload;
      state.currentChartData.data[rowIndex].name = newName;
    },
    addColumn: (state, action) => {
      const { columnIndex } = action.payload;
      state.currentChartData.columnNames.splice(columnIndex, 0, 'New Column');
      state.currentChartData.data.forEach(row => {
        row.values.splice(columnIndex, 0, '0');
      });
    },
    deleteColumn: (state, action) => {
      const { columnIndex } = action.payload;
      if (state.currentChartData.columnNames.length > 1) {
        state.currentChartData.columnNames.splice(columnIndex, 1);
        state.currentChartData.data.forEach(row => {
          row.values.splice(columnIndex, 1);
        });
      }
    },
    addRow: (state, action) => {
      const { rowIndex } = action.payload;
      const newRow = {
        name: 'New Row',
        values: Array(state.currentChartData.columnNames.length).fill('0')
      };
      state.currentChartData.data.splice(rowIndex, 0, newRow);
    },
    deleteRow: (state, action) => {
      const { rowIndex } = action.payload;
      if (state.currentChartData.data.length > 1) {
        state.currentChartData.data.splice(rowIndex, 1);
      }
    }
  },
});

export const {
  loadPreset,
  updateCellValue,
  updateColumnName,
  updateRowName,
  addColumn,
  deleteColumn,
  addRow,
  deleteRow
} = chartSlice.actions;

export default chartSlice.reducer;