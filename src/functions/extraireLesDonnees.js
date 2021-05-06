import {reduce} from '../functions/reduce'
import {transforme} from '../functions/transforme'
import {filter} from '../functions/filter'

export default function extraireLesDonnees(data){
    return reduce(transforme(filter(data)))
}