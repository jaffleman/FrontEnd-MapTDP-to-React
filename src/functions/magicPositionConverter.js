export function mPc(params){
    let i = 0;
    const tab =[];
    for (let b = 1; b < 17; b++) {
        for (let a = 1; a < 9; a++) {
            tab[i]=[`${b}-${a}`];
            i++;
        }
    } 
    return tab[parseInt(params)]
}