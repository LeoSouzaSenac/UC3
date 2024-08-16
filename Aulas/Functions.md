# Procedimentos e Funções no Banco de Dados 🚀

## 🎯 Procedimentos

**Procedimentos** são usados para realizar ações que alteram o banco de dados, como inserções, atualizações e exclusões.

- **Uso:** Para modificar dados (como `UPDATE`), executar operações complexas, ou realizar tarefas administrativas.

## 🧮 Funções

**Funções** retornam um único valor e são usadas dentro de consultas. Elas **não modificam** diretamente o estado do banco de dados.

- **Uso:** Em consultas `SELECT`, `WHERE`, `HAVING`, etc.

## 💻 Exemplo Prático: função que retorna o salário de um empregado

```sql
USE empresa;

DELIMITER //

CREATE FUNCTION CalcularSalarioBruto(
    emp_id INT
)
RETURNS DECIMAL(10,2)
BEGIN
    DECLARE salario1 DECIMAL(10,2);

    -- Obtém o salário do cargo do empregado com o ID fornecido
    SELECT cargos.salario 
    INTO salario1
    FROM empregados
    JOIN cargos ON empregados.titulo = cargos.titulo AND empregados.departamento_id = cargos.departamento_id
    WHERE empregados.empregados_id = emp_id;
    LIMIT 1; -- Garante que apenas um salário seja retornado
    
    -- Retorna o salário
    RETURN salario1;
END //

DELIMITER ;
```

## 🎯 Consultando o Salário Bruto de um Empregado

```sql
SELECT nome, CalcularSalarioBruto(empregados_id) AS salario_bruto
FROM empregados
WHERE empregados_id = 1;
```

## 📝 Exercícios Práticos

### 1️⃣ Função para Calcular Salário Anual

**Desafio:** Crie uma função que, dado o ID de um cargo, retorne o salário anual correspondente ao cargo.

```sql
DELIMITER //

CREATE FUNCTION CalcularSalarioAnual(
    cargo_id INT
)
RETURNS DECIMAL(10,2)
BEGIN
    DECLARE salario_anual DECIMAL(10,2);

    -- Calcula o salário anual do cargo
    SELECT salario * 12
    INTO salario_anual
    FROM cargos
    WHERE cargos_id = cargo_id
    -- LIMIT 1;

    -- Retorna o salário anual
    RETURN salario_anual;
END //

DELIMITER ;

```

### 2️⃣ Função para Contar Empregados por Departamento

**Desafio:** Crie uma função que, dado o ID de um departamento, retorne o número de empregados que trabalham nesse departamento.

```sql
DELIMITER //

CREATE FUNCTION ContarEmpregadosPorDepartamento(
    dept_id INT
)
RETURNS INT
BEGIN
    DECLARE total_empregados INT;

    -- Conta o número de empregados no departamento
    SELECT COUNT(*)
    INTO total_empregados
    FROM empregados
    WHERE departamento_id = dept_id;

    -- Retorna o total de empregados
    RETURN total_empregados;
END //

DELIMITER ;
```

### 3️⃣ Função para Obter Nome do Departamento

**Desafio:** Crie uma função que, dado o ID de um departamento, retorne o nome do departamento.

```sql
DELIMITER //

CREATE FUNCTION ObterNomeDepartamento(
    dept_id INT
)
RETURNS VARCHAR(255)
BEGIN
    DECLARE nome_dept VARCHAR(255);

    -- Seleciona o nome do departamento
    SELECT nome
    INTO nome_dept
    FROM departamentos
    WHERE departamento_id = dept_id
   -- LIMIT 1;

    -- Retorna o nome do departamento
    RETURN nome_dept;
END //

DELIMITER ;
```

### 4️⃣ Função para Obter Título do Empregado

**Desafio:** Crie uma função que, dado o ID de um empregado, retorne o título do cargo desse empregado.

```sql
DELIMITER //

CREATE FUNCTION ObterTituloEmpregado(
    emp_id INT
)
RETURNS VARCHAR(255)
BEGIN
    DECLARE titulo_emp VARCHAR(255);

    -- Seleciona o título do empregado
    SELECT titulo
    INTO titulo_emp
    FROM empregados
    WHERE empregados_id = emp_id
    --LIMIT 1;

    -- Retorna o título do empregado
    RETURN titulo_emp;
END //

DELIMITER ;

```

### 5️⃣ Função para Calcular Salário Total de um Departamento

**Desafio:** Crie uma função que, dado o ID de um departamento, retorne o salário total de todos os empregados desse departamento.

