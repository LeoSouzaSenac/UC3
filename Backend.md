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


## 🧠 O que esse trecho faz?

Essa parte do código cria uma **rota HTTP POST** para **cadastrar um novo usuário** no banco de dados MySQL. Quando o cliente (por exemplo, um site ou app) envia um **JSON com nome, email e senha**, o backend:

1. Recebe os dados
2. Monta a instrução SQL
3. Insere os dados na tabela `usuarios`
4. Retorna uma resposta indicando sucesso ou erro

---

## 🧱 Explicação detalhada

### 🔸 `app.post('/usuarios', (req, res) => { ... })`

#### 🔹 `app.post(...)`

* **`app`** é a nossa aplicação Express.
* **`.post()`** define que essa rota aceita requisições **HTTP do tipo POST**.
* O método POST é usado quando queremos **enviar dados para o servidor** (ex: cadastrar, criar).

#### 🔹 `'/usuarios'`

* Caminho da URL.
* Quando um cliente envia uma requisição para `http://localhost:3000/usuarios` usando o método **POST**, essa função será executada.

#### 🔹 `(req, res) => { ... }`

* Esta é a **função de callback** que será executada quando essa rota for chamada.
* **`req`** (request): objeto que contém todas as informações da requisição feita pelo cliente.
* **`res`** (response): objeto usado para enviar uma resposta ao cliente.

---

### 🔸 `const { nome, email, senha } = req.body;`

* Aqui estamos **desestruturando** o objeto `req.body`, que contém os dados enviados pelo cliente em formato JSON.
* Se o corpo da requisição for:

  ```json
  {
    "nome": "João",
    "email": "joao@email.com",
    "senha": "123456"
  }
  ```

  então:

  * `nome = "João"`
  * `email = "joao@email.com"`
  * `senha = "123456"`

> ✨ `req.body` só funciona porque usamos `bodyParser.json()` lá no início do código.

## 🧠 O que é desestruturação?

**Desestruturação** (ou *destructuring*) é um recurso do JavaScript que permite **extrair valores diretamente de objetos** (ou arrays) e armazená-los em variáveis **com menos código**.

---

## 🧱 Situação sem desestruturação

Imagine que recebemos o seguinte JSON enviado por um formulário (por exemplo, usando Thunder Client):

```json
{
  "nome": "Lucas",
  "email": "lucas@email.com",
  "senha": "123456"
}
```

Esse conteúdo vai estar dentro de `req.body`, ou seja:

```js
req.body = {
  nome: "Lucas",
  email: "lucas@email.com",
  senha: "123456"
}
```

Se **não usássemos desestruturação**, teríamos que escrever:

```js
const nome = req.body.nome;
const email = req.body.email;
const senha = req.body.senha;
```

---

## ✅ Com desestruturação:

A mesma coisa pode ser feita assim:

```js
const { nome, email, senha } = req.body;
```

Isso significa:

> Pegue os campos `nome`, `email` e `senha` **do objeto `req.body`** e **crie variáveis com esses mesmos nomes**.

---

## 🧪 Exemplo didático

### Dado:

```js
const aluno = {
  nome: "Ana",
  idade: 17,
  curso: "Informática"
};
```

### Sem desestruturação:

```js
const nome = aluno.nome;
const idade = aluno.idade;
const curso = aluno.curso;
```

### Com desestruturação:

```js
const { nome, idade, curso } = aluno;
```

> Agora temos 3 variáveis disponíveis: `nome`, `idade` e `curso`.

---

## 🔍 Aplicando no código:

### Antes:

```js
app.post('/usuarios', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  ...
});
```

### Com desestruturação:

```js
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  ...
});
```

Mais limpo, mais organizado, **mais legível**.

---

## 🧠 Por que ensinar isso?

* Desestruturação é **muito comum em código moderno**
* Reduz repetição
* Torna o código mais limpo e fácil de entender
* Ajuda a **extrair apenas os campos que você precisa**

---

## ⚠️ Atenção

Para que funcione:

1. `req.body` **precisa ser um objeto**
2. Os nomes devem **coincidir exatamente** (`nome`, `email`, `senha`)

Se o campo não existir, o valor da variável será `undefined`.

---

## ✅ Conclusão

| Código                              | O que faz                                               |
| ----------------------------------- | ------------------------------------------------------- |
| `const { nome } = req.body`         | Cria uma variável `nome` com o valor de `req.body.nome` |
| `const { email, senha } = req.body` | Cria `email` e `senha` a partir de `req.body`           |
| `const nome = req.body.nome`        | Maneira tradicional (mais verbosa)                      |

---

### 🔸 `const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'`

* Essa é uma **instrução SQL** do tipo `INSERT`, que serve para **inserir dados em uma tabela**.
* `?` são **placeholders**, ou seja, lugares onde os valores reais vão ser colocados depois.

  * Isso protege contra **SQL Injection** e é mais seguro do que montar o SQL com texto direto.

---

### 🔸 `connection.query(sql, [nome, email, senha], (error) => { ... })`

Aqui executamos a instrução SQL no banco de dados.

#### 🔹 `connection.query(...)`

* Método usado para **executar comandos SQL** no banco de dados MySQL.

#### 🔹 Parâmetros:

| Parâmetro              | Função                                                                |
| ---------------------- | --------------------------------------------------------------------- |
| `sql`                  | O comando SQL a ser executado (`INSERT INTO ...`)                     |
| `[nome, email, senha]` | Array com os valores que vão substituir os `?` na query               |
| `(error) => { ... }`   | Callback que será executado depois que o banco responder (assíncrono) |

#### 🔹 O que acontece:

* O banco executa o `INSERT`.
* Se houver algum erro (ex: email já existe), o `error` estará preenchido.
* Se deu tudo certo, `error` será `null`.

---

### 🔸 Tratamento de erro

```js
if (error) return res.status(500).send('Erro ao adicionar usuário.');
```

* Verificamos se houve erro.
* Se sim, retornamos:

  * **status 500** → erro interno do servidor
  * **mensagem** → 'Erro ao adicionar usuário.'
* O `return` faz a função parar aqui, e **nada mais é executado**.

---

### 🔸 Resposta de sucesso

```js
res.status(201).send('Usuário adicionado com sucesso.');
```

* Enviamos uma resposta para o cliente com:

  * **status 201** → criado com sucesso
  * **mensagem** → 'Usuário adicionado com sucesso.'

---

## 🧪 Exemplo prático

Imagine que você manda uma requisição POST com Thunder Client ou Postman:

### 🔸 Rota

```
POST http://localhost:3000/usuarios
```

### 🔸 Corpo da requisição (JSON)

```json
{
  "nome": "Ana",
  "email": "ana@email.com",
  "senha": "senha123"
}
```

### 🔸 O que acontece:

1. O backend recebe `req.body`
2. Desestrutura os dados
3. Monta a query:

   ```sql
   INSERT INTO usuarios (nome, email, senha) VALUES ('Ana', 'ana@email.com', 'senha123');
   ```
4. Executa no banco
5. Retorna:

   ```txt
   Status: 201
   Body: Usuário adicionado com sucesso.
   ```

---

## 📌 Resumo visual

```txt
[Cliente (navegador ou app)]
     ↓ envia POST + JSON
[Express (servidor Node.js)]
     ↓ lê req.body
     ↓ monta e executa SQL
[MySQL (banco de dados)]
     ↓ responde OK
[Express] → envia status 201 ao cliente
```

---

## ✅ Conclusão

Esse trecho de código:

* Define uma rota POST em `/usuarios`
* Recebe dados do corpo da requisição
* Insere os dados na tabela `usuarios` do MySQL
* Retorna sucesso (201) ou erro (500)

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

