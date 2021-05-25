import newPlot  from '../classes/newPlot';
/*
    input: Array<String>
    output: Array<Plot>
*/
export const transforme = params => params.map(value => new newPlot(value));


