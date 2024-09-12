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

# Métodos nas Classes ORM

Métodos são funções que pertencem a uma classe e servem para realizar operações sobre os dados armazenados nas propriedades da classe. Eles podem ser usados para manipular dados, fazer cálculos ou obter informações específicas de cada instância da classe.

Neste momento, nosso objetivo é **apenas criar e nomear métodos** nas classes baseadas nas tabelas do banco de dados. Não vamos implementar a lógica completa dos métodos ainda. Em vez disso, vamos entender quais tipos de métodos seriam úteis e como nomeá-los adequadamente.

## Estrutura Básica de um Método

Um método em uma classe segue a seguinte estrutura básica:

```typescript
class ClasseExemplo {
  propriedade: string;

  constructor(propriedade: string) {
    this.propriedade = propriedade;
  }

  // Nome do método
  nomeDoMetodo(): void {
    // Aqui vai a lógica que o método deve executar
    // Neste caso, vamos apenas comentar o que o método deve fazer
  }
}
```

### Regras para Nomear Métodos

- O nome de um método deve **descrever claramente** o que ele faz.
- Use verbos de ação, como `adicionar`, `remover`, `buscar`, `atualizar`.
- Mantenha o nome dos métodos **simples e direto**.

### Criando Métodos para Operações Comuns

Agora vamos criar métodos comuns que seriam úteis em uma aplicação baseada em tabelas de banco de dados. Vamos usar dois exemplos de classes:

- **`Usuario`**: Representa a tabela de usuários.
- **`Pedido`**: Representa a tabela de pedidos.

### Exemplo: Classe `Usuario`

Abaixo está um exemplo da classe `Usuario` com alguns métodos. Note que não estamos implementando a lógica dentro dos métodos, apenas comentando o que cada método faria.

```typescript
class Usuario {
  id: number;
  nome: string;
  email: string;

  constructor(id: number, nome: string, email: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
  }

  // Método para retornar uma saudação ao usuário
  saudarUsuario(): void {
    // Aqui retornaríamos uma saudação personalizada para o usuário
    // Exemplo: "Olá, Maria!"
  }

  // Método para verificar se o email do usuário é válido
  validarEmail(): boolean {
    // Aqui verificaríamos se o email do usuário segue um padrão correto
    // Exemplo de padrão: "usuario@dominio.com"
    return true; // Placeholder
  }

  // Método para atualizar o nome do usuário
  atualizarNome(novoNome: string): void {
    // Aqui iríamos atualizar o nome do usuário com o novoNome fornecido
    this.nome = novoNome;
  }
}
```

### Exemplo: Classe `Pedido`

Agora, veja um exemplo de como criar métodos na classe `Pedido`. Mais uma vez, não estamos implementando a lógica dos métodos, apenas comentando o que cada um deveria fazer.

```typescript
class Pedido {
  id: number;
  descricao: string;
  valor: number;
  usuario: Usuario; // Referência à classe Usuario

  constructor(id: number, descricao: string, valor: number, usuario: Usuario) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.usuario = usuario;
  }

  // Método para calcular o valor total do pedido com base em possíveis descontos
  calcularValorTotal(): number {
    // Aqui calcularíamos o valor total do pedido, talvez aplicando um desconto
    // Retornaria o valor atualizado
    return this.valor; // Placeholder
  }

  // Método para adicionar um produto ao pedido
  adicionarProduto(descricaoProduto: string, valorProduto: number): void {
    // Aqui adicionaríamos um novo produto ao pedido
    // Talvez aumentando o valor total do pedido
  }

  // Método para associar um usuário ao pedido
  associarUsuario(usuario: Usuario): void {
    // Aqui associaríamos o usuário (quem fez o pedido) ao pedido
    this.usuario = usuario;
  }
}
```

## O Que Pensar ao Criar Métodos

Aqui estão algumas perguntas que você pode se fazer ao criar os métodos:

1. **O que a classe faz?**  
   Exemplo: Se a classe `Usuario` representa um usuário, quais ações um usuário pode realizar ou sofrer? Como por exemplo: validar o email, atualizar informações, etc.

2. **Quais ações são comuns para os dados que a classe representa?**  
   Exemplo: Na classe `Pedido`, podemos imaginar ações como "adicionar produto", "calcular total", "associar usuário", pois são operações comuns de um pedido.

3. **Existe alguma lógica de negócio que precisa ser encapsulada na classe?**  
   Exemplo: Métodos para cálculos de preço ou aplicação de descontos são exemplos de lógica de negócio.

4. **Como posso nomear os métodos de forma clara?**  
   Sempre tente descrever o que o método faz no nome, usando verbos como `calcular`, `adicionar`, `atualizar`, etc.

```



### Conclusão

Neste exemplo, vimos como transformar tabelas de um banco de dados em classes de TypeScript. Ao criar as classes, você pode modelar seus dados diretamente no código. Essa prática de mapeamento de tabelas para classes é a base do ORM, mas você pode aplicá-la de forma manual sem usar ferramentas específicas de ORM como o TypeORM.

Com isso, voc|ê pode entender como a lógica do banco de dados pode ser refletida no código, usando conceitos básicos de orientação a objetos.
