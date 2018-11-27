const table = document.querySelector("table");

convertToNumberingScheme = (number)=>{
    let baseChar = ("A").charCodeAt(0),
        letters = "";
    do {
        number -= 1;
        letters = String.fromCharCode(baseChar + (number % 26)) + letters;
        number = (number / 26) >> 0; // quick `floor`
    } while(number > 0);

    return letters;
};

for (let i = 0; i < 1001; i++){
    const row = table.insertRow(-1);
    for (let j = 0; j < 101; j++){
        row.insertCell(-1).innerHTML = i&&j ? "<input id='"+ convertToNumberingScheme(j)+i +"'/>" : i||convertToNumberingScheme(j);
    }
}

const DATA={}, INPUTS=[].slice.call(document.querySelectorAll("input"));
INPUTS.forEach(function(element) {
    element.onfocus = function(e) {
        e.target.value = localStorage[e.target.id] || "";
    };
    element.onblur = function(e) {
        localStorage[e.target.id] = e.target.value;
        computeAll();
    };
    let getter = function() {
        let value = localStorage[element.id] || "";
        if (value.charAt(0) === "=") {
            with (DATA) return eval(value.substring(1));
        } else { return isNaN(parseFloat(value)) ? value : parseFloat(value); }
    };
    Object.defineProperty(DATA, element.id, {get:getter});
    Object.defineProperty(DATA, element.id.toLowerCase(), {get:getter});
});
(window.computeAll = function() {
    INPUTS.forEach(function(element) { try { element.value = DATA[element.id]; } catch(e) {} });
})();
