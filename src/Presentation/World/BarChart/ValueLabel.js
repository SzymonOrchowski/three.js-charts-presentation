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
    }

    create()
    {
        this.valueLabel = document.createElement('div');
        this.htmlElement = document.getElementById('value-labels').appendChild(this.valueLabel)

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
        
        this.valueLabel.style.transform = `translate(-50%, -50%) translate(${this.valueLabelPositionX}px,${this.valueLabelPositionY}px)`;
    }

    makeInvisible()
    {
        this.valueLabel.style.visibility = 'hidden'
    }

    makeVisible()
    {
        this.valueLabel.style.visibility = ''
    }
}