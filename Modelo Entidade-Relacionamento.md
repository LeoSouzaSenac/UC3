# Modelagem de Dados

## Diagrama de Entidade-Relacionamento (ER)

### O que é um Diagrama ER?

Um Diagrama de Entidade-Relacionamento (ER) é uma representação visual de como os dados em um sistema estão organizados e como se relacionam entre si. Ele funciona como um mapa, permitindo que você entenda a estrutura e as conexões dos dados.

### Componentes de um Diagrama ER:

- **Entidades**: São as "coisas" ou "objetos" principais sobre os quais queremos armazenar informações. Exemplo: Livros, Clientes, Vendas. Elas são representadas por retângulos.
- **Atributos**: São as informações que descrevem as entidades. Exemplo: Para a entidade Livros, os atributos podem ser Título, Autor, Preço, Quantidade em Estoque. Os atributos são representados por círculos com seu nome e são conectados à entidade com uma linha.
- **Relacionamentos**: Mostram como as entidades estão conectadas. Exemplo: Um relacionamento pode mostrar que "um cliente pode comprar livros" e "um livro pode ser comprado pelos clientes". Relacionamentos são representados por losangos e são conectados às entidades envolvidas com linhas.

### Por que usar um Diagrama ER?

- **Clareza**: Ajuda a visualizar e entender a organização dos dados.
- **Planejamento**: Facilita o planejamento de como os dados serão armazenados em um banco de dados.
- **Comunicação**: Serve como uma ferramenta para comunicar a estrutura dos dados com outras pessoas envolvidas no projeto, como desenvolvedores e clientes.

## Exemplo Prático:

### Entidades:

- **Farmácia**
  - **Atributos**:
    - Telefone
    - Nome
    - Endereço
    - CNPJ

- **Produto**
  - **Atributos**:
    - Código
    - Quantidade
    - Valor

- **Farmacêutico**
  - **Atributos**:
    - RG
    - Nome

### Relacionamentos:

- **Vende**
  - **Descrição**: O relacionamento "Vende" conecta a entidade **Farmácia** com a entidade **Produto**.
  - Ele indica que uma farmácia pode vender vários produtos e um produto pode ser vendido por várias farmácias.
  

- **Atendimento**
  - **Descrição**: O relacionamento "Atendimento" conecta a entidade **Farmacêutico** com a entidade **Farmácia**.
  - Ele indica que um farmacêutico pode trabalhar em uma farmácia e uma farmácia pode ter vários farmacêuticos.
  

## Cardinalidade:

Imagine que você está criando um banco de dados para uma biblioteca. Você tem duas entidades principais: Livro e Autor.

1:1 (Um para Um):
Um livro pode ter apenas um autor, e um autor pode escrever apenas um livro.
Exemplo: Um livro único sobre um autor específico, e esse autor não escreve outro livro.

1:N
(Um para Muitos):
Um autor pode escrever vários livros, mas cada livro tem apenas um autor.
Exemplo: Um autor pode ter vários livros publicados, mas cada livro tem apenas um autor principal.

M:N
(Muitos para Muitos):
Um livro pode ter vários autores, e um autor pode escrever vários livros.
Exemplo: Um livro pode ser coautorado por vários autores, e cada autor pode colaborar em vários livros.

Resumindo
1:1: Cada instância de uma entidade se relaciona com uma única instância de outra entidade.
1:N: Cada instância de uma entidade se relaciona com várias instâncias de outra entidade.
M:N: Várias instâncias de uma entidade se relacionam com várias instâncias de outra entidade.

É uma maneira de descrever quantas vezes uma entidade pode se relacionar com outra em um banco de dados. Ela nos ajuda a entender e definir as regras sobre as conexões entre diferentes tipos de informações.

## Relacionamento "Vende"
- Farmácia: Cada farmácia pode vender vários produtos.

- Produto: Cada produto pode ser vendido por várias farmácias.

### A cardinalidade para o relacionamento "Vende" seria:

Farmácia: 1
(Uma farmácia pode vender muitos produtos)
Produto: N:1 (Um produto pode ser vendido por várias farmácias)

Em um diagrama ER, você representaria isso com um losango "Vende" ligado às entidades Farmácia e Produto, com cardinalidade 1
na conexão com Farmácia e N:1 na conexão com Produto.

## Relacionamento "Atendimento"

- Farmacêutico: Cada farmacêutico pode trabalhar em várias farmácias.

- Farmácia: Cada farmácia pode ter vários farmacêuticos.

### A cardinalidade para o relacionamento "Atendimento" seria:

Farmacêutico: 1
(Um farmacêutico pode trabalhar em muitas farmácias)
Farmácia: N:1 (Uma farmácia pode ter muitos farmacêuticos)

Em um diagrama ER, você representaria isso com um losango "Atendimento" ligado às entidades Farmacêutico e Farmácia, com cardinalidade 1
na conexão com Farmacêutico e N:1 na conexão com Farmácia.
