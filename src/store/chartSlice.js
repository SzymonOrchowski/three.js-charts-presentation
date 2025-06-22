import { createSlice } from '@reduxjs/toolkit';
import presetsData from '../data/data.json';

// Create a deep copy to ensure the original JSON import is not mutated.
const initialPresets = JSON.parse(JSON.stringify(presetsData));
const initialPresetName = Object.keys(initialPresets)[0];

const initialState = {
  presets: initialPresets, // Store the entire presets object in state
  presetNames: Object.keys(initialPresets), // An array of preset names for the UI
  activePresetName: initialPresetName,
  currentChartData: initialPresets[initialPresetName], // The actual data object for the active preset
  isDifferenceMode: false,
};

// Helper function to generate a unique preset name
const getNewPresetName = (existingNames) => {
  let i = 1;
  while (existingNames.includes(`New Preset ${i}`)) {
    i++;
  }
  return `New Preset ${i}`;
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    toggleDifferenceMode: (state) => {
      state.isDifferenceMode = !state.isDifferenceMode;
    },
    loadPreset: (state, action) => {
      const presetName = action.payload;
      if (state.presetNames.includes(presetName)) {
        state.activePresetName = presetName;
        state.currentChartData = state.presets[presetName];
      }
    },
    addPreset: (state) => {
      const newPresetName = getNewPresetName(state.presetNames);
      const newPreset = {
        columnNames: ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
        valueLabels: ["0", "20", "40", "60", "80", "100"],
        data: [
          { name: 'Row 1', values: ['50', '50', '50', '50'] },
          { name: 'Row 2', values: ['50', '50', '50', '50'] },
          { name: 'Row 3', values: ['50', '50', '50', '50'] },
          { name: 'Row 4', values: ['50', '50', '50', '50'] },
        ],
      };
      state.presets[newPresetName] = newPreset;
      state.presetNames.push(newPresetName);
      state.activePresetName = newPresetName;
      state.currentChartData = newPreset;
    },
    renamePreset: (state, action) => {
      const { oldName, newName } = action.payload;
      if (newName && newName.trim() && !state.presetNames.includes(newName)) {
        const presetData = state.presets[oldName];
        delete state.presets[oldName];
        state.presets[newName] = presetData;

        const oldNameIndex = state.presetNames.indexOf(oldName);
        if (oldNameIndex !== -1) {
          state.presetNames[oldNameIndex] = newName;
        }

        if (state.activePresetName === oldName) {
          state.activePresetName = newName;
        }
      }
    },
    updateCellValue: (state, action) => {
      const { rowIndex, valueIndex, newValue } = action.payload;
      const activePreset = state.presets[state.activePresetName];
      activePreset.data[rowIndex].values[valueIndex] = newValue;
      state.currentChartData = JSON.parse(JSON.stringify(activePreset));
    },
    updateColumnName: (state, action) => {
      const { columnIndex, newName } = action.payload;
      const activePreset = state.presets[state.activePresetName];
      activePreset.columnNames[columnIndex] = newName;
      state.currentChartData = JSON.parse(JSON.stringify(activePreset));
    },
    updateRowName: (state, action) => {
      const { rowIndex, newName } = action.payload;
      const activePreset = state.presets[state.activePresetName];
      activePreset.data[rowIndex].name = newName;
      state.currentChartData = JSON.parse(JSON.stringify(activePreset));
    },
    addColumn: (state, action) => {
      const { columnIndex } = action.payload;
      const activePreset = state.presets[state.activePresetName];
      activePreset.columnNames.splice(columnIndex, 0, 'New Column');
      activePreset.data.forEach(row => {
        row.values.splice(columnIndex, 0, '0');
      });
      state.currentChartData = JSON.parse(JSON.stringify(activePreset));
    },
    deleteColumn: (state, action) => {
      const { columnIndex } = action.payload;
      const activePreset = state.presets[state.activePresetName];
      if (activePreset.columnNames.length > 1) {
        activePreset.columnNames.splice(columnIndex, 1);
        activePreset.data.forEach(row => {
          row.values.splice(columnIndex, 1);
        });
      }
      state.currentChartData = JSON.parse(JSON.stringify(activePreset));
    },
    addRow: (state, action) => {
      const { rowIndex } = action.payload;
      const activePreset = state.presets[state.activePresetName];
      const newRow = {
        name: 'New Row',
        values: Array(activePreset.columnNames.length).fill('0')
      };
      activePreset.data.splice(rowIndex, 0, newRow);
      state.currentChartData = JSON.parse(JSON.stringify(activePreset));
    },
    deleteRow: (state, action) => {
      const { rowIndex } = action.payload;
      const activePreset = state.presets[state.activePresetName];
      if (activePreset.data.length > 1) {
        activePreset.data.splice(rowIndex, 1);
      }
      state.currentChartData = JSON.parse(JSON.stringify(activePreset));
    }
  },
});

export const {
  toggleDifferenceMode,
  loadPreset,
  addPreset,
  renamePreset,
  updateCellValue,
  updateColumnName,
  updateRowName,
  addColumn,
  deleteColumn,
  addRow,
  deleteRow
} = chartSlice.actions;

export default chartSlice.reducer;