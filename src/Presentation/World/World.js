import Environment from './Environment'
import BarChart from "./BarChart/BarChart"

import { chart1 } from '../../data/data'

export default class World
{
    constructor()
    {
        this.environment = new Environment()
        this.chart1 = new BarChart(chart1)
    }

    update()
    {
        this.chart1.arrayOfBars.forEach(bar => {
            bar.update()
            bar.valueLabel.updatePosition()
        })
        this.chart1.arrayOfBarsWithDeltas.forEach(bar => {
            bar.update()
            bar.valueLabelWithDelta.updatePosition()
        })
        this.chart1.chartAxis.arrayOfHorizontalLabels.forEach(label => label.updatePosition())
        this.chart1.chartAxis.arrayOfVericalLabels.forEach(label => label.updatePosition())
    }
}