let listaRetiradas = [];
let idAutoIncrement = 1;
const cadastroLivros = require('./cadastro_livros');
const cadastroClientes = require('./cadastro_clientes');

function listar() {
    return listaRetiradas;
}

function inserir(retirada) {
    livro = cadastroLivros.buscarPorId(retirada.idLivro);
    if(retirada && retirada.idCliente && retirada.idLivro && retirada.dataRetirada && livro && livro.isDisponivel == Boolean("true")){
        retirada.id = idAutoIncrement++;
        
        // calcula data devolucao em 7 dias da data retirada
        var time = new Date(retirada.dataRetirada);
        retirada.dataDevolucao = new Date();
        retirada.dataDevolucao.setDate(time.getDate() + 7);
        
        // atualiza Livro para isDisponivel False
        livro.isDisponivel = "false";
        cadastroLivros.atualizar(retirada.idLivro, livro);

        listaRetiradas.push(retirada);
        return retirada;
    }
    else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de retirada estao invalidos"
        });
    }
}

function buscarPorId(id) {
    for(let retirada of listaRetiradas){ 
        if(retirada.id == id){
            return retirada;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Retirada nao encontrado."
    });
}

function atualizar(id, retiradaAlterar) {
    if(!retiradaAlterar || !retiradaAlterar.idCliente || !retiradaAlterar.idLivro || !retiradaAlterar.dataRetirada || !retiradaAlterar.dataDevolucao){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de retirada estao invalidos"
        });       
    }
    for(let indice in listaRetiradas){
        if(listaRetiradas[indice].id == id) {
            retiradaAlterar.id = id;
            listaRetiradas[indice] = retiradaAlterar;
            return listaRetiradas[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: Retirada nao encontrada."
    });
}

function deletar(id) {
    for(let indice in listaRetiradas){
        if(listaRetiradas[indice].id == id) {
            const retiradaDeletado = listaRetiradas.splice(indice,1);
            return retiradaDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Retirada nao encontrado."
    });

}

module.exports = { 
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}