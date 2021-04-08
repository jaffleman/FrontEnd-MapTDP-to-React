import {fetcher} from '../../functions/fetcher'

const VerifRepName = async (repName, callBack=(result, repName)=>result) => {
        const regex = /^([a-z]){3}([0-9]){2}$/;
        if (!regex.test(repName)) return alert(`${repName}: Le nom du rep est incorrect`)
        fetcher("searchRep","POST",[{rep:repName}])
        .then(result=>{callBack(result, repName)})
}
export default VerifRepName