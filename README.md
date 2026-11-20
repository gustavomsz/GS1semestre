# PRIORIZA

## Ficha da CitizenTech

| Campo | Resposta |
|---|---|
| Nome da CitizenTech | PRIORIZA - Mobilidade sem barreiras |
| Cidade e bairro | São Paulo - Sé (Centro) |
| Cidadão beneficiado | Pessoas com direito a atendimento prioritário: deficiência física, visual ou auditiva, idosos, mobilidade reduzida, gestantes e pessoas autistas |
| Problema, em uma frase | O passageiro com prioridade não consegue avisar o motorista antes de o ônibus chegar e costuma encontrar o assento preferencial ocupado |
| Como funciona | O passageiro faz o cadastro, escolhe a linha e o ponto, o motorista é avisado e o LED do assento preferencial acende. Antenas nos pontos informam onde o ônibus está |
| O que cada parte faz | `prioriza.js`: lógica com as classes. `interface.js`: liga a lógica às telas. `accessibility.js`: zoom e alto contraste. Páginas HTML/CSS: telas do passageiro e do motorista |
| Link do repositório |Site (JS): https://github.com/gustavomsz/GS1semestre · Python: https://github.com/natyqueiroz/GlobalSolution-python | |
| Indicador de impacto | Número de passageiros com prioridade que embarcaram com o motorista avisado e o assento preferencial livre, por linha e por mês.|
| ODS conectados | ODS 10 (Redução das desigualdades) e ODS 11 (Cidades e comunidades sustentáveis) |


## Páginas

| Página | O que faz | Escopo |
|---|---|---|
| `index.html` | Apresenta o Prioriza, como funciona, para quem é, os recursos de acessibilidade e os status do ponto | — |
| `register.html` | Cadastro do passageiro com nome, contato e tipo de atendimento (autodeclarado) | PB01 |
| `request.html` | Escolha da linha, do ponto de embarque e da quantidade de assentos | PB02, PB06, RN02 |
| `confirmation.html` | Confirmação da solicitação, acompanhamento do ônibus pelas antenas e cancelamento com confirmação | PB05, PB07, PB09 |
| `driver.html` | Avisos de novos atendimentos, cancelamentos e embarques, e o estado dos LEDs dos assentos | PB03, PB04 |

## Estrutura

```
prioriza-site/
├── index.html
├── README.md
└── src/
    ├── js/
    │   ├── prioriza.js
    │   ├── interface.js
    │   └── accessibility.js
    ├── pages/
    │   ├── register.html
    │   ├── request.html
    │   ├── confirmation.html
    │   └── driver.html
    └── style/
        └── main.css
```

## JavaScript

| Arquivo | Função |
|---|---|
| `js/prioriza.js` | Lógica do sistema feita pelo grupo: classes `Onibus`, `Passageiro`, `Antena` e `Rota`. Não foi alterado para o site. |
| `js/interface.js` | Funções chamadas pelos botões (`onclick`). Lê os campos com `getElementById(...).value`, usa o `onibus1`, a `rota1` e a classe `Passageiro` do `prioriza.js` e mostra o resultado com `innerText`. |
| `js/accessibility.js` | Funções dos botões A−, A+ e Alto contraste. |

Os arquivos são carregados no fim do `<body>`, nesta ordem: `prioriza.js`, `interface.js` e `accessibility.js`.

Os dados da demonstração (passageiro, solicitação, assentos e último aviso) ficam salvos no navegador com `localStorage`, para passar de uma página para outra. O botão **Limpar dados da demonstração**, no painel do motorista, apaga tudo.

## Acessibilidade

O Prioriza é feito para pessoas com deficiência de qualquer tipo.

| Público | Recursos |
|---|---|
| Deficiência visual | Aumentar e diminuir o texto, alto contraste, fonte Atkinson Hyperlegible e compatibilidade com leitores de tela |
| Deficiência auditiva | Tradução em Libras pelo VLibras e avisos sempre escritos na tela |
| Deficiência física e mobilidade reduzida | Botões e opções grandes (mínimo de 48px) e navegação completa pelo teclado |
| Autismo e deficiência intelectual | Linguagem simples, indicador "Passo 1 de 3" e o ônibus só avança quando a pessoa clica |
| Idosos e gestantes | Letras grandes, poucas etapas e uma ação principal por página |


## Regras de negócio

- **RN01:** a solicitação é feita antes da chegada do ônibus. Na simulação, a viagem só começa depois da solicitação.
- **RN02:** cada solicitação tem uma linha e um ponto de embarque.
- **RN03:** para outra viagem, o passageiro faz uma nova solicitação, depois do embarque ou do cancelamento da anterior.

## Limitações

- O site não tem servidor. O painel do motorista mostra apenas as solicitações feitas no mesmo navegador.
- A demonstração usa um único ônibus (971-m), uma linha (2002-10) e três pontos fixos.
- O tipo de atendimento é informado pelo próprio passageiro. O sistema não verifica a condição.
- O VLibras precisa de internet para carregar.
- O Prioriza auxilia na comunicação, mas não substitui a ajuda humana.

## Time 404

| Integrante | RM |
|---|---|
| Giovanna Ciola | 575631 |
| Nathaly Vieira Barbosa | 575407 |
| Marina Lobato Soares | 575475 |
| Jamil de Jesus Chaluppe Filho | 575697 |
| Gustavo Moreira Souza | 576147 |