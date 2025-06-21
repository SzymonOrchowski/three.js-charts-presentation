import { createSlice } from '@reduxjs/toolkit';
import * as presets from '../data/data'; // Import all exports from data.js

const initialState = {
  activeChart: 'chart1',
  chart1: presets.chart1,
  chart2: presets.chart2,
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    loadPreset: (state, action) => {
      const { chartId, presetName } = action.payload;
      if (presets[presetName]) {
        state[chartId] = presets[presetName];
      }
    },
    // Accepts strings to allow for invalid input to be stored and validated in the UI
    updateCellValue: (state, action) => {
      const { chartId, rowIndex, valueIndex, newValue } = action.payload;
      state[chartId].data[rowIndex].values[valueIndex] = newValue;
    },
    updateColumnName: (state, action) => {
      const { chartId, columnIndex, newName } = action.payload;
      state[chartId].columnNames[columnIndex] = newName;
    },
    updateRowName: (state, action) => {
      const { chartId, rowIndex, newName } = action.payload;
      state[chartId].data[rowIndex].name = newName;
    },
    addColumn: (state, action) => {
        const { chartId, columnIndex } = action.payload;
        // Insert new column name
        state[chartId].columnNames.splice(columnIndex, 0, 'New Column');
        // Insert a default value in each row for the new column
        state[chartId].data.forEach(row => {
            row.values.splice(columnIndex, 0, '0');
        });
    },
    deleteColumn: (state, action) => {
        const { chartId, columnIndex } = action.payload;
        // Prevent deleting the last column
        if (state[chartId].columnNames.length > 1) {
            state[chartId].columnNames.splice(columnIndex, 1);
            state[chartId].data.forEach(row => {
                row.values.splice(columnIndex, 1);
            });
        }
    },
    addRow: (state, action) => {
        const { chartId, rowIndex } = action.payload;
        const newRow = {
            name: 'New Row',
            values: Array(state[chartId].columnNames.length).fill('0')
        };
        state[chartId].data.splice(rowIndex, 0, newRow);
    },
    deleteRow: (state, action) => {
        const { chartId, rowIndex } = action.payload;
         // Prevent deleting the last row
        if (state[chartId].data.length > 1) {
            state[chartId].data.splice(rowIndex, 1);
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