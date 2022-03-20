import * as THREE from 'three'
import Presentation from "../Presentation"
import Environment from './Environment'
import { chart1 } from '../../data/data'

export default class World
{
    constructor()
    {
        this.presentation = new Presentation()
        this.scene = this.presentation.scene

        this.environment = new Environment()

        this.chart1 = new BarChart(chart1)
    }

    update()
    {

    }
}

class BarChart
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

        for(let i = 0; i < data.columnNames.length; i++)
        {
            const barHeight = this.data.data[this.rowIndex].values[i] / 10
            const bar = new Bar(this.barChart, barHeight, this.barPositionX)
            this.barPositionX += 1.5
        }

        // Position
        this.horizontalShift = (this.barPositionX -1.5) / 4
        this.verticalShift = 2.5

        this.barChart.position.x = -this.horizontalShift
        this.barChart.position.y = -this.verticalShift

        // Scale
        this.scaleRatio = 0.5

        this.barChart.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)

        // Loop presentation
        // let timeDelay = 0
        // for(let i=0; i < 200; i++){
        //     for(let i=0; i < this.data.data.length; i++) {
        //         setTimeout(()=>{this.changeRowIndex(i)},timeDelay)
        //         timeDelay += 600
        //     }
        // }
    }

    changeRowIndex(index)
    {
        if (index >= 0 && index < this.data.data.length)
        {
            this.rowIndex = index
            this.barChart.children.forEach((bar, i) => {
                bar.scale.y = this.data.data[this.rowIndex].values[i] / 10
            })
        }
    }
}

class Bar
{
    constructor(barChart, barHeight, barPositionX)
    {
        this.barChart = barChart
        this.barHeight = barHeight
        this.barPositionX = barPositionX

        const barGeometry = new THREE.BoxGeometry(1,1,1)
        barGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0.5,0))

        const barMaterial = new THREE.MeshStandardMaterial()

        const instance = new THREE.Mesh(barGeometry, barMaterial)

        instance.scale.y = this.barHeight
        this.barChart.add(instance)

        instance.position.x = this.barPositionX
    }
}