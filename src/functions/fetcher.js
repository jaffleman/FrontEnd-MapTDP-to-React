export async function fetcher (route, method, data=null, callback=(data)=>{return data}){
    if (data.length === 0) callback([])
    else{
        const body = JSON.stringify(data)
        const result = await fetch(`http://82.64.128.239:8083/tdp/${route}`,
        { 
            method,
            mode: 'cors',
            body,
            headers:{'Content-Type' : 'application/json'}
        }).catch(err => err)
        if (result.ok){
            const jsonData = await result.json()
            callback()
            return jsonData
        }else return 'error'
    }
}