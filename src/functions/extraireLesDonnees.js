import {reduce} from '../functions/reduce'
import {transforme} from '../functions/transforme'
import {newFilter} from './newFilter'

export default function extraireLesDonnees(data){
    return reduce(transforme(newFilter(data)))
}