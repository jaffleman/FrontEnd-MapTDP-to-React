export async function fetcher (route, method, data, callback=null){
    if (data.length === 0) return {data:[]}
    else{
        const body = JSON.stringify(data)
        const result = await fetch(`http://192.168.0.14:8081/tdp/${route}`,
        { 
            method,
            mode: 'cors',
            body,
            headers:{'Content-Type' : 'application/json'}
        }).catch(err => {
            alert('probleme')
            return {err}
        })
        if (result.ok){
            const jsonData = await result.json()
            if (callback !== null) callback()
            return {data:jsonData}
        }else if (result.err) return {err:result.err}
    }
}