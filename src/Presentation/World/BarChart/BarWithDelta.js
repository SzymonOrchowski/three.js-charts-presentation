import * as THREE from 'three'
import Presentation from '../../Presentation'
import ValueLabel from './ValueLabel'

export default class BarWithDelta
{
    constructor(barChart, barHeight, barPositionX)
    {
        this.presentation = new Presentation()
        this.barChart = barChart
        this.barHeight = barHeight
        this.aimHeight = this.barHeight
        this.barPositionX = barPositionX
        this.isVisible = false

        // Bar Main - Mesh create

        this.barGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)
        this.barGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0.25,0))

        this.barMaterial = new THREE.MeshStandardMaterial({color: 0x5555ff})

        this.barMesh = new THREE.Mesh(this.barGeometry, this.barMaterial)

        this.barEdgesGeometry = new THREE.EdgesGeometry(this.barGeometry)
        this.barEdgesMaterial = new THREE.LineBasicMaterial({color: 0x000000})
        this.barEdges = new THREE.LineSegments(this.barEdgesGeometry, this.barEdgesMaterial)

        // Bar PositiveChange - Mesh create

        this.barPositiveGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)
        this.barPositiveGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0.25,0))

        this.barPositiveMaterial = new THREE.MeshStandardMaterial({color: 0x46AB64})

        this.barPositiveMesh = new THREE.Mesh(this.barPositiveGeometry, this.barPositiveMaterial)

        this.barPositiveEdgesGeometry = new THREE.EdgesGeometry(this.barPositiveGeometry)
        this.barPositiveEdgesMaterial = new THREE.LineBasicMaterial({color: 0x000000})
        this.barPositiveEdges = new THREE.LineSegments(this.barPositiveEdgesGeometry, this.barPositiveEdgesMaterial)

        // Bar NegativeChange - Mesh create

        this.barNegativeGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)
        this.barNegativeGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0.25,0))

        this.barNegativeMaterial = new THREE.MeshStandardMaterial({color: 0xAA0000, transparent: true})
        this.barNegativeMaterial.opacity = 0.3

        this.barNegativeMesh = new THREE.Mesh(this.barNegativeGeometry, this.barNegativeMaterial)

        this.barNegativeEdgesGeometry = new THREE.EdgesGeometry(this.barNegativeGeometry)
        this.barNegativeEdgesMaterial = new THREE.LineBasicMaterial({color: 0x000000, transparent: true})
        this.barNegativeEdgesMaterial.opacity = 0.5
        this.barNegativeEdges = new THREE.LineSegments(this.barNegativeEdgesGeometry, this.barNegativeEdgesMaterial)

        // Grouping

        this.barMain = new THREE.Group()
        this.barPosDelta = new THREE.Group()
        this.barNegDelta = new THREE.Group()

        this.barMain.add(this.barMesh)
        this.barMain.add(this.barEdges)

        this.barPosDelta.add(this.barPositiveMesh)
        this.barPosDelta.add(this.barPositiveEdges)

        this.barNegDelta.add(this.barNegativeMesh)
        this.barNegDelta.add(this.barNegativeEdges)
        
        this.barChart.add(this.barMain)
        this.barChart.add(this.barPosDelta)
        this.barChart.add(this.barNegDelta)

        // Bar modify
        this.barMain.scale.y = this.barHeight
        this.barMain.position.x = this.barPositionX

        this.barPosDelta.scale.y = 0
        this.barPosDelta.position.x = this.barPositionX

        this.barNegDelta.scale.y = 0
        this.barNegDelta.position.x = this.barPositionX

        // Value Label
        this.valueLabelWithDelta = new ValueLabel(this)
    }

    update()
    {   
        let animationSpeed = 8 // range 1-10
        let difference = Math.abs(this.aimHeight - this.barHeight)

        // bar grow
        if (this.barHeight < this.aimHeight) {
            this.barNegDelta.scale.y = 0
            this.barNegDelta.position.y = 0
            this.barPosDelta.scale.y += difference / (101 - (animationSpeed * 10))
            this.barPosDelta.position.y = this.barMain.scale.y / 2
            this.barHeight = this.barMain.scale.y + this.barPosDelta.scale.y

            if(this.barPosDelta.scale.y < 0.001)
            {
                this.barPosDelta.scale.y = 0
                this.barPosDelta.position.y = 0
            }

            this.valueLabelWithDelta.updateValue((this.barMain.scale.y + this.barPosDelta.scale.y) * 10)
            this.valueLabelWithDelta.updatePosition()
            this.valueLabelWithDelta.updateDelta(this.barPosDelta.scale.y * 10)
            this.valueLabelWithDelta.updateDeltaPosition()
        }

        // bar going down
        if (this.barHeight > this.aimHeight) {
            this.barPosDelta.scale.y = 0
            this.barPosDelta.position.y = 0
            this.barMain.scale.y -= difference / (101 - (animationSpeed * 10))
            this.barNegDelta.scale.y += this.barHeight - this.barMain.scale.y
            this.barNegDelta.position.y = (this.barMain.scale.y / 2) + 0.001
            this.barHeight = this.barMain.scale.y

            if(this.barNegDelta.scale.y < 0.001)
            {
                this.barNegDelta.scale.y = 0
                this.barNegDelta.position.y = 0
            }

            this.valueLabelWithDelta.updateValue(this.barMain.scale.y * 10)
            this.valueLabelWithDelta.updatePosition()
            this.valueLabelWithDelta.updateDelta(-this.barNegDelta.scale.y * 10)
            this.valueLabelWithDelta.updateDeltaPosition()
        }
    }

    makeVisible()
    {
        this.barMain.children.forEach(object => {
            object.visible = true
        })
        this.barPosDelta.children.forEach(object => {
            object.visible = true
        })
        this.barNegDelta.children.forEach(object => {
            object.visible = true
        })
        this.valueLabelWithDelta.makeVisible()  
        this.isVisible = true
    }

    makeInvisible()
    {
        this.barMain.children.forEach(object => {
            object.visible = false
        })
        this.barPosDelta.children.forEach(object => {
            object.visible = false
        })
        this.barNegDelta.children.forEach(object => {
            object.visible = false
        })
        this.valueLabelWithDelta.makeInvisible()
        this.isVisible = false
    }
}


