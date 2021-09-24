function pesquisa_cep(cep){
    
     //Script Regex de validação do CEP
     var valida_cep = /^[0-9]{8}$/;

    //Remove o '-' do CEP
    cep = cep.replace("-", "");

//OPÇÃO 1 - com uso de callback
//     //Elemento de Script para receber os dados da API
//     var resultado_cep = document.createElement('script');

//     //Valida o CEP
//     if(cep == "" || !valida_cep.test(cep)){
//         alert("CEP Inválido!");                
//     }else{
//         //Recebe o src(source) código do JSON e executa uma callback (é um função após a consulta)
//         resultado_cep.src = 'https://viacep.com.br/ws/'+cep+'/json/?callback=meu_callback';        
                
//         //Insere o valor do JSON no documento
//         document.body.appendChild(resultado_cep);
//     }

//OPÇÃO 2 - Usando requisição XMLHttprequest
    let resposta = new XMLHttpRequest(); //cria o objeto que manipula requisições http
    let url = 'https://viacep.com.br/ws/'+cep+'/json/';
    resposta.open('GET', url); //decreve o que será buscado e qual local    

    /*Configurações*/
    resposta.onreadystatechange = () => { //executação na alteraçao de estado da requisição
        if(resposta.readyState == 4){ //requisição concluída e resposta pronta
            console.log(resposta);
            if(resposta.status == 200){ //executa função após status de processado com sucesso 200
                meu_callback(JSON.parse(resposta.responseText));                
            }else{
                meu_callback({"erro":true});
            }

        }
    };
    resposta.send(); //Executa a requisição
}

function meu_callback(conteudo){
    if(!("erro" in conteudo)){
        document.getElementById("endereco").value = conteudo.logradouro;
        document.getElementById("bairro").value = conteudo.bairro;
        document.getElementById("cidade").value = conteudo.localidade;
        document.getElementById("estado").value = conteudo.uf;
        
    }else{
        alert("CEP Inválido");
        document.getElementById("endereco").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("estado").value = "";
        
    }
}

//Mascara
$(function(){
$(".cpf_mask").mask('999.999.999-99');
$(".tel_res_mask").mask('(99)9999-9999');
$(".tel_cel_mask").mask('(99)99999-9999');
$(".cep_mask").mask('99999-999');
});

function gerar_json(form){
    var nome = form.nome.value;
    var cpf = form.cpf.value;
    var telefone_res = form.telefone_res.value;
    var telefone_cel = form.telefone_cel.value;
    var cep = form.cep.value;
    var endereco = form.endereco.value;
    var numero = form.numero.value;
    var bairro = form.bairro.value;
    var cidade = form.cidade.value;
    var estado = form.estado.value;
    
 
    var dados = {nome, cpf, telefone_res, telefone_cel, cep, endereco, numero, bairro, cidade, estado};
    
    document.write("<h2>Retorno em JSON</h2><br>");
    document.write(JSON.stringify(dados, null,'<br>'));
}

