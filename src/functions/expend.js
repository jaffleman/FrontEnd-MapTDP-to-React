export function expend(params){
    const tab =[]
    params.forEach(tdp=>{
        tdp.plot.forEach((plot)=>tab.push({...tdp, plot:plot}))
    })
    return tab
}