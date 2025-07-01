# Atributos de Colunas em MySQL

Ao criar uma tabela no MySQL, além de definir o **tipo de dado** da coluna (ex: `INT`, `VARCHAR`, etc), você pode especificar várias outras propriedades para controlar o comportamento dos dados nessa coluna.

Este documento explica os principais atributos que podem ser usados na definição de colunas, com exemplos e explicações claras.

---

## 1. PRIMARY KEY (Chave Primária)

A **chave primária** é um conceito fundamental em bancos de dados relacionais.

- **O que é?**  
  Uma chave primária é uma coluna (ou conjunto de colunas) que identifica unicamente cada linha da tabela.  
- **Características:**  
  - Cada valor deve ser único.  
  - Não pode aceitar valores nulos (`NULL`).  
  - Garante que não haverá duas linhas com o mesmo valor nessa coluna.  
- **Por que usar?**  
  Serve para identificar cada registro de forma exclusiva. É muito usada para relacionar tabelas e garantir integridade dos dados.

### Exemplo:

```sql
CREATE TABLE clientes (
    id INT PRIMARY KEY,
    nome VARCHAR(100)
);
````

Nesse exemplo, a coluna `id` é a chave primária, e não pode ter valores repetidos ou nulos.

---

## 2. NOT NULL

* Define que a coluna **não pode conter valores nulos**. Ou seja, um valor sempre deve ser informado.

### Exemplo:

```sql
nome VARCHAR(100) NOT NULL
```

Aqui, a coluna `nome` precisa ter um valor sempre que uma linha for inserida.

---

## 3. DEFAULT

* Especifica um valor padrão para a coluna, que será usado caso não seja informado outro valor no momento da inserção.

### Exemplo:

```sql
status VARCHAR(20) DEFAULT 'ativo'
```

Se você inserir um registro sem informar `status`, ele automaticamente será `'ativo'`.

---

## 4. AUTO_INCREMENT

* Usado em colunas numéricas para que o banco incremente automaticamente o valor a cada nova linha.
* Muito comum em colunas que são chave primária para gerar IDs sequenciais.

### Exemplo:

```sql
id INT AUTO_INCREMENT PRIMARY KEY
```

Cada novo registro receberá um `id` automaticamente, começando do 1 e aumentando em 1.

---

## 5. UNIQUE

* Garante que os valores inseridos na coluna sejam **únicos**, ou seja, não se repitam.

### Exemplo:

```sql
email VARCHAR(100) UNIQUE
```

Evita que duas pessoas tenham o mesmo email cadastrado.

---

## 6. COMMENT

* Permite adicionar um comentário explicativo para a coluna, que pode ajudar na documentação do banco.

### Exemplo:

```sql
idade INT COMMENT 'Idade do cliente em anos'
```

Esse comentário aparece na descrição da tabela no Workbench ou em consultas de metadados.

---

## 7. ZEROFILL

* Para colunas numéricas, preenche o valor com zeros à esquerda até atingir o tamanho definido.

### Exemplo:

```sql
codigo INT(6) ZEROFILL
```

Se o valor for `123`, será exibido como `000123`.

---


---

# Exemplo completo de criação de tabela

```sql
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Chave primária auto-incrementada
    nome VARCHAR(100) NOT NULL,                  -- Nome obrigatório
    email VARCHAR(100) UNIQUE NOT NULL,          -- Email único e obrigatório
    status VARCHAR(10) DEFAULT 'ativo' COMMENT 'Status do cliente',  -- Valor padrão e comentário
   
);
```

---

# Resumo

| Atributo        | Função                                        |
| --------------- | --------------------------------------------- |
| PRIMARY KEY     | Identifica unicamente cada registro da tabela |
| NOT NULL        | Garante que a coluna sempre tenha um valor    |
| DEFAULT         | Define valor padrão quando não informado      |
| AUTO_INCREMENT | Incrementa automaticamente números (IDs)      |
| UNIQUE          | Garante que valores não se repitam            |
| COMMENT         | Comentário explicativo para documentação      |
| ZEROFILL        | Preenche com zeros à esquerda em números      |


---

