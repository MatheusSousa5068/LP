function isAuth() {
    if (!getToken()) {
        window.location.href = '/login'
    } else {
        return true
    }
}

function getToken() {
    return localStorage.getItem('@Sorteador:token')
}

isAuth()

const botao = document.querySelector("#botao");


async function sortear() {

    const min = document.getElementById("minimo").value;
    const max = document.getElementById("maximo").value;
    const email = localStorage.getItem('@Sorteador:email')


    console.log(min, max)
    
    if (Number(max) > Number(min)) {
        const array = [min, max, email];
        const result = await fetch("http://localhost:1234/numeros", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(array),
        });

        read()
    } else {
        alert('O máximo deve ser o maior número')
    }


}

async function read() {
    const results = await fetch("http://localhost:1234/readLast", {
        method: "GET",
    });

    const pedidos = await results.json()

    const resultP = document.getElementById("resultP")

    resultP.innerText = pedidos[0].resultado
    console.log(`O resultado foi: ${pedidos[0].resultado}`)
}


async function logout() {
    localStorage.removeItem('@Sorteador:token')
    localStorage.removeItem('@Sorteador:email')

    window.location.href = '/login'
}