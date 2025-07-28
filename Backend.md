# 📚 Aula de Backend com Node.js + Express + MySQL

## 🔧 O que vamos aprender?

Neste documento, vamos entender **cada parte** do código abaixo:

```js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
```

E muito mais!

Vamos aprender:

* O que é um **servidor backend**
* O que são **rotas** e **endpoints**
* O que é uma **porta**
* Como nos conectamos com um **banco de dados MySQL**
* Como **cadastrar**, **listar**, **buscar por ID**, **atualizar** e **deletar usuários**
* O que significa cada **função**, **parâmetro** e **resposta**

---

## 🧠 Conceitos básicos

### 🖥️ O que é backend?

O **backend** é a parte do sistema que roda no servidor. Ele é responsável por:

* **Receber requisições** do frontend (como um formulário enviado pelo site)
* **Processar dados**
* **Acessar o banco de dados**
* **Retornar respostas** (por exemplo: "Usuário cadastrado com sucesso!")

### 🌐 O que é um servidor?

Um **servidor** é um computador ou programa que **escuta** requisições em uma porta específica (como a 3000) e **responde** com dados. No nosso caso, usamos o Node.js para **criar esse servidor**.

---

## 🔁 O que são requisições e respostas?

* Uma **requisição (request)** é quando alguém (o navegador, por exemplo) **pede algo** para o servidor.
* Uma **resposta (response)** é a **resposta do servidor** para aquela requisição.

---

## 🚪 O que é uma porta (port)?

Uma **porta** é como uma **porta de entrada** para o servidor. Existem milhares de portas (de 0 a 65535). Por padrão, usamos a **porta 3000** para aplicações web locais.

---

## 📦 Dependências utilizadas

### 1. **Express**

É um framework do Node.js para criar servidores com rotas e controle de requisições.

```js
const express = require('express');
```

### 2. **MySQL2**

É a biblioteca que permite conectar e interagir com o banco de dados MySQL.

```js
const mysql = require('mysql2');
```

### 3. **body-parser**

Permite que o servidor **entenda os dados** enviados em formato JSON no corpo da requisição.

```js
const bodyParser = require('body-parser');
```

---

## 🏗️ Estrutura do código

---

### 1. Inicialização

```js
const app = express();
app.use(bodyParser.json());
```

* `app` é nossa aplicação Express.
* `app.use(bodyParser.json())`: configura o servidor para aceitar dados no formato JSON (como em formulários).

---

### 2. Conectando ao banco de dados MySQL

```js
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'meu_banco'
});
```

Essa parte cria uma **conexão com o banco de dados**.

* `host`: endereço do banco (geralmente `localhost` para local)
* `port`: porta padrão do MySQL (3306)
* `user`: nome de usuário para acessar o banco
* `password`: senha do banco
* `database`: nome do banco que será usado

### Testando a conexão

```js
connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados: ' + error.stack);
    return;
  }
  console.log('Conectado ao banco de dados com ID ' + connection.threadId);
});
```

* `connect` tenta se conectar ao banco
* `error`: se existir, algo deu errado
* `connection.threadId`: ID da conexão ativa
* 
- `connection.connect(...)` → função da biblioteca `mysql2` que **inicia a conexão** com o banco.
- Recebe como argumento uma **função de callback** — ou seja, uma função que será executada **depois** que o banco de dados **responder**.
- Essa função recebe um **parâmetro `error`**.

Se error for verdadeiro (ou seja, se houve erro), mostramos no console com:
console.error('Erro ao conectar ao banco de dados: ' + error.stack);
error.stack: mostra uma descrição detalhada do erro (tipo, mensagem, rastreamento).

connection.threadId`: é um identificador único da conexão com o banco (é como um "protocolo de atendimento" que o banco gera para cada nova conexão).
---

## 🌐 Rotas (Endpoints)

Cada rota representa uma **ação possível** na aplicação.

### 📩 POST `/usuarios`

**Objetivo**: Cadastrar um novo usuário

```js
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.query(sql, [nome, email, senha], (error) => {
    if (error) return res.status(500).send('Erro ao adicionar usuário.');
    res.status(201).send('Usuário adicionado com sucesso.');
  });
});
```

* `POST`: envia dados
* `req.body`: corpo da requisição (JSON com nome, email e senha)
* `?`: evita SQL Injection (substituído pelos valores no array `[nome, email, senha]`)
* `res.status(201)`: código HTTP para "criado com sucesso"

---

### 📥 GET `/usuarios`

**Objetivo**: Listar todos os usuários

```js
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) return res.status(500).send('Erro ao obter usuários.');
    res.json(results);
  });
});
```

* `GET`: solicita informações
* `SELECT *`: busca todos os usuários
* `res.json(results)`: envia os dados em formato JSON

---

### 🔍 GET `/usuarios/:id`

**Objetivo**: Buscar usuário pelo ID

```js
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send('Erro ao obter usuário.');
    res.json(results[0]);
  });
});
```

* `:id`: parâmetro dinâmico (como `/usuarios/2`)
* `req.params.id`: acessa esse valor
* `results[0]`: retorna o primeiro (e único) resultado

---

### ✏️ PUT `/usuarios/:id`

**Objetivo**: Atualizar dados de um usuário

```js
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
  connection.query(sql, [nome, email, senha, id], (error) => {
    if (error) return res.status(500).send('Erro ao atualizar usuário.');
    res.send('Usuário atualizado com sucesso.');
  });
});
```

* Atualiza os campos com os valores enviados no body
* Usa o `id` da URL para saber **qual usuário atualizar**

---

### ❌ DELETE `/usuarios/:id`

**Objetivo**: Deletar usuário pelo ID

```js
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error) => {
    if (error) return res.status(500).send('Erro ao deletar usuário.');
    res.send('Usuário deletado com sucesso.');
  });
});
```

* Deleta o usuário cujo ID é passado na URL

---

## 🟢 Iniciando o servidor

```js
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

* `PORT = 3000`: definimos a porta do servidor
* `app.listen`: inicia o servidor para escutar nessa porta
* `console.log`: mensagem no terminal

---

## 🧪 Como testar as rotas?

Você pode usar o **Thunder Client** (extensão do VS Code) ou o **Postman**.

Exemplo:

* **POST**: Enviar JSON com nome, email e senha
* **GET**: Acessar `http://localhost:3000/usuarios`
* **DELETE**: Enviar para `http://localhost:3000/usuarios/1`

---

## 🧾 Exemplo de banco de dados (MySQL)

```sql
CREATE DATABASE meu_banco;

USE meu_banco;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  senha VARCHAR(100)
);
```

---

## ✅ Resumo

| Verbo HTTP | Caminho        | Ação                     |
| ---------- | -------------- | ------------------------ |
| POST       | /usuarios      | Cadastrar novo usuário   |
| GET        | /usuarios      | Listar todos os usuários |
| GET        | /usuarios/\:id | Buscar usuário por ID    |
| PUT        | /usuarios/\:id | Atualizar usuário por ID |
| DELETE     | /usuarios/\:id | Deletar usuário por ID   |

---

## 📌 Conclusão

Com este código, você tem um servidor backend **completo**, que:

* Usa **Node.js** com **Express**
* Se conecta a um **banco de dados MySQL**
* Cria uma **API RESTful** com rotas para cadastro, listagem, atualização e exclusão de dados

🖥️ Seu computador vira um "servidor local"
Ele começa a escutar requisições na porta 3000.

Isso quer dizer que qualquer programa (como um navegador ou app) que mandar uma requisição para http://localhost:3000 vai estar se comunicando com o seu código.

Por isso dizemos que você está rodando um servidor local.

🔄 Mas esse servidor local também se comunica com outro servidor
Esse outro servidor é:

🔸 O servidor do banco de dados MySQL, que também está no seu computador (localhost), mas é um outro processo separado.

| O que acontece                     | Onde acontece                    |
| ---------------------------------- | -------------------------------- |
| Seu código recebe requisições      | No servidor Express (porta 3000) |
| Seu código acessa o banco de dados | No servidor MySQL (porta 3306)   |
| O banco responde com os dados      | Para o seu código Express        |
| Seu código envia a resposta final  | Para o navegador ou Thunder      |

