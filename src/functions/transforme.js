import { Plot } from './plot';
/*
    input: Array<String>
    output: Array<Plot>
*/
export function transforme(params) {
    return params.map(value => new Plot(value).getInfo());
}
