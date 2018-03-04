const uniqid = require('uniqid');
let gen = ()=>{
    return uniqid.time()
}
export default gen