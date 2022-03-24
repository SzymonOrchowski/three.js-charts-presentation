import * as THREE from 'three'
import Presentation from '../../Presentation'

export default class Label
{
    constructor(name, referenceObj, xShift, yShift)
    {
        this.presentation = new Presentation()
        this.sizes = this.presentation.sizes
        this.camera = this.presentation.camera

        this.name = name
        this.referenceObj = referenceObj
        this.xShift = xShift
        this.yShift = yShift
        
        this.label = document.createElement('div');
        this.label.textContent = this.name;
        this.htmlElement = document.getElementById('labels').appendChild(this.label)

        this.updatePosition()
    }

    updatePosition()
    {
        this.vector = new THREE.Vector3();
        this.referenceObj.updateWorldMatrix(true, false);
        this.referenceObj.getWorldPosition(this.vector);
        this.vector.project(this.camera.instance);

        this.labelPositionX = ((this.vector.x *  .5 + .5) - this.xShift) * this.sizes.width;
        this.labelPositionY = ((this.vector.y * -.5 + .5) + this.yShift) * this.sizes.height;
       
        this.label.style.transform = `translate(-50%, -50%) translate(${this.labelPositionX}px,${this.labelPositionY}px)`;
    }
}