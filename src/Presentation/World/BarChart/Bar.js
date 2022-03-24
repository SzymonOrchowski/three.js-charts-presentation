import * as THREE from 'three'

export default class Bar
{
    constructor(barChart, barHeight, barPositionX)
    {
        this.barChart = barChart
        this.barHeight = barHeight
        this.aimHeight = this.barHeight
        this.barPositionX = barPositionX

        // Bar Mesh create
        this.barGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)
        this.barGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0.25,0))

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