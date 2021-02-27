

export async function fetcher (route, method, data=null ){
    const myBody = JSON.stringify(data)
    const result = await fetch(`http://82.64.128.239:8083/tdp/${route}`,
    { 
        method: method,
        mode: 'cors',
        body: myBody,
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    if (result.ok){
        const jsonData = await result.json()
        return jsonData
    }
}