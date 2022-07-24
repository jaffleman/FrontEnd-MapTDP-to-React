import {fetcher} from '../../functions/fetcher'

const VerifRepName = async (repName, callBack) => {
        const regex = /^([a-z]){3}([0-9]){2}$/;
        if (!regex.test(repName)) {
                const result = {'err':new Error(`${repName}: Le nom du rep est incorrect`)}
                callBack(result)
                return
        }
        fetcher("searchRep","POST",[{rep:repName}])
        .then(result=>  callBack(result, repName))
}
export default VerifRepName