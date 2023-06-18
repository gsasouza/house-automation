## Estrutura do Projeto

src - Código fonte do projeto
    src/config - Contem as configurações do projeto
    src/loadrs - Contém o middleware responsável pro agregar os [dataloaders](https://github.com/graphql/dataloader) do projeto, eles são responsáveis por gerenciar o cache e batch das requisições ao banco de dados.
    src/modules - Contém os modulos, cada modulo é responsável por gerenciar uma parte do projeto, como usuario, placas, dispositivos de IOs, etc.
        src/MODULO/*Connection - É o arquivo responsável por definir a [connection graphql](https://relay.dev/graphql/connections.htm) daquele modulo.
        src/MODULO/*Loader - É o arquivo responsável por gerenciar o [dataloaders](https://github.com/graphql/dataloader) daquele modulo
        src/MODULO/*Model - É o arquivo responsável por definir o modelo do banco de dados daquele modulo, feito utilizado [mongoose](https://mongoosejs.com/).
        src/MODULO/*Type - É arquivo responsável por definir o [type graphql](https://graphql.org/learn/schema/) daquele modulo.
    src/pubsub - Contém os arquivos relacionados ao fluxo assincrono do projeto
        src/pubsub/BoardDisconnectedEvent - Listener responsável por escutar o evento de desconexão de uma placa e enviou ao client via socket.
        src/pubsub/BoardIOChangedEvent - Listener responsável por escutar o evento mudança de estado de algum dispositivo e envio ao client via socket.
        src/pubsub/consumer - Arquivo responsável por consumir os eventos do kafka.
        src/pubsub/pubSub - Arquivo que possui a configuração do pubsub via kafka e alguns métodos utilitários.
    src/repl - Contem um arquivo para iniciar o REPL do projeto, ele é util para testar o projeto sem precisar iniciar o servidor.
    src/schema - Contem a raiz do [schema graphql](https://graphql.org/learn/schema/) 
scripts - Contem os arquivos com scripts utilitários, como extrair o schema do graphql e criar o primeiro usuário.
data - Contem os arquivos referente ao [schema graphql](https://graphql.org/learn/schema/) do projeto
auth.ts - Contém os middlewares responsáveis pela autenticação
index.ts - Ponto de entrada do projeto, ele é responsável por iniciar o [servidor graphql](https://www.apollographql.com/docs/apollo-server/getting-started), bem como iniciar a conexão com o banco de dados e o kafka.
