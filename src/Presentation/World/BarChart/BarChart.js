import * as THREE from 'three'
import Presentation from '../../Presentation'
import Bar from './Bar'
import ChartAxis from './ChartAxis'

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

        for(let i = 0; i < this.data.columnNames.length; i++)
        {
            const barHeight = this.data.data[this.rowIndex].values[i] / 10
            this.arrayOfBars.push(new Bar(this.barChart, barHeight, this.barPositionX))
            this.barPositionX += 0.75
        }

        // Position
        this.horizontalShift = (this.barPositionX -1.5) / 2
        this.verticalShift = 2.5

        this.barChart.position.x = -this.horizontalShift
        this.barChart.position.y = -this.verticalShift

         // ChartAxis
        this.chartAxis = new ChartAxis(this.barChart, this.data, this.barPositionX)
    }

    changeRowIndex(index)
    {   
        this.rowIndex = index
        this.arrayOfBars.forEach((bar, i) => {
            bar.aimHeight = this.data.data[this.rowIndex].values[i] / 10
        })
    }
}