let listaLivros = [];
let idAutoIncrement = 1;
const cadastroAutor = require('./cadastro_autor');

function listar() {
    return listaLivros;
}

function inserir(livro) {
    if(livro && livro.nome && livro.isbn && livro.idAutor && livro.editora && livro.anoPublicacao && cadastroAutor.buscarPorId(livro.idAutor)){
        livro.id = idAutoIncrement++;
        livro.isDisponivel = true;
        listaLivros.push(livro);
        return livro;
    }
    else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de livro estao invalidos"
        });
    }
}

function buscarPorId(id) {
    for(let livro of listaLivros){ 
        if(livro.id == id){
            return livro;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Livro nao encontrado."
    });
}

function atualizar(id, livroAlterar) {
    if(!livroAlterar || !livroAlterar.nome || !livroAlterar.isbn || !livroAlterar.idAutor || !livroAlterar.editora || !livroAlterar.anoPublicacao || !livroAlterar.isDisponivel){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de livro estao invalidos"
        });       
    }
    for(let indice in listaLivros){
        if(listaLivros[indice].id == id) {
            livroAlterar.id = id;
            listaLivros[indice] = livroAlterar;
            return listaLivros[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: Livro nao encontrado."
    });
}

function deletar(id) {
    for(let indice in listaLivros){
        if(listaLivros[indice].id == id) {
            const livroDeletado = listaLivros.splice(indice,1);
            return livroDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Livro nao encontrado."
    });

}

module.exports = { 
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}