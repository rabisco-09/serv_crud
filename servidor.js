// const express = require("express"); // antigo
import express from "express"; // atual
const app = express();

app.use(express.json())

let proximoId = 2

let LISTARALUNOS = [
    {
        id: 1,
        nome: "Vitor"
    },{
        id: 2,
        nome: "Caio"
    }
]
app.get("/", (req, res)=>{
    res.status(200).json({msg: "Sucesso!"})
})

app.get("/alunos", (req,res)=>{
    res.status(200).json(LISTARALUNOS)
})

app.get("/alunos/:id", (req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = LISTARALUNOS.find(a=>a.id===idParametro)
    if (!aluno){
        res.status(404).json({msg:"Usuário não encontrado"})
    }
    res.status(200).json(aluno)

    })

app.put("/alunos/:id", (req,res)=>{
    const idParametro = Number(req.params.id)
    const indiceAluno = LISTARALUNOS.findIndex(a=>a.id===idParametro)
    const {nome} = req.body
    if (!indiceAluno){
        res.status(404).json({msg:"Usuário não encontrado"})
    }
    if (!nome){
        return res.status(404).json({msg: "Preencha todos os campos"})
    }

    LISTARALUNOS[indiceAluno] = {id : idParametro, nome}
    res.status(200).json({msg:"Alteração feita com sucesso", Indice: indiceAluno})

    })

app.put("/alunos/", (req,res)=>{
    console.log("Parametro: ", req.params)
    const idParametro = req.params.id ? Number(req.params.id) : 0
    if(idParametro === 0){
        return res.status(400).json({msg: "Nome é obrigatório!"})
    }
})

app.delete("/alunos/:id", (req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = LISTARALUNOS.find(a=>a.id===idParametro)
    console.log(aluno)
    if (aluno==-1){
        res.status(404).json({msg:"Usuário não encontrado"})
    }
    LISTARALUNOS.splice(aluno,1)
    res.status(200).json(aluno)

    })

app.post("/alunos", (req,res)=>{
    console.log(req.body)
    const {nome} = req.body
    if (!nome){
        res.status(400).json({msg:"Nome inválido!"})
    }
    const id = LISTARALUNOS.length > 0 ? LISTARALUNOS[LISTARALUNOS.length-1].id + 1 : 1
    const aluno = {id:proximoId+1,nome}
    LISTARALUNOS.push(aluno)
    res.status(201).json({msg: "Aluno cadastrado com sucesso!"})
})

app.listen(5000, ()=>{
    console.log(`Servidor rodando!`)
})