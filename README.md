#  DriveLine - API de Gerenciamento

API para gerenciamento de empresas, usuários e veículos desenvolvida em Node.js 

##  Sobre o Projeto

A api **DriveLine_Api ** é uma API RESTful que permite o gerenciamento completo de:

- **Empresas** - Cadastro e gestão de empresas
- **Usuários** - Control de usuários com sistema de autenticação
- **Veículos** - Registro e associação de veículos às empresas

##  Arquitetura

O projeto foi desenvolvido seguindo os princípios de **Programação Orientada a Objetos (POO)** com as seguintes camadas:

### 📁 Estrutura do Projetoa

app/
├── models/ (Sequelize)
├── controllers/ 
├── routes/ 
├── config/ 
└── app.js


### 🔧 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL** - Banco de dados
- **CORS** - Middleware para cross-origin

## 🚀 Funcionalidades

###  Módulo de Empresas
- [X] Listar todas as empresas
- [X] Buscar empresa por ID
- [X] Cadastrar nova empresa
- [X] Atualizar dados da empresa
- [X] Excluir empresa

###  Módulo de Usuários
- [X] Listar todos os usuários
- [X] Buscar usuário por ID
- [X] Cadastrar novo usuário
- [X] Atualizar dados do usuário
- [X] Excluir usuário
- [X] **Sistema de Login** - Autenticação com email e senha

###  Módulo de Veículos
- [X] Listar todos os veículos
- [X] Buscar veículo por ID
- [X] Cadastrar novo veículo
- [X] Atualizar dados do veículo
- [X] Excluir veículo
- [X] **Associação com empresas** - Cada veículo pertence a uma empresa

## 📊 Endpoints da API

### Empresas
```bash
GET /empresas # Listar todas
GET /empresas/:id # Buscar por ID
POST /empresas # Criar nova
PUT /empresas/:id # Atualizar
DELETE /empresas/:id # Excluir
```

### Usuários

```bash
GET /usuarios # Listar todos
GET /usuarios/:id # Buscar por ID
POST /usuarios # Criar novo
PUT /usuarios/:id # Atualizar
DELETE /usuarios/:id # Excluir
POST /usuarios/login # Fazer login
```

### Veículos
```bash
GET /veiculos # Listar todos
GET /veiculos/:id # Buscar por ID
POST /veiculos # Criar novo
PUT /veiculos/:id # Atualizar
DELETE /veiculos/:id # Excluir
```


## Características da Implementação POO

### **Encapsulamento** - Cada classe tem responsabilidades bem definidas

### **Reutilização** - Código organizado para fácil manutenção

### **Manutenibilidade** - Estrutura clara e expansível

### **Abstração** - Detalhes internos ocultos através de interfaces claras

## Padrões Utilizados

### MVC (Model-View-Controller) adaptado para API

### Singleton para instâncias únicas de controllers

### Repository Pattern para acesso a dados

