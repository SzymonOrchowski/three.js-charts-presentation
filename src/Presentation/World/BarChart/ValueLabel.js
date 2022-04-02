import * as THREE from 'three'
import Presentation from '../../Presentation'

export default class ValueLabel
{
    constructor(referenceBar)
    {
        this.presentation = new Presentation()
        this.sizes = this.presentation.sizes
        this.camera = this.presentation.camera

        this.data = this.presentation.data

        this.value = referenceBar.barHeight
        this.referenceObj = referenceBar.barMesh

        this.delta
        this.valueDelta
    }

    create()
    {
        this.valueLabel = document.createElement('div');
        document.getElementById('value-labels').appendChild(this.valueLabel)

        this.updateValue(this.value)
        this.updatePosition()
    }


    updateValue(value)
    {
        this.value = value
        this.valueLabel.textContent = Math.round(this.value);
    }

    updatePosition()
    {
        this.vector = new THREE.Vector3();
        this.referenceObj.updateWorldMatrix(true, false);
        this.referenceObj.getWorldPosition(this.vector);
        this.vector.y += this.value / 20 + 0.25
        this.vector.project(this.camera.instance);
        
        this.valueLabelPositionX = (this.vector.x *  .5 + .5) * this.sizes.width;
        this.valueLabelPositionY = (this.vector.y * -.5 + .5) * this.sizes.height;
        
        if(!this.valueDelta)
        {
            this.valueLabel.style.transform = `translate(-50%, -50%) translate(${this.valueLabelPositionX}px,${this.valueLabelPositionY}px)`;
        }
        else
        {
            this.valueLabel.style.transform = `translate(-50%, -50%) translate(${this.valueLabelPositionX}px,${this.valueLabelPositionY - 15}px)`;
        }
    }

    createDelta()
    {
        this.valueDelta = document.createElement('div');
        document.getElementById('value-deltas').appendChild(this.valueDelta)

        this.updateValue(this.value)
        this.updatePosition()
    }

    updateDelta(delta)
    {
        this.delta = delta
        this.valueDelta.textContent = Math.round(this.delta);
        if(this.delta > 0)
        {
            this.valueDelta.style.color = "green"
        } 
        else if (this.delta < 0)
        {
            this.valueDelta.style.color = "red"
        }
        else
        {
            this.valueDelta.style.color = "black"
        }
    }

    updateDeltaPosition()
    {
        this.vector = new THREE.Vector3();
        this.referenceObj.updateWorldMatrix(true, false);
        this.referenceObj.getWorldPosition(this.vector);
        this.vector.y += this.value / 20 + 2
        this.vector.project(this.camera.instance);
        
        this.valueDeltaPositionX = (this.vector.x *  .5 + .5) * this.sizes.width;
        this.valueDeltaPositionY = (this.vector.y * -.5 + .5) * this.sizes.height;
        
        this.valueDelta.style.transform = `translate(-50%, -50%) translate(${this.valueLabelPositionX}px,${this.valueLabelPositionY + 1}px)`;
    }

    makeInvisible()
    {
        this.valueLabel.style.visibility = 'hidden'
        if(this.valueDelta)
        {
            this.valueDelta.style.visibility = `hidden`;
        }    
    }

    makeVisible()
    {
        this.valueLabel.style.visibility = ''
        if(this.valueDelta)
        {
            this.valueDelta.style.visibility = ''
        }
    }
}