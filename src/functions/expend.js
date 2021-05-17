export function expend(params){
    const tab =[]
    params.forEach(tdp=>typeof(tdp.plot)==='string'?tab.push({...tdp}):tdp.plot.forEach((plot)=>tab.push({...tdp, plot:plot})))
    return tab
}