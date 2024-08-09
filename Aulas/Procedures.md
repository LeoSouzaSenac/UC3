# Procedimentos Armazenados no MySQL

**Procedimentos Armazenados** são conjuntos de comandos SQL que podem ser executados como uma única unidade. Eles permitem encapsular a lógica de negócios diretamente no banco de dados, sendo úteis para automação de tarefas repetitivas e para garantir a consistência nas operações.

## 📚 O que são Procedimentos Armazenados?

Um procedimento armazenado é uma coleção de instruções SQL, armazenadas no banco de dados, que podem ser chamadas e executadas conforme necessário. Isso é especialmente útil para:

- **Automatizar tarefas**: Como cálculos regulares ou atualizações.
- **Reutilizar código**: Reduz a redundância no código SQL.
- **Melhorar a performance**: Executa operações diretamente no servidor de banco de dados, minimizando a transferência de dados.

## 🛠 Sintaxe Básica

```sql
DELIMITER //

CREATE PROCEDURE nome_do_procedimento (parâmetros)
BEGIN
    -- Comandos SQL
END //

DELIMITER ;
```

### Componentes:

- **DELIMITER**: Define um delimitador alternativo para que o MySQL reconheça o fim do procedimento.
- **CREATE PROCEDURE**: Inicia a criação do procedimento.
- **nome_do_procedimento**: Nome que você dará ao procedimento.
- **parâmetros**: Parâmetros de entrada (IN), saída (OUT) ou ambos (INOUT).
- **BEGIN ... END**: Delimita o bloco de comandos SQL que compõem o procedimento.

## 🎓 Exemplo Prático: Aumentar Salário dos Empregados

Vamos criar um procedimento que aumenta o salário dos empregados de um determinado departamento em uma porcentagem especificada.

```sql
DELIMITER //

CREATE PROCEDURE AumentarSalario(
    IN dep_id INT,
    IN percentual DECIMAL(5,2)
)
BEGIN
    UPDATE cargos 
    SET salario = salario + (salario * (percentual / 100))
    WHERE departamento_id = dep_id;
END //

DELIMITER ;
```

### 📊 Explicação:

1. **Parâmetros de Entrada**:
   - `dep_id`: ID do departamento onde os salários serão ajustados.
   - `percentual`: Percentual de aumento aplicado aos salários.

2. **Lógica do Procedimento**:
   - O comando `UPDATE` ajusta o salário de todos os cargos no departamento especificado, aumentando-o pelo percentual indicado.

### 🖱 Como Usar o Procedimento:

```sql
CALL AumentarSalario(1, 10);
```

Esse comando chamará o procedimento `AumentarSalario`, aumentando os salários em 10% para todos os empregados no departamento com `departamento_id = 1`.

### 🗑 Deletar o Procedimento:

```sql
DROP PROCEDURE IF EXISTS AumentarSalario;
```

## 📂 Recursos Adicionais

- [Documentação Oficial do MySQL sobre Procedimentos Armazenados](https://dev.mysql.com/doc/refman/8.0/en/create-procedure.html)
- [Tutoriais e Exemplos de Procedimentos Armazenados](https://www.w3schools.com/sql/sql_stored_procedures.asp)

---

## 📝 Exercícios Práticos

Agora que você já conhece os conceitos básicos e viu um exemplo de procedimento armazenado, vamos colocar em prática com alguns exercícios. Esses exercícios ajudarão a reforçar o que foi aprendido, aplicando procedimentos armazenados em diferentes cenários.

### 1. **🆕 Procedimento para Inserir Novo Empregado**

Crie um procedimento armazenado para inserir um novo empregado na tabela `empregados`. 


### 2. **❌ Procedimento para Excluir Empregado**

Crie um procedimento que permita a exclusão de um empregado com base no `empregados_id`. 


### 3. **🔄 Procedimento para Atualizar Título de Empregado**

Crie um procedimento que permita atualizar o título de um empregado na tabela `empregados` com base no `empregados_id`.
