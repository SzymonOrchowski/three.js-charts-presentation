import Presentation from "../Presentation"
import Environment from './Environment'
import BarChart from "./BarChart"

import { chart1 } from '../../data/data'

export default class World
{
    constructor()
    {
        this.environment = new Environment()
        this.chart1 = new BarChart(chart1)
    }

    update()
    {
        this.chart1.arrayOfBars.forEach(bar => bar.update())
    }
}