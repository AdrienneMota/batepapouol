//Validação de usuário

const nomeuser = prompt("Bem-vindo(a) ao bate papo uol. Por favor, digite seu lindo nome.");

const usuario = {
    name: ""
}

usuario.name = nomeuser;

function cadastrarusuario(){
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', usuario);
    requisicao.then(tratarsucesso_user);
    requisicao.catch(tratarerro_user);
}

function tratarsucesso_user(){
    listarmensagem();
}

function tratarerro_user(erro){
    if(erro.response.status === 400){
        alert('400.. O nome de usuário já existe, por favor, digite um nome válido.');
        window.location.reload();
    }else{
        alert('Ops.. Um erro inesperado. Tente novamente mais tarde.')
    }
}

setInterval(listarmensagem, 3000);

cadastrarusuario();
//////////////////////////////////////////////////
//avisando para o servidor que o usuário ainda está na sala

function toAqui(){
    usuario.name = nomeuser;
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status ', usuario);
    requisicao.then(console.log('avisado'));
    requisicao.catch(console.log('erro'));
}

setInterval(toAqui, 1000);

//////////////////////////////////////////////////
//renderizando as mensagens na tela

const tipomensagem = {
    private_message: 'private_message',
    status: 'status',
    message_normal: 'message'
} // objeto para guardar os tipos de mensagens


function listarmensagem(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizarmensagens);
    promessa.catch(mostrarerro);
}

function renderizarmensagens(resposta){
    const menssagens = resposta.data;
    
    for (const mensagem of menssagens) {
        if(mensagem.type === tipomensagem.message_normal){
            mensagemnormal(mensagem);
        }
        if(mensagem.type === tipomensagem.private_message){
            mensagemprivada(mensagem);
        }
        if(mensagem.type === tipomensagem.status){
            mensagemstatus(mensagem);
        }
    }
    const mural = document.querySelector('.mural');
    let lastmensagem = mural.lastElementChild;
    lastmensagem.scrollIntoView();

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

function mensagemprivada(mensagem){
    if(mensagem.from === usuario.nome){
        const listamsg = document.querySelector('.mural');
        listamsg.innerHTML += 
        `<div class="mensagem-reservada">
        <div class="hora">(${mensagem.time})</div>
        <div class="nome-user"><strong>${mensagem.from}</strong></div>
        <div class="to">reservadamente para</div>
        <div class="destino">
            <strong>${mensagem.to}</strong>
        </div>
        <div class="conteudo">${mensagem.text}</div>
    </div>`;    
    }
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

function mostrarerro(){
    alert('Ops... Tivemos um erro inesperado.');
    console.log(erro);
}


//////////////////////////////////////////////////
//enviar mensagem

function enviarmensagem(){
    const textomensagem = document.querySelector('.texto');

    const texto = {
        from: usuario.nome,
        to: "Todos",
        text: textomensagem.value,
        type: "message"
    }

    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', texto);
    promisse.then(listarmensagem);
    promisse.catch(usuario_fora);
}

function usuario_fora(){
    alert('erro');
}






