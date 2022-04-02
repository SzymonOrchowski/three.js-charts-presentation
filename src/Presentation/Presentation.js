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

        this.userInterface.updateTitle(this.world.chart1.data.data[0].name)

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

        this.userInterface.on('showDiff', () => {
            this.showDifference()
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
        if (this.world.chart1.rowIndex > 0)
        {
            const currentRowIndex = this.world.chart1.rowIndex
            this.userInterface.updateTitle(this.world.chart1.data.data[currentRowIndex - 1].name)
            this.world.chart1.changeRowIndex(currentRowIndex -1)
        }
    }

    displayNextRow()
    {
        if (this.world.chart1.rowIndex < this.world.chart1.data.data.length - 1)
        {
            const currentRowIndex = this.world.chart1.rowIndex
            this.userInterface.updateTitle(this.world.chart1.data.data[currentRowIndex + 1].name)
            this.world.chart1.changeRowIndex(currentRowIndex +1)
        }
    }

    showDifference()
    {
        if(this.world.chart1.arrayOfBars[0].isVisible)
        {
            this.world.chart1.arrayOfBars.forEach(bar => {
                bar.makeInvisible()
            })
            this.world.chart1.arrayOfBarsWithDifference.forEach(bar => {
                bar.makeVisible()
            })
            document.getElementById('showDifference-button').innerHTML = "Hide the difference to the previous row displayed."
        } 
        else
        {
            this.world.chart1.arrayOfBars.forEach(bar => {
                bar.makeVisible()
            })
            this.world.chart1.arrayOfBarsWithDifference.forEach(bar => {
                bar.makeInvisible()
            })
            document.getElementById('showDifference-button').innerHTML = "Show the difference to the previous row displayed."
        }
    }
}