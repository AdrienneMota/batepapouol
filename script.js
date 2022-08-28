const tipomensagem = {
    private_message: 'private_message',
    status: 'status',
    message_normal: 'message'
}

listarmensagem();

function listarmensagem(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizarmensagens);
    promessa.catch(mostrarerro);
}

function mostrarerro(){
    alert('erro');
}

function renderizarmensagens(resposta){
    const menssagens = resposta.data;
    console.log(menssagens.time);

    for (const mensagem of menssagens) {
        if(mensagem.type === tipomensagem.message_normal){
            mensagemnormal(mensagem);
        }
        if(mensagem.type === tipomensagem.private_message){
            //aqui chama o método
        }if(mensagem.type === tipomensagem.status){
            mensagemstatus(mensagem);
        }
    }
}

function mensagemnormal(mensagem){
    
    const listamsg = document.querySelector('.mural');

    listamsg.innerHTML +=     
    `<div class="mensagem-normal">
        <div class="hora">(${mensagem.time})</div>
        <div class="nome-user"><strong>${mensagem.from}</strong></div>
        <div class="para">para</div>
        <div class="destino">
            <strong>${mensagem.to}</strong>
        </div>
        <div class="conteudo">${mensagem.text}</div>
    </div>`;
}

function mensagemstatus(mensagem){
    
    const listamsg = document.querySelector('.mural');

    listamsg.innerHTML +=     
    `<div class="mensagem-status">
    <div class="hora">(${mensagem.time})</div>
    <div class="nome-user"><strong>${mensagem.from}</strong></div>
    <div class="status">${mensagem.text}</div>
    </div>`;
}

// function mensagemprivada(mensagem){
    
//     const listamsg = document.querySelector('.mural');

//     listamsg.innerHTML +=     
//     
// }





