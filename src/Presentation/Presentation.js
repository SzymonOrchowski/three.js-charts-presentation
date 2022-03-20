import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import UserInterface from './Utils/UserInterface'

let instance = null

export default class Presentation
{
    constructor(_canvas)
    {
        if(instance)
        {
            return instance
        }
        instance = this

        this.canvas = _canvas

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.userInterface = new UserInterface()

        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })

        this.userInterface.on('prev', () => {
            this.displayPrevRow()
        })

        this.userInterface.on('next', () => {
            this.displayNextRow()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    displayPrevRow()
    {
        const currentRowIndex = this.world.chart1.rowIndex
        this.world.chart1.changeRowIndex(currentRowIndex -1)
    }

    displayNextRow()
    {
        const currentRowIndex = this.world.chart1.rowIndex
        this.world.chart1.changeRowIndex(currentRowIndex +1)
    }
}