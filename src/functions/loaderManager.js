
const loader=(value,props)=> {
    props.dispatch({
        type: "UPDATE_LOADER",
        value: value
    })
}
export default loader