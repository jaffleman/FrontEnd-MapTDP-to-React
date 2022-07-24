export function filter(text) {
    /*
        Allow to found tdp element in a given text
        input: string => output: Array<string>
    */
    const regex = /([a-zA-Z]){3}([0-9]){2}((-[0-9])|(-([0-9]{2}))|) ((L\/INX)|(A\/TEL)|(R\/DEG)|(T\/LIF)|(linx)|(atel)|(rdeg)|tlif)(\w){2}([0-9]){3}|(([a-zA-Z]){3}([0-9]){2}((-[0-9])|(-([0-9]{2}))|) ((L\/INX)|(A\/TEL)|(R\/DEG)|(T\/LIF)|(linx)|(atel)|(rdeg)|tlif)(\w){2})/gmi;
    let tab = [];
    const matchRegexTab = [];
    while ((tab = regex.exec(text)) !== null) if (!(matchRegexTab.includes(tab[0]))) matchRegexTab.push(tab[0])
    return matchRegexTab;
}
