import { createSlice } from '@reduxjs/toolkit';
import { chart1, chart2 } from '../data/data'; // We will create this file next

const initialState = {
  activeChart: 'chart1',
  chart1: chart1,
  chart2: chart2,
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    /**
     * Updates the value of a specific cell in the chart data.
     * @param {object} state - The current Redux state.
     * @param {object} action - The action object.
     * @param {object} action.payload - The payload of the action.
     * @param {string} action.payload.chartId - The ID of the chart to update ('chart1' or 'chart2').
     * @param {number} action.payload.rowIndex - The index of the row to update.
     * @param {number} action.payload.valueIndex - The index of the value within the row to update.
     * @param {number} action.payload.newValue - The new value for the cell.
     */
    updateCellValue: (state, action) => {
      const { chartId, rowIndex, valueIndex, newValue } = action.payload;
      state[chartId].data[rowIndex].values[valueIndex] = newValue;
    },
    /**
     * Sets the active chart to be displayed.
     * @param {object} state - The current Redux state.
     * @param {object} action - The action object containing the chartId.
     */
    setActiveChart: (state, action) => {
        state.activeChart = action.payload;
    }
  },
});

export const { updateCellValue, setActiveChart } = chartSlice.actions;

export default chartSlice.reducer;