import {reduce} from './reduce'
import {transforme} from './transforme'
import {newFilter} from './newFilter'
import newPlot from '../classes/newPlot'

export default function extraireLesDonnees(data:string):newPlot[] {
    return reduce(transforme(newFilter(data)))
}