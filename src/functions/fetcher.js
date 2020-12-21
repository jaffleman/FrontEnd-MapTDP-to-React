

export async function fetcher (data){
    const myBody = JSON.stringify(data)
    const result = await fetch("http://192.168.0.14:8081/tdp/search",
    { 
        method: 'POST',
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