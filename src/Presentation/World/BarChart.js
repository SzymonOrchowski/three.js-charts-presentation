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

        // Labels
        this.labels = new Labels(this.barChart, this.data, this.barPositionX)

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

class Labels 
{
    constructor(barChart, data, barPositionX)
    {
        this.barChart = barChart
        this.data = data
        this.horizontalBarLength = barPositionX

        this.createLabels()
    }

    createLabels()
    {
        // Horizontal Line
        this.hLineGeometry = new THREE.BoxGeometry((this.horizontalBarLength + 0.5), 0.05, 0.05)
        this.hLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
        this.hLine = new THREE.Mesh(this.hLineGeometry, this.hLineMaterial)

        this.hLine.position.x = (this.horizontalBarLength / 2) - 0.75
        this.hLine.position.y = -0.25
        this.hLine.position.z = 0.25

        this.barChart.add(this.hLine)

        // Horizontal Line Labels Indicators
        let initialPositionX = 0;
        this.data.columnNames.forEach(column => {
            this.shortHLineGeometry = new THREE.BoxGeometry(0.05, 0.5, 0.05)
            this.shortHLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
            this.shortHLine = new THREE.Mesh(this.shortHLineGeometry, this.shortHLineMaterial)
            this.shortHLine.position.x = initialPositionX
            this.shortHLine.position.y = -0.25
            this.shortHLine.position.z = 0.25
            this.barChart.add(this.shortHLine)

            initialPositionX += 1.5
        })

        // Vertical Line

        this.vLineGeometry = new THREE.BoxGeometry(0.05, 10.5, 0.05)
        this.vLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
        this.vLine = new THREE.Mesh(this.vLineGeometry, this.vLineMaterial)

        this.vLine.position.x = -1
        this.vLine.position.y = 5
        this.vLine.position.z = 0.25

        this.barChart.add(this.vLine)

        // Vertical Line Labels Indicators

        let initialPositionY = 0;
        this.data.valueLabels.forEach(label => {
            this.shortVLineGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.05)
            this.shortVLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
            this.shortVLine = new THREE.Mesh(this.shortVLineGeometry, this.shortVLineMaterial)
            this.shortVLine.position.x = -1
            this.shortVLine.position.y = initialPositionY
            this.shortVLine.position.z = 0.25
            this.barChart.add(this.shortVLine)

            initialPositionY += 10 / (this.data.valueLabels.length - 1)
        })
        
    }
}