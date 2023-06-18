## Estrutura do Projeto

src - Código fonte do projeto
    src/components - Componentes React 
        src/componentes/auth - Componentes para a tela de login
        src/componentes/boardIos - Componentes para as telas de gerenciamento de dispositivos de IOs
        src/componentes/boards - Componentes para as telas de gerenciamento de placas
        src/componentes/common - Componentes em comum para todas as telas
        src/componentes/dashboard - Componentes para inicial depois de logado
        src/componentes/home - Componentes para o conteudo da tela inicial
        src/componentes/utils - Componentes utilitários para o projeto
    src/utils - Funções utilitárias para o projeto, como gerenciar a autenticação
    src/i18n - Pasta contendo a tradução do projeto
    src/images - Imagens utilizadas no projeto
    src/relay - O projeto utiliza [relay](https://relay.dev/) para gerenciar as requisições graphql ao servidor, essa pasta contempla os arquivos de configuração do relay
    src/routes - Arquivo de configuração das rotas do projeto

data - Contem os arquivos referente ao [schema graphql](https://graphql.org/learn/schema/) do projeto
        
