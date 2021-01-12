import {fetcher} from '../../functions/fetcher'

const VerifRepName = async (repName, callBack=(result)=>result) => {
        const regex = /^([a-z]){3}([0-9]){2}$/;
        if (!regex.test(repName)) return false
        fetcher("searchRep","POST",[{rep:repName}])
        .then(result=>callBack(result))
}
export default VerifRepName