import * as THREE from 'three'
import Presentation from '../../Presentation'
import Bar from './Bar'
import BarWithDifference from './BarWithDifference'
import ChartAxis from './ChartAxis'
import ChartBase from './ChartBase'

export default class BarChart
{
    constructor(data)
    {   
        this.presentation = new Presentation()
        this.scene = this.presentation.scene

        this.data = data

        this.barPositionX = 0
        this.rowIndex = 0

        this.barChart = new THREE.Group()
        this.scene.add(this.barChart)

        this.arrayOfBars = []
        this.arrayOfBarsWithDifference = []

        for(let i = 0; i < this.data.columnNames.length; i++)
        {
            const barHeight = this.data.data[this.rowIndex].values[i] / 10
            this.arrayOfBars.push(new Bar(this.barChart, barHeight, this.barPositionX))
            this.arrayOfBarsWithDifference.push(new BarWithDifference(this.barChart, barHeight, this.barPositionX))
            this.barPositionX += 0.75
        }

        // Position
        this.horizontalShift = (this.barPositionX -1.5) / 2
        this.verticalShift = 2.5

        this.barChart.position.x = -this.horizontalShift
        this.barChart.position.y = -this.verticalShift

        // ChartBase
        this.chartBase = new ChartBase()
        this.chartBase.instance.position.x = 3 * (0.5 /4)
        this.chartBase.instance.scale.x = this.barPositionX * 2
        this.chartBase.instance.position.y = -this.verticalShift - 0.01

        // ChartAxis
        this.chartAxis = new ChartAxis(this.barChart, this.data, this.barPositionX)

        // Value Labels Update
        this.arrayOfBars.forEach(bar => {
            bar.valueLabel.create()
            bar.valueLabel.updateValue(bar.barHeight * 10)
            bar.valueLabel.updatePosition()
        })

        this.arrayOfBars.forEach(bar => {
            bar.makeInvisible()
        })

        this.arrayOfBarsWithDifference.forEach(bar => {
            bar.valueLabelWithDifference.create()
            bar.valueLabelWithDifference.updateValue(bar.barHeight * 10)
            bar.valueLabelWithDifference.updatePosition()
        })
    }

    changeRowIndex(index)
    {   
        this.rowIndex = index
        this.arrayOfBars.forEach((bar, i) => {
            bar.aimHeight = this.data.data[this.rowIndex].values[i] / 10
        })
        this.arrayOfBarsWithDifference.forEach((bar, i) => {
            bar.barNegDiff.scale.y = 0
            bar.barMain.scale.y = bar.barMain.scale.y + bar.barPosDiff.scale.y
            bar.barHeight = bar.barMain.scale.y
            bar.barPosDiff.scale.y = 0
            bar.aimHeight = this.data.data[this.rowIndex].values[i] / 10
        })
    }
}