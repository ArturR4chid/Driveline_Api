# Issue: Uso Correto do Model no Controller

## Problema
Atualmente, os controllers estão utilizando consultas SQL diretamente via o objeto `db`, sem utilizar os métodos dos Models definidos em `api/models/`. Isso não segue o padrão MVC com Sequelize.

## Exemplo do que deve ser feito

**Controller usando Model:**
```js
const Usuario = require('../api/models/Usuario');

class UsuarioController {
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const novoUsuario = await Usuario.create({ nome, email, senha });
            res.json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    // ...outros métodos usando Usuario.findAll(), Usuario.findOne(), etc.
}

module.exports = new UsuarioController();
```

## Tarefa
- Refatorar os controllers para utilizar os métodos dos Models (ex: `Usuario.create`, `Usuario.findAll`, etc.) ao invés de consultas SQL diretas.
- Garantir que toda manipulação de dados passe pela camada Model.

## Observação sobre Repository
O grupo não está utilizando um padrão Repository dedicado para persistência, o que seria o ideal para maior desacoplamento e testabilidade. Porém, como o ORM Sequelize já abstrai o acesso ao banco de dados e centraliza as operações de persistência nos Models, isso é suficiente para manter o projeto organizado e seguindo boas práticas.

## Benefícios
- Seguir o padrão MVC corretamente
- Centralizar regras de negócio e persistência

---
**Exemplo de commit:**
```
refactor(controller): usar model Usuario para persistência de dados
```
