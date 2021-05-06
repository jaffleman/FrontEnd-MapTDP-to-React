export function expend(params){
    const tab =[]
    params.forEach(tdp=>{
        if (typeof(tdp.plot)==='string') tab.push({...tdp})
        else tdp.plot.forEach((plot)=>tab.push({...tdp, plot:plot}))
    })
    return tab
}