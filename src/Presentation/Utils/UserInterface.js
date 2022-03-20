import EventEmitter from "./EventEmitter";

export default class UserInterface extends EventEmitter
{
    constructor()
    {
        super()
        
        this.setNavButtons()
    }

    setNavButtons()
    {
        const navButtonsContainer = document.createElement("div")
        navButtonsContainer.setAttribute('id', 'nav-buttons-container')

        const prevButton = document.createElement("BUTTON");
        const prevButtonLabel = document.createTextNode('Prev')
        prevButton.appendChild(prevButtonLabel)
        prevButton.setAttribute('class', 'nav-button')
        prevButton.onclick = () => { this.trigger('prev') }
        navButtonsContainer.appendChild(prevButton)

        const nextButton = document.createElement("BUTTON");
        const nextButtonLabel = document.createTextNode('Next')
        nextButton.appendChild(nextButtonLabel)
        nextButton.setAttribute('class', 'nav-button')
        nextButton.onclick = () => { this.trigger('next') }
        navButtonsContainer.appendChild(nextButton)

        document.body.appendChild(navButtonsContainer);
    }
}