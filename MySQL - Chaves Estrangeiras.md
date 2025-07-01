# Chaves Estrangeiras (Foreign Keys) no SQL

## O que é uma Chave Estrangeira?

A **chave estrangeira** (foreign key) é um campo (ou conjunto de campos) em uma tabela que **referencia a chave primária** de outra tabela. Ela cria um vínculo entre os dados de duas tabelas, garantindo a integridade referencial.

---

## Para que servem as Chaves Estrangeiras?

- **Garantir a consistência dos dados:**  
  Não é possível inserir um valor na chave estrangeira que não exista na tabela referenciada.  

- **Relacionar tabelas:**  
  Permitem conectar dados de tabelas diferentes de forma organizada e lógica.

---

## Sintaxe básica para criar uma chave estrangeira

### 1. Durante a criação da tabela (com `CREATE TABLE`)

Você pode definir a chave estrangeira já na criação da tabela:

```sql
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data_pedido DATE,
    CONSTRAINT fk_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
````

* `CONSTRAINT fk_cliente`: Nome dado à restrição (opcional, mas recomendável).
* `FOREIGN KEY (cliente_id)`: Coluna da tabela atual que será chave estrangeira.
* `REFERENCES clientes(id)`: Indica que `cliente_id` referencia a coluna `id` da tabela `clientes`.
* `ON DELETE CASCADE`: Quando um cliente for deletado, todos os pedidos relacionados também serão deletados automaticamente.
* `ON UPDATE CASCADE`: Se o `id` do cliente mudar, a alteração é refletida na tabela `pedidos`.

---

### 2. Após criar a tabela (com `ALTER TABLE`)

Se a tabela já existir, você pode adicionar uma chave estrangeira usando `ALTER TABLE`:

```sql
ALTER TABLE pedidos
ADD CONSTRAINT fk_cliente
FOREIGN KEY (cliente_id)
REFERENCES clientes(id)
ON DELETE SET NULL
ON UPDATE CASCADE;
```

* `ON DELETE SET NULL`: Quando o cliente for deletado, a coluna `cliente_id` será definida como `NULL` nos pedidos relacionados.

---

### 3. Chave estrangeira com múltiplas colunas (chave composta)

É possível criar chaves estrangeiras que referenciam várias colunas juntas.

Exemplo:

```sql
CREATE TABLE matriculas (
    aluno_id INT,
    curso_id INT,
    ano INT,
    CONSTRAINT pk_matriculas PRIMARY KEY (aluno_id, curso_id, ano),
    CONSTRAINT fk_aluno FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
```

---

## Ações possíveis em `ON DELETE` e `ON UPDATE`

* `CASCADE`: Aplica a ação (delete ou update) também nas linhas relacionadas.
* `SET NULL`: Define a coluna como `NULL` na tabela filha.
* `RESTRICT`: Impede a ação se houver dependência (padrão).
* `NO ACTION`: Igual a `RESTRICT` em muitos bancos.
* `SET DEFAULT`: Define o valor padrão da coluna (nem todos suportam).

---

## Resumo dos comandos para criar chaves estrangeiras

| Método                         | Exemplo sintético                                                                        | Quando usar             |
| ------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------- |
| **CREATE TABLE**               | `FOREIGN KEY (coluna) REFERENCES outra_tabela(id)`                                       | Ao criar a tabela       |
| **ALTER TABLE ADD CONSTRAINT** | `ALTER TABLE tabela ADD CONSTRAINT fk FOREIGN KEY (coluna) REFERENCES outra_tabela(id);` | Depois da tabela criada |

---

## Exemplo completo

```sql
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data_pedido DATE,
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
```

---

## Observações

* A coluna usada como chave estrangeira deve ter o **mesmo tipo e tamanho** da coluna referenciada (geralmente a chave primária).
* O banco pode exigir que ambas as tabelas estejam usando o mesmo mecanismo de armazenamento (ex: InnoDB no MySQL) para suportar chaves estrangeiras.
* Chaves estrangeiras ajudam muito na integridade e organização do banco, evite não usá-las se seu banco precisar relacionar dados.

