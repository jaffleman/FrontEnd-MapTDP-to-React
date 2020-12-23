

const VerifRepName = (repName) => {
        const regex = /^([a-z]){3}([0-9]){2}$/;
        return regex.test(repName)
}
export default VerifRepName