# Triggers em Banco de Dados

## O que é uma Trigger?

Uma **trigger** é uma ação automática que é executada em resposta a determinados eventos em uma tabela ou visão em um banco de dados. As triggers são comumente usadas para manter a integridade dos dados, realizar cálculos automáticos, ou mesmo para auditar e registrar mudanças em uma tabela.

### Eventos que Disparam Triggers

As triggers podem ser configuradas para serem acionadas por diferentes tipos de eventos, como:

- **INSERT**: Acionada quando uma nova linha é inserida na tabela.
- **UPDATE**: Acionada quando uma linha existente é modificada.
- **DELETE**: Acionada quando uma linha é excluída da tabela.

Além disso, triggers podem ser definidas para serem executadas **antes** (`BEFORE`) ou **depois** (`AFTER`) do evento que as aciona.

### Exemplos Práticos com Tabelas

Vamos usar as seguintes tabelas como exemplo: `empregados`, `departamentos`, e `cargos`.

#### 1. Trigger para Atualizar o Salário de Empregados

Vamos criar uma trigger que atualiza automaticamente o salário de um empregado na tabela `empregados` quando o título do cargo for alterado.

```sql
CREATE TRIGGER AtualizarSalarioEmpregado
AFTER UPDATE ON empregados
FOR EACH ROW
BEGIN
    DECLARE novo_salario DECIMAL(10,2);
    
    SELECT salario INTO novo_salario
    FROM cargos
    WHERE titulo = NEW.titulo;
    
    UPDATE empregados
    SET salario = novo_salario
    WHERE empregados_id = NEW.empregados_id;
END;
```

**Explicação:**

- **`AFTER UPDATE`**: A trigger será acionada após a atualização de uma linha na tabela `empregados`.
- **`FOR EACH ROW`**: A trigger será aplicada a cada linha que for atualizada.
- **`DECLARE novo_salario`**: Uma variável é declarada para armazenar o novo salário.
- **`SELECT salario INTO novo_salario`**: O salário correspondente ao novo título do cargo é selecionado da tabela `cargos`.
- **`UPDATE empregados SET salario`**: O salário do empregado é atualizado na tabela `empregados`.

#### 2. Trigger para Registrar Mudanças de Departamento

Vamos criar uma trigger para registrar em uma tabela de auditoria (`auditoria_departamento`) toda vez que um empregado mudar de departamento.

```sql
CREATE TRIGGER RegistrarMudancaDepartamento
AFTER UPDATE ON empregados
FOR EACH ROW
BEGIN
    IF OLD.departamento_id != NEW.departamento_id THEN
        INSERT INTO auditoria_departamento (empregados_id, antigo_departamento, novo_departamento, data_mudanca)
        VALUES (NEW.empregados_id, OLD.departamento_id, NEW.departamento_id, NOW());
    END IF;
END;
```

**Explicação:**

- **`AFTER UPDATE`**: A trigger será acionada após a atualização de uma linha na tabela `empregados`.
- **`IF OLD.departamento_id != NEW.departamento_id`**: Verifica se o departamento foi alterado.
- **`INSERT INTO auditoria_departamento`**: Insere os detalhes da mudança na tabela de auditoria `auditoria_departamento`.

### Exercícios Práticos

1. **Criar uma Trigger para Calcular o Salário Anual**:
   Crie uma trigger que, ao inserir ou atualizar o salário de um empregado, calcule automaticamente o salário anual e o armazene em uma nova coluna `salario_anual` na tabela `empregados`.

2. **Auditoria de Exclusões de Empregados**:
   Crie uma trigger que registre todas as exclusões de empregados na tabela `auditoria_exclusao_empregados`, armazenando o `empregados_id`, `nome`, `departamento_id`, `titulo`, e a `data_exclusao`.

3. **Trigger para Prevenir Exclusão de Gerentes**:
   Crie uma trigger que impeça a exclusão de empregados cujo título seja 'Gerente', exibindo uma mensagem de erro.

4. **Atualizar Nome do Departamento**:
   Crie uma trigger que, ao alterar o nome de um departamento na tabela `departamentos`, atualize o nome correspondente na tabela `empregados`.

5. **Registro de Aumentos Salariais**:
   Crie uma trigger que registre todos os aumentos salariais em uma tabela `historico_aumentos`, incluindo os campos `empregados_id`, `salario_antigo`, `salario_novo`, e `data_aumento`.

### Considerações Importantes

- **Performance**: Triggers podem impactar o desempenho do banco de dados, especialmente se forem complexas ou se afetarem um grande número de linhas.
- **Debugging**: Como as triggers são executadas automaticamente, pode ser difícil rastrear erros ou comportamentos inesperados.
- **Complexidade**: É importante evitar a criação de triggers muito complexas ou com lógica de negócios pesada, pois isso pode dificultar a manutenção e o entendimento do banco de dados.

### Conclusão

Triggers são ferramentas poderosas que permitem automatizar tarefas e garantir a integridade dos dados no banco de dados. No entanto, devem ser usadas com cuidado para evitar problemas de desempenho e complexidade excessiva.

---

**Referências:**
- [Documentação Oficial do MySQL](https://dev.mysql.com/doc/refman/8.0/en/triggers.html)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/triggers.html)
- [SQL Server Triggers](https://docs.microsoft.com/en-us/sql/relational-databases/triggers/triggers-database-engine)
