import EventEmitter from "./EventEmitter";

export default class UserInterface extends EventEmitter
{
    constructor()
    {
        super()
        
        this.createChartTitle()
        this.createNavButtons()
        this.createOptions()
    }

    createChartTitle()
    {
        const chartTitle = document.createElement("div")
        chartTitle.setAttribute('id', 'chart-title')

        document.body.appendChild(chartTitle);
    }

    updateTitle(chartTitleName)
    {
        document.getElementById('chart-title').innerHTML = `<h1>${chartTitleName}</h1>`
    }

    createNavButtons()
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

    createOptions()
    {
        const optionsContainer = document.createElement("div")
        optionsContainer.setAttribute('id', 'options-container')

        const showDifferenceButton = document.createElement("BUTTON")
        const showDifferenceButtonLabel = document.createTextNode('Show the difference to the previous row displayed.')
        showDifferenceButton.appendChild(showDifferenceButtonLabel)
        showDifferenceButton.setAttribute('id', 'showDifference-button')
        showDifferenceButton.setAttribute('class', 'options-button')
        showDifferenceButton.onclick = () => { this.trigger('showDeltas')}
        optionsContainer.appendChild(showDifferenceButton)
        
        document.body.appendChild(optionsContainer)

    }
}