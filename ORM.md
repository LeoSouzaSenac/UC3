# O que é ORM (Object-Relational Mapping)?

**ORM** significa **Mapeamento Objeto-Relacional**. Ele é uma técnica utilizada em programação para transformar dados de um banco de dados relacional (tabelas) em objetos que podem ser manipulados no código.

- **Tabelas no banco de dados** são transformadas em **classes**.
- **Linhas na tabela** são transformadas em **instâncias (objetos)** dessas classes.
- **Colunas da tabela** são transformadas em **propriedades** das classes.

Isso permite que programadores possam manipular dados do banco como se estivessem manipulando objetos no código, tornando o processo mais natural para quem já conhece programação orientada a objetos.

## Para que serve o ORM?

O **ORM** ajuda a simplificar o trabalho com banco de dados em projetos de software. Ele tem os seguintes benefícios:

1. **Facilidade de uso**: Em vez de escrever comandos SQL para interagir com o banco de dados, você utiliza objetos e classes do código.
2. **Organização**: O código fica mais organizado e modular, pois o banco de dados é representado como objetos.
3. **Produtividade**: Você pode se concentrar na lógica do código, sem ter que se preocupar com SQL repetitivo.
4. **Portabilidade**: Em alguns casos, mudar o banco de dados por outro requer apenas ajustes no ORM, sem alterar toda a lógica do código.

## Criando Classes a partir de Tabelas do Banco de Dados

Agora que sabemos o que é ORM e para que serve, vamos ver como podemos **criar classes** que representam tabelas de um banco de dados.

### Exemplo de Tabela no Banco de Dados

Vamos imaginar que temos uma tabela no banco de dados chamada `Usuarios` com as seguintes colunas:

| id  | nome     | email            | idade |
| --- | -------- | ---------------- | ----- |
| 1   | Maria    | maria@email.com   | 25    |
| 2   | João     | joao@email.com    | 30    |

Essa tabela contém informações sobre usuários, como nome, e-mail e idade. Queremos agora representar essa tabela como uma classe em TypeScript.

### Criando a Classe Correspondente

Para representar essa tabela no código, podemos criar uma **classe** chamada `Usuario` com as propriedades que correspondem às colunas da tabela.

Aqui está um exemplo de como ficaria a classe:

```typescript
class Usuario {
  id: number;
  nome: string;
  email: string;
  idade: number;

  constructor(id: number, nome: string, email: string, idade: number) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.idade = idade;
  }
}
```

### Explicação da Classe

1. **Propriedades**: Cada coluna da tabela `Usuarios` foi transformada em uma propriedade da classe `Usuario` (`id`, `nome`, `email`, `idade`).
2. **Construtor**: O construtor é utilizado para criar um objeto dessa classe e definir os valores dessas propriedades. Quando criamos um novo usuário no código, passamos os valores como parâmetros.

### Criando um Objeto a Partir da Classe

Uma vez que temos a classe `Usuario`, podemos criar objetos no nosso código que representam os dados da tabela.

Exemplo de como criar um usuário no código:

```typescript
const usuario1 = new Usuario(1, 'Maria', 'maria@email.com', 25);
console.log(usuario1.nome); // Saída: Maria
```

Sim, você está absolutamente correto! Usar a **classe** correspondente à tabela referenciada como o tipo da propriedade que representa a **foreign key** torna o código mais intuitivo e estruturado. Em vez de apenas armazenar o ID da outra tabela como um número, você pode associar a classe inteira. Isso melhora a organização e permite acessar facilmente os dados relacionados.

Vou explicar essa abordagem com um exemplo prático.

### Relacionamento de Tabelas Usando Classes

#### 1. Exemplo de Tabelas no Banco de Dados

Imagine que temos duas tabelas no banco de dados:

- **Tabela `Usuarios`**:
  | id  | nome     | email            |
  | --- | -------- | ---------------- |
  | 1   | Maria    | maria@email.com   |
  | 2   | João     | joao@email.com    |

- **Tabela `Pedidos`**:
  | id  | descricao   | valor | usuarioId |
  | --- | ----------- | ----- | --------- |
  | 1   | Produto A   | 100   | 1         |
  | 2   | Produto B   | 200   | 1         |

Aqui, a coluna `usuarioId` na tabela `Pedidos` é uma **foreign key** que referencia a tabela `Usuarios`.

#### 2. Criando as Classes

Agora, vamos criar as classes `Usuario` e `Pedido` em TypeScript. A diferença aqui será que, em vez de armazenar apenas o `usuarioId` como um número na classe `Pedido`, usaremos a classe `Usuario` como tipo para representar o relacionamento.

```typescript
// Classe Usuario
class Usuario {
  id: number;
  nome: string;
  email: string;

  constructor(id: number, nome: string, email: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
  }
}

// Classe Pedido
class Pedido {
  id: number;
  descricao: string;
  valor: number;
  usuario: Usuario; // Aqui usamos a classe Usuario, ao invés de um simples numero (usuarioId)

  constructor(id: number, descricao: string, valor: number, usuario: Usuario) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.usuario = usuario; // Passamos o objeto Usuario como parâmetro
  }
}
```

### 3. Usando as Classes Relacionadas

Agora podemos criar objetos dessas classes e ver como o relacionamento funciona na prática.

```typescript
// Criando um objeto Usuario
const usuario1 = new Usuario(1, 'Maria', 'maria@email.com');

// Criando um objeto Pedido, passando o usuario1 como referência
const pedido1 = new Pedido(1, 'Produto A', 100, usuario1);

console.log(pedido1.descricao); // Saída: Produto A
console.log(pedido1.usuario.nome); // Saída: Maria (acessando o nome do usuario relacionado)
```

### Conclusão

Neste exemplo, vimos como transformar tabelas de um banco de dados em classes de TypeScript. Ao criar as classes, você pode modelar seus dados diretamente no código. Essa prática de mapeamento de tabelas para classes é a base do ORM, mas você pode aplicá-la de forma manual sem usar ferramentas específicas de ORM como o TypeORM.

Com isso, voc|ê pode entender como a lógica do banco de dados pode ser refletida no código, usando conceitos básicos de orientação a objetos.
