/**
 * Calculates a "nice" maximum value for a chart's Y-axis based on the data's max value.
 * This function rounds up to a sensible number to make the axis labels clean.
 * @param {number} dataMax - The maximum value in the dataset.
 * @returns {number} The calculated maximum value for the Y-axis.
 */
function calculateYMax(dataMax) {
    if (dataMax <= 10) return 10;
    if (dataMax <= 100) return Math.ceil(dataMax / 10) * 10;
    if (dataMax <= 250) return Math.ceil(dataMax / 50) * 50;
    return Math.ceil(dataMax / 100) * 100;
  }
  
  /**
   * Generates an array of formatted labels for the Y-axis.
   * @param {number} yMax - The maximum value of the Y-axis.
   * @returns {string[]} An array of strings for the labels.
   */
  function generateValueLabels(yMax) {
    const labels = [];
    const numLabels = 5; // We'll aim for 5 labels (e.g., 0, 25, 50, 75, 100)
    for (let i = 0; i <= numLabels; i++) {
      const value = (yMax / numLabels) * i;
      // Format large numbers with a 'k' for thousands
      if (value >= 1000) {
        labels.push(`${value / 1000}k`);
      } else {
        labels.push(String(Math.round(value)));
      }
    }
    return labels;
  }
  
  /**
   * Analyzes the chart data to produce a dynamic scale.
   * @param {object} chartData - The chart data object from the JSON file.
   * @returns {{yMax: number, valueLabels: string[]}} An object containing the new scale info.
   */
  export function getChartScale(chartData) {
    if (!chartData || !chartData.data) {
      return { yMax: 100, valueLabels: ['0', '25', '50', '75', '100'] };
    }
  
    // Find the highest value across all rows in the dataset
    const dataMax = chartData.data.reduce((max, row) => {
      const rowMax = Math.max(...row.values.map(v => parseFloat(v) || 0));
      return Math.max(max, rowMax);
    }, 0);
  
    const yMax = calculateYMax(dataMax);
    const valueLabels = generateValueLabels(yMax);
  
    return { yMax, valueLabels };
  }