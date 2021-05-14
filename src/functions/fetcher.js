export async function fetcher (route, method, data){
    if (data.length === 0) return {data:[]}
    else{
        const body = JSON.stringify(data)
        const result = await fetch(`https://api.jaffleman.tech/tdp/${route}`,
        { 
            method,
            mode: 'cors',
            body,
            headers:{
                'Content-Type' : 'application/json'
            }
        }).catch(err => {
            alert('probleme')
            return {err}
        })
        if ("ok" in result){
            const jsonData = await result.json()
            return {data:jsonData}
        }else return {err:result.err}
    }
}