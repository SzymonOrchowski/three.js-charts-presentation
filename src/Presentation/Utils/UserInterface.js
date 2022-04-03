import EventEmitter from "./EventEmitter";

import { chart1,chart2 } from '../../data/data'

export default class UserInterface extends EventEmitter
{
    constructor()
    {
        super()

        this.data = chart1
        
        this.createChartTitle()
        this.createNavButtons()
        this.createOptions()
        this.createDataSpreadsheet(this.data)
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

    createDataSpreadsheet(data)
    {
        this.data = data

        const columns = this.data.columnNames.length
        const rows = this.data.data.length

        const dataSpreadsheetContainer = document.createElement("div")
        dataSpreadsheetContainer.setAttribute('id', 'data-spreadsheet-container')

        const dataSpreadsheet = document.createElement('div')
        dataSpreadsheet.setAttribute('id', 'data-spreadsheet-scroll')
        dataSpreadsheetContainer.appendChild(dataSpreadsheet)

        const dataSpreadsheetTable = document.createElement('table')
        dataSpreadsheet.appendChild(dataSpreadsheetTable)

        const rowsArray = []

        for(let i = 0; i <= rows; i++)
        {
            const columnsArray = []
            for(let j = 0; j <= columns; j++)
            {
                columnsArray.push(`cell-${i}-${j}`)
            }
            rowsArray.push(columnsArray)
        }

        rowsArray.forEach((row, index) => {
            const newRow = document.createElement('tr')
            newRow.setAttribute('id', `row${index}`)
            dataSpreadsheet.appendChild(newRow)

            row.forEach((column, index) => {
                const newColumn = document.createElement('th')

                if (column != 'cell-0-0')
                {
                    const newCell = document.createElement('input')
                    newCell.setAttribute('type', 'text')
                    newColumn.setAttribute('id', column)

                    if(column.split('-')[1] === '0')
                    {
                        newCell.setAttribute('class', 'spreadsheet-column-name')
                        newCell.setAttribute('value', data.columnNames[column.split('-')[2] - 1])
                    }
                    else if(column.split('-')[2] === '0')
                    {
                        newCell.setAttribute('class', 'spreadsheet-row-name')
                        newCell.setAttribute('value', data.data[column.split('-')[1] - 1].name)
                    }
                    else
                    {
                        newCell.setAttribute('class', 'spreadsheet-value')
                        newCell.setAttribute('value', data.data[column.split('-')[1] - 1].values[column.split('-')[2] - 1])
                    }
                    
                    newColumn.appendChild(newCell)
                }
                newRow.appendChild(newColumn)
            })
        })
        
        document.body.appendChild(dataSpreadsheetContainer)

        //show button
        const showButton = document.createElement('button')
        showButton.setAttribute('id', 'spreadsheet-show-button') 
        showButton.innerHTML = "Show data"
        showButton.onclick = () => this.showSpreadsheet()
        document.body.appendChild(showButton)

        const exitButton = document.createElement('button')
        exitButton.setAttribute('id', 'spreadsheet-exit-button')
        exitButton.innerHTML = "X"
        exitButton.onclick = () => this.hideSpreadsheet()

        dataSpreadsheetContainer.appendChild(exitButton)


        this.hideSpreadsheet();
    }

    showSpreadsheet()
    {
        document.getElementById('data-spreadsheet-container').style.visibility = ''
        document.getElementById('spreadsheet-show-button').style.visibility = 'hidden'
    }

    hideSpreadsheet()
    {
        document.getElementById('data-spreadsheet-container').style.visibility = 'hidden'
        document.getElementById('spreadsheet-show-button').style.visibility = ''
    }

    // createGitHubLink()
    // {

    // }
}