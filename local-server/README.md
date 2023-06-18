## Estrutura do Projeto

src - Código fonte do projeto
    src/conts - Contem as constantes do projeto
    src/services - Contém os services do projeto
        src/services/BoardService - É o service responsável por gerenciar uma placa.
        src/services/EventService - É o service por gerenciar os eventos recebidos pelo kafka, ele é responsável por ler o evento e identificar qual ação deve ser tomada.
        src/services/KafkaService - É o service responsável pela conexão com o kafka.
        src/services/PinService - É o service responsável por gerenciar um dispositivo de IO.

index.ts - É o arquivo principal do projeto, ele é responsável por iniciar o servidor e os serviços.
