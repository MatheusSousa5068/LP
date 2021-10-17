async function login() {
    const email = document.getElementById("exampleInputEmail1").value
    const senha = document.getElementById("exampleInputPassword1").value


    const data = {
        "email": email,
        "senha": senha
    }

    const result = await fetch("http://localhost:1234/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    }
    )

    return await result.json()
    
}

async function enviar() {
    const data = await login()

    if (data.auth) {
        logar(data.token, data.email)
    }


}

function logar(token, email) {
    localStorage.setItem('@Sorteador:token', token)
    localStorage.setItem('@Sorteador:email', email)

    window.location.href = '/numeros'
}




