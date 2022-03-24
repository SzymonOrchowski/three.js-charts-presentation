import * as THREE from 'three'
import Presentation from '../Presentation'

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

        for(let i = 0; i < data.columnNames.length; i++)
        {
            const barHeight = this.data.data[this.rowIndex].values[i] / 10
            this.arrayOfBars.push(new Bar(this.barChart, barHeight, this.barPositionX))
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
    }

    changeRowIndex(index)
    {   
        this.rowIndex = index
        this.arrayOfBars.forEach((bar, i) => {
            bar.aimHeight = this.data.data[this.rowIndex].values[i] / 10
        })
    }
}

class Bar
{
    constructor(barChart, barHeight, barPositionX)
    {
        this.barChart = barChart
        this.barHeight = barHeight
        this.aimHeight = this.barHeight
        this.barPositionX = barPositionX

        // Bar Mesh create
        this.barGeometry = new THREE.BoxGeometry(1,1,1)
        this.barGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0.5,0))

        this.barMaterial = new THREE.MeshStandardMaterial({color: 0x5555ff})

        this.barMesh = new THREE.Mesh(this.barGeometry, this.barMaterial)

        this.barEdgesGeometry = new THREE.EdgesGeometry(this.barGeometry)
        this.barEdgesMaterial = new THREE.LineBasicMaterial({color: 0x000000})
        this.barEdges = new THREE.LineSegments(this.barEdgesGeometry, this.barEdgesMaterial)

        // Grouping
        this.instance = new THREE.Group()

        this.instance.add(this.barMesh)
        this.instance.add(this.barEdges)
        
        this.barChart.add(this.instance)

        // Bar modify
        this.instance.scale.y = this.barHeight
        this.instance.position.x = this.barPositionX
    }

    update()
    {   
        let animationSpeed = 8 // range 1-10
        let difference = Math.abs(this.aimHeight - this.instance.scale.y)

        if (this.instance.scale.y < this.aimHeight) {
            this.instance.scale.y += difference / (101 - (animationSpeed * 10))
        }
        if (this.instance.scale.y > this.aimHeight) {
            this.instance.scale.y -= difference / (101 - (animationSpeed * 10))
        }
    }
}