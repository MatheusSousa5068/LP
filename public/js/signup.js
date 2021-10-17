async function enviar() {
    const email = document.getElementById("exampleInputEmail1").value;
    const nome = document.getElementById("formGroupExampleInput").value;
    const senha = document.getElementById("exampleInputPassword1").value;

    const data = [email, nome, senha];

    const result = await fetch("http://localhost:1234/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    }
    
    );
    window.location.href = '/login'
    
}