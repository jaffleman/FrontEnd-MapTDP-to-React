//import { filter } from "./filter";

export default async function getClipboardContent(callback){
    if(navigator.clipboard) navigator.clipboard.readText().then(text =>callback(text))    
}