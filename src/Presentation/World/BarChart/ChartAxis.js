import * as THREE from 'three'
import Label from './Label'

export default class ChartAxis 
{
    constructor(barChart, data, barPositionX)
    {
        this.barChart = barChart
        this.data = data
        this.horizontalBarLength = barPositionX

        this.createChartAxis()
    }

    createChartAxis()
    {
        const axisThickness = 0.02

    // Horizontal Line

        this.hLineGeometry = new THREE.BoxGeometry((this.horizontalBarLength + 0.5), axisThickness, axisThickness)
        this.hLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
        this.hLine = new THREE.Mesh(this.hLineGeometry, this.hLineMaterial)

        this.hLine.position.x = (this.horizontalBarLength / 2) - 0.25
        this.hLine.position.y = -0.25 / 2
        this.hLine.position.z = 0.25 / 2

        this.barChart.add(this.hLine)

        // Horizontal Line Labels

        this.arrayOfHorizontalLabels = []

        let initialPositionX = 0;

        this.data.columnNames.forEach(column => {
            // Label Indicator
            this.shortHLineGeometry = new THREE.BoxGeometry(axisThickness, 0.25, axisThickness)
            this.shortHLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
            this.shortHLine = new THREE.Mesh(this.shortHLineGeometry, this.shortHLineMaterial)
            this.shortHLine.position.x = initialPositionX
            this.shortHLine.position.y = -0.25 / 2
            this.shortHLine.position.z = 0.25 / 2
            this.barChart.add(this.shortHLine)

            initialPositionX += 0.75

            // Label
            this.arrayOfHorizontalLabels.push(new Label(column, this.shortHLine, 0, 0.025))
        })

    // Vertical Line

        this.vLineGeometry = new THREE.BoxGeometry(axisThickness, 5.25, axisThickness)
        this.vLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
        this.vLine = new THREE.Mesh(this.vLineGeometry, this.vLineMaterial)

        this.vLine.position.x = -0.5
        this.vLine.position.y = 2.5
        this.vLine.position.z = 0.25 / 2

        this.barChart.add(this.vLine)

        // Vertical Line Labels

        this.arrayOfVericalLabels = []

        let initialPositionY = 0;

        this.data.valueLabels.forEach(value => {
            // Label Indicator
            this.shortVLineGeometry = new THREE.BoxGeometry(0.25, axisThickness, axisThickness)
            this.shortVLineMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
            this.shortVLine = new THREE.Mesh(this.shortVLineGeometry, this.shortVLineMaterial)
            this.shortVLine.position.x = -0.5
            this.shortVLine.position.y = initialPositionY
            this.shortVLine.position.z = 0.25 / 2
            this.barChart.add(this.shortVLine)

            initialPositionY += 5 / (this.data.valueLabels.length - 1)

            // Label
            this.arrayOfVericalLabels.push(new Label(value, this.shortVLine, 0.0125, 0))
        })      
    }
}