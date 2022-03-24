import * as THREE from 'three'
import Presentation from '../../Presentation'

export default class ChartBase
{
    constructor()
    {
        this.presentation = new Presentation()
        this.scene = this.presentation.scene

        this.baseGeometry = new THREE.BoxGeometry(0.5,0.01,0.6)
        this.baseMaterial = new THREE.MeshBasicMaterial({color: 0x333333})
        this.baseMesh = new THREE.Mesh(this.baseGeometry, this.baseMaterial)

        this.baseEdgesGeometry = new THREE.EdgesGeometry(this.baseGeometry)
        this.baseEdgesMaterial = new THREE.LineBasicMaterial({color: 0x000000})
        this.baseEdges = new THREE.LineSegments(this.baseEdgesGeometry, this.baseEdgesMaterial)

        // Grouping
        this.instance = new THREE.Group()

        this.instance.add(this.baseMesh)
        this.instance.add(this.baseEdges)
        this.scene.add(this.instance)

    }
}