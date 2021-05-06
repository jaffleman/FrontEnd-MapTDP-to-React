import { Plot } from '../classes/plot';
/*
    input: Array<String>
    output: Array<Plot>
*/
export const transforme = params => params.map(value => new Plot(value));


