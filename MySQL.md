# 🐬 MySQL — Guia Introdutório

## 📌 O que é o MySQL?

O **MySQL** é um **Sistema de Gerenciamento de Banco de Dados Relacional (SGBD)**.
Ele permite criar, armazenar e gerenciar grandes volumes de dados organizados em **tabelas**.

É um dos bancos de dados mais populares do mundo, usado por sites, sistemas e aplicativos de todos os tipos.

---

## 📖 História Resumida

* 🗓️ Criado em **1995** por uma empresa chamada **MySQL AB**.
* 🔄 Em **2008**, foi comprado pela **Sun Microsystems**.
* ☀️ Depois, a Sun foi adquirida pela **Oracle Corporation** em **2010**.
* 💡 Hoje, o MySQL continua sendo **gratuito (open source)** e é mantido pela Oracle, com versões comerciais e gratuitas.

---

## 💻 Onde o MySQL é usado?

* Sites com muitos usuários (ex: WordPress, Joomla).
* Aplicações web (em PHP, Java, Python, etc).
* Softwares empresariais.
* Sistemas escolares, bancários, lojas virtuais, etc.

---

## 🧰 Ferramentas que usaremos

### 1. **MySQL Server**

O “coração” do banco de dados. Ele executa os comandos e gerencia os dados.

### 2. **MySQL Workbench**

É um programa com **interface gráfica** (com botões e janelas) que facilita a criação, visualização e gerenciamento de bancos de dados.

> 💡 Ao invés de digitar comandos em um terminal, usamos o **Workbench** para facilitar a vida.

---

## 🛠️ Instalação

Instalamos o MySQL usando o **MySQL Installer**, que vem com tudo:

* MySQL Server
* MySQL Workbench
* MySQL Shell (linha de comando)
* Documentação e exemplos

---

## 🧠 Conceitos Básicos

| Conceito                | O que é?                                                                         |
| ----------------------- | -------------------------------------------------------------------------------- |
| **Banco de Dados**      | Um "armário" que armazena dados. Ex: banco\_escola.                              |
| **Tabela**              | Um "arquivo" dentro do armário. Ex: alunos, professores.                         |
| **Coluna**              | Uma **categoria** da tabela. Ex: nome, idade.                                    |
| **Linha (Registro)**    | Uma **entrada** na tabela. Ex: Maria, 17 anos.                                   |
| **Chave Primária (PK)** | Um campo que **identifica unicamente** cada registro (ex: ID).                   |
| **SQL**                 | Linguagem usada para conversar com o banco de dados (Structured Query Language). |

---

## 🧾 Exemplos de Comandos SQL

### Criar uma tabela:

```sql
CREATE TABLE alunos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  idade INT
);
```

### Inserir dados:

```sql
INSERT INTO alunos (nome, idade)
VALUES ('João', 18);
```

### Listar dados:

```sql
SELECT * FROM alunos;
```

### Atualizar dados:

```sql
UPDATE alunos
SET idade = 19
WHERE id = 1;
```

### Deletar dados:

```sql
DELETE FROM alunos
WHERE id = 1;
```

---

## 🔒 Segurança e Acesso

* MySQL exige **usuário e senha** para se conectar ao banco.
* No Workbench, você cria **conexões** seguras com o servidor.

---

## 🌐 Compatibilidade

O MySQL funciona com várias linguagens e ferramentas:

✅ PHP
✅ Java
✅ Python
✅ C#
✅ Node.js
✅ Excel, Power BI, etc.

---

## ✅ Vantagens do MySQL

* Gratuito e fácil de usar.
* Muito usado no mercado.
* Compatível com várias linguagens.
* Comunidade grande e muito material online.
* Rápido, leve e confiável.

---

## 📚 Conclusão

O **MySQL** é uma excelente escolha para aprender banco de dados.
Com ele, podemos criar sistemas completos e seguros para armazenar e manipular dados.

Com o **MySQL Workbench**, você vai visualizar e interagir com esses dados de forma simples e profissional!
