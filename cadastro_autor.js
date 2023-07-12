
let listaAutor = [];
let idAutoIncrement = 1;

function listar() {
    return listaAutor;
}

function inserir(autor) {
    if(autor && autor.nome && autor.paisOrigem){
        autor.id = idAutoIncrement++;
        listaAutor.push(autor);
        return autor;
    }
    else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de autor estao invalidos"
        });
    }
}

function buscarPorId(id) {
    for(let autor of listaAutor){ 
        if(autor.id == id){
            return autor;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor nao encontrado."
    });
}

function atualizar(id, autorAlterar) {
    if(!autorAlterar || !autorAlterar.nome || !autorAlterar.paisOrigem){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de autor estao invalidos"
        });       
    }
    for(let indice in listaAutor){
        if(listaAutor[indice].id == id) {
            autorAlterar.id = id;
            listaAutor[indice] = autorAlterar;
            return listaAutor[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: Autor nao encontrado."
    });
}

function deletar(id) {
    for(let indice in listaAutor){
        if(listaAutor[indice].id == id) {
            const autorDeletado = listaAutor.splice(indice,1);
            return autorDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor nao encontrado."
    });

}

module.exports = { 
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}