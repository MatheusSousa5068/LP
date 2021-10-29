async function enviar() {
    const email = document.getElementById("exampleInputEmail1").value;
    const nome = document.getElementById("formGroupExampleInput").value;
    const senha = document.getElementById("exampleInputPassword1").value;
    

    // Validações
    if (email != '' && nome != '' && senha != '') {
        const data = {
            email,
            nome,
            senha,
        }
        const result = await fetch("http://localhost:1234/signup", {
            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });


        
    } else {
        alert('Preencha todos os dados antes de enviar')
    }
    
    window.location.href = '/login'
    
}
