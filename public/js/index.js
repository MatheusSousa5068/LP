const botao = document.querySelector("#botao");

async function sortear() {
    const min = document.getElementById("minimo").value;
    const max = document.getElementById("maximo").value;

    const array = [min, max];

    const result = await fetch("http://localhost:1234/numeros", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(array),
    });

    read()
}

async function read() {
    const results = await fetch("http://localhost:1234/readLast", {
        method: "GET",
    });

    const pedidos = await results.json()

    const resultP = document.getElementById("resultP")

    resultP.innerText = pedidos[0].resultado
}