import { useState } from "react";

const secoes = [
  { id: "introducao", numero: "01", titulo: "Apresentação", icon: "◈" },
  { id: "sistema", numero: "02", titulo: "Visão geral", icon: "▦" },
  { id: "componentes", numero: "03", titulo: "Componentes", icon: "⌘" },
  { id: "montagem", numero: "04", titulo: "Montagem e conexões", icon: "⌁" },
  { id: "sensores", numero: "05", titulo: "Sensores", icon: "◉" },
  { id: "conexao", numero: "06", titulo: "Conectividade", icon: "⌁" },
  { id: "mqtt", numero: "07", titulo: "MQTT e FIWARE", icon: "⇄" },
  { id: "alertas", numero: "08", titulo: "Sistema de alertas", icon: "⚠" },
  { id: "utilizacao", numero: "09", titulo: "Inicialização", icon: "▷" },
  { id: "monitoramento", numero: "10", titulo: "Monitoramento", icon: "▤" },
  { id: "problemas", numero: "11", titulo: "Solução de problemas", icon: "⚙" },
  { id: "manutencao", numero: "12", titulo: "Manutenção", icon: "✧" },
];

const componentes = [
  {
    nome: "ESP32 DevKit V1",
    tipo: "Microcontrolador",
    descricao:
      "Responsável por executar a programação, processar as leituras dos sensores e realizar a comunicação Wi-Fi e MQTT.",
    icon: "▣",
  },
  {
    nome: "Sensor LDR",
    tipo: "Luminosidade",
    descricao:
      "Identifica a intensidade de luz do ambiente por meio da variação de resistência elétrica.",
    icon: "☼",
  },
  {
    nome: "DHT22",
    tipo: "Temperatura e umidade",
    descricao:
      "Realiza a medição da temperatura e da umidade relativa do ambiente.",
    icon: "♨",
  },
  {
    nome: "LED externo",
    tipo: "Sinalização visual",
    descricao:
      "Pisca durante a ativação do alerta, indicando visualmente que o alarme está ativo.",
    icon: "◉",
  },
  {
    nome: "Buzzer",
    tipo: "Sinalização sonora",
    descricao:
      "Emite um sinal sonoro sincronizado com o LED durante a ativação do alerta.",
    icon: "♫",
  },
  {
    nome: "Resistor de 220 Ω",
    tipo: "Proteção elétrica",
    descricao:
      "Limita a corrente elétrica do LED, ajudando a evitar danos ao componente.",
    icon: "▤",
  },
];

const conexoes = [
  { componente: "LDR", pino: "34", funcao: "Leitura analógica" },
  { componente: "DHT22", pino: "4", funcao: "Dados de temperatura e umidade" },
  { componente: "LED externo", pino: "26", funcao: "Saída digital" },
  { componente: "Buzzer", pino: "27", funcao: "Saída sonora / PWM" },
  { componente: "LED da placa", pino: "2", funcao: "Indicador de conexão" },
];

function Manual() {
  const [secaoAtiva, setSecaoAtiva] = useState("introducao");
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [abertos, setAbertos] = useState(["wifi", "mqtt"]);

  const secoesFiltradas = secoes.filter((secao) =>
    secao.titulo.toLowerCase().includes(busca.toLowerCase()),
  );

  const navegar = (id) => {
    setSecaoAtiva(id);
    setMenuAberto(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const alternar = (id) => {
    setAbertos((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id],
    );
  };

  const TituloSecao = ({ numero, titulo, descricao }) => (
    <div className="mb-7">
      <span className="text-xs font-bold tracking-[0.25em] text-[#999044]">
        SEÇÃO {numero}
      </span>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#fefae0]">
        {titulo}
      </h2>
      <p className="mt-2 text-sm leading-7 text-[#b7b39c]">{descricao}</p>
      <div className="mt-5 h-px bg-gradient-to-r from-[#a99a49] via-[#625c30] to-transparent" />
    </div>
  );

  const Bloco = ({ titulo, children }) => (
    <div className="rounded-xl border border-[#ffffff12] bg-[#ffffff06] p-5 md:p-6">
      <h3 className="mb-3 font-semibold text-[#e7d98b]">{titulo}</h3>
      <div className="text-sm leading-7 text-[#c5c1ac]">{children}</div>
    </div>
  );

  const Aviso = ({ titulo, children, tipo = "info" }) => {
    const cores = {
      info: "border-[#a99a49] bg-[#a99a49]/10",
      alerta: "border-amber-500 bg-amber-500/10",
      sucesso: "border-emerald-500 bg-emerald-500/10",
    };

    return (
      <div className={`my-5 rounded-lg border-l-4 p-4 ${cores[tipo]}`}>
        <p className="mb-1 text-sm font-bold text-[#e7d98b]">{titulo}</p>
        <p className="text-sm leading-6 text-[#c5c1ac]">{children}</p>
      </div>
    );
  };

  const Codigo = ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg border border-[#ffffff12] bg-[#10100c] p-4 text-xs leading-6 text-[#e7d98b]">
      <code>{children}</code>
    </pre>
  );

  const Accordion = ({ id, titulo, children }) => (
    <div className="overflow-hidden rounded-xl border border-[#ffffff15] bg-[#ffffff05]">
      <button
        onClick={() => alternar(id)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-white/5"
      >
        <span className="text-sm font-semibold text-[#e8e2c4]">{titulo}</span>
        <span className="text-[#c4b66a]">
          {abertos.includes(id) ? "−" : "+"}
        </span>
      </button>

      {abertos.includes(id) && (
        <div className="border-t border-[#ffffff10] p-4 text-sm leading-7 text-[#bcb8a4]">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#171710] text-[#fefae0]">
      {/* MENU MOBILE */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#1d1d14] px-5 py-4 lg:hidden">
        <span className="font-bold tracking-[0.18em] text-[#e7d98b]">
          COLOSYS <span className="text-white">/ MANUAL</span>
        </span>
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="rounded-lg border border-white/10 px-3 py-2 text-[#e7d98b]"
        >
          {menuAberto ? "✕" : "☰"}
        </button>
      </div>

      <div className="flex">
        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#1d1d14] transition-transform duration-300 lg:sticky lg:top-0 lg:flex lg:h-screen lg:translate-x-0 lg:flex-col ${
            menuAberto ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-b border-white/10 px-6 py-7">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a99a49] text-xl font-bold text-[#1b1b12]">
                C
              </div>
              <div>
                <h1 className="font-bold tracking-[0.2em] text-[#fefae0]">
                  COLOSYS
                </h1>
                <p className="text-[10px] tracking-[0.25em] text-[#a99a49]">
                  SENTINEL SYSTEM
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#aaa68f]">
              Central de documentação técnica e operacional do sistema de
              monitoramento inteligente.
            </p>
          </div>

          <div className="px-4 pt-5">
            <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#85816d]">
              DOCUMENTAÇÃO
            </label>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar seção..."
              className="w-full rounded-lg border border-white/10 bg-[#12120d] px-3 py-3 text-xs text-white outline-none placeholder:text-[#77735e] focus:border-[#a99a49]"
            />
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
            {secoesFiltradas.map((secao) => (
              <button
                key={secao.id}
                onClick={() => navegar(secao.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                  secaoAtiva === secao.id
                    ? "border border-[#a99a49]/30 bg-[#a99a49]/10 text-[#e7d98b]"
                    : "text-[#aaa68f] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="w-5 text-center">{secao.icon}</span>
                <span className="flex-1 text-xs font-medium">
                  {secao.titulo}
                </span>
                <span className="text-[10px] opacity-50">{secao.numero}</span>
              </button>
            ))}
          </nav>

          <div className="border-t border-white/10 p-5">
            <p className="text-[10px] tracking-widest text-[#85816d]">
              COLOSYS SENTINEL
            </p>
            <p className="mt-1 text-xs text-[#aaa68f]">
              Manual técnico • Versão 1.0
            </p>
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main className="min-w-0 flex-1 px-5 py-8 md:px-10 lg:px-14 lg:py-12">
          <div className="mx-auto max-w-5xl">
            {/* CABEÇALHO */}
            <header className="mb-12 border-b border-white/10 pb-8">
              <div className="mb-6 flex flex-wrap items-center gap-2 text-[10px] tracking-[0.2em] text-[#a99a49]">
                <span>COLOSYS</span>
                <span>/</span>
                <span>DOCUMENTAÇÃO</span>
                <span>/</span>
                <span>MANUAL DO SISTEMA</span>
              </div>

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="rounded-full border border-[#a99a49]/40 bg-[#a99a49]/10 px-3 py-1 text-[10px] tracking-widest text-[#e7d98b]">
                    DOCUMENTAÇÃO TÉCNICA
                  </span>
                  <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
                    Manual do
                    <span className="block text-[#c5b66a]">
                      Colosys Sentinel.
                    </span>
                  </h1>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-[#aaa68f]">
                    Guia completo de instalação, configuração, operação e
                    manutenção do sistema de monitoramento inteligente
                    desenvolvido com ESP32 e sensores ambientais.
                  </p>
                </div>

                <div className="rounded-xl border border-[#a99a49]/30 bg-[#a99a49]/5 p-5 md:min-w-40">
                  <p className="text-[10px] tracking-widest text-[#a99a49]">
                    VERSÃO
                  </p>
                  <p className="mt-1 text-3xl font-bold text-[#fefae0]">1.0</p>
                  <p className="mt-1 text-xs text-[#aaa68f]">Outubro / 2026</p>
                </div>
              </div>
            </header>

            {/* INTRODUÇÃO */}
            <section id="introducao" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="01"
                titulo="Apresentação do projeto"
                descricao="Conheça a proposta, os objetivos e as funcionalidades do Colosys Sentinel."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Bloco titulo="O que é o Colosys Sentinel?">
                  O Colosys Sentinel é um sistema de monitoramento inteligente
                  baseado em IoT (Internet das Coisas). Utiliza um
                  microcontrolador ESP32 para coletar informações ambientais e
                  transmitir os dados para uma infraestrutura de monitoramento.
                </Bloco>

                <Bloco titulo="Objetivo principal">
                  Oferecer visibilidade sobre as condições do ambiente por meio
                  de sensores de luminosidade, temperatura e umidade, permitindo
                  o acompanhamento das leituras e a ativação remota de um
                  mecanismo de alerta.
                </Bloco>
              </div>

              <Aviso titulo="Importante">
                O sistema utiliza o LED e o buzzer como sinalizadores de alerta.
                A ativação do mecanismo não representa, necessariamente, o
                acionamento de uma iluminação convencional.
              </Aviso>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ["01", "Monitoramento"],
                  ["02", "Conectividade"],
                  ["03", "Automação"],
                  ["04", "Alertas"],
                ].map(([n, nome]) => (
                  <div
                    key={n}
                    className="rounded-xl border border-white/10 bg-[#ffffff05] p-4"
                  >
                    <p className="text-xl font-bold text-[#b9a958]">{n}</p>
                    <p className="mt-2 text-xs text-[#aaa68f]">{nome}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* VISÃO GERAL */}
            <section id="sistema" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="02"
                titulo="Visão geral do sistema"
                descricao="Entenda como os componentes se comunicam e como os dados percorrem a arquitetura."
              />

              <div className="rounded-xl border border-white/10 bg-[#ffffff05] p-5 md:p-8">
                <div className="grid gap-3 text-center">
                  <div className="rounded-lg border border-[#a99a49]/40 bg-[#a99a49]/10 p-4">
                    <p className="text-xs font-bold text-[#e7d98b]">
                      CAMADA FÍSICA
                    </p>
                    <p className="mt-2 text-sm text-[#fefae0]">
                      ESP32 + LDR + DHT22 + LED + Buzzer
                    </p>
                  </div>
                  <div className="text-xl text-[#b9a958]">↓</div>
                  <div className="rounded-lg border border-white/10 bg-[#ffffff08] p-4">
                    <p className="text-xs font-bold text-[#e7d98b]">
                      CONECTIVIDADE
                    </p>
                    <p className="mt-2 text-sm text-[#fefae0]">
                      Wi-Fi + Protocolo MQTT
                    </p>
                  </div>
                  <div className="text-xl text-[#b9a958]">↓</div>
                  <div className="rounded-lg border border-white/10 bg-[#ffffff08] p-4">
                    <p className="text-xs font-bold text-[#e7d98b]">
                      INFRAESTRUTURA
                    </p>
                    <p className="mt-2 text-sm text-[#fefae0]">
                      Broker MQTT + FIWARE
                    </p>
                  </div>
                  <div className="text-xl text-[#b9a958]">↓</div>
                  <div className="rounded-lg border border-[#a99a49]/40 bg-[#a99a49]/10 p-4">
                    <p className="text-xs font-bold text-[#e7d98b]">
                      APLICAÇÃO
                    </p>
                    <p className="mt-2 text-sm text-[#fefae0]">
                      Cliente Colosys Lamp
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-[#85816d]">
                Fluxo conceitual da arquitetura. A disponibilidade de cada
                camada depende da configuração e do funcionamento da
                infraestrutura correspondente.
              </p>
            </section>

            {/* COMPONENTES */}
            <section id="componentes" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="03"
                titulo="Componentes utilizados"
                descricao="Identificação dos principais componentes eletrônicos empregados no protótipo."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {componentes.map((item) => (
                  <div
                    key={item.nome}
                    className="rounded-xl border border-white/10 bg-[#ffffff05] p-5 transition hover:border-[#a99a49]/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#a99a49]/10 text-2xl text-[#d5c578]">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#fefae0]">
                          {item.nome}
                        </h3>
                        <span className="text-[10px] uppercase tracking-widest text-[#a99a49]">
                          {item.tipo}
                        </span>
                        <p className="mt-3 text-xs leading-6 text-[#aaa68f]">
                          {item.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* MONTAGEM */}
            <section id="montagem" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="04"
                titulo="Montagem e conexões"
                descricao="Identificação das conexões entre os periféricos e o microcontrolador."
              />

              <Bloco titulo="Identificação dos pinos">
                A montagem utiliza os pinos GPIO do ESP32 para receber
                informações dos sensores e controlar os dispositivos de
                sinalização.
              </Bloco>

              <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[450px] text-left text-sm">
                  <thead className="bg-[#a99a49]/10 text-xs text-[#d5c578]">
                    <tr>
                      <th className="p-4">COMPONENTE</th>
                      <th className="p-4">GPIO</th>
                      <th className="p-4">FUNÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conexoes.map((item) => (
                      <tr
                        key={item.componente}
                        className="border-t border-white/10 text-[#c5c1ac]"
                      >
                        <td className="p-4 font-medium text-[#fefae0]">
                          {item.componente}
                        </td>
                        <td className="p-4 font-mono text-[#d5c578]">
                          {item.pino}
                        </td>
                        <td className="p-4 text-xs">{item.funcao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Aviso titulo="Atenção à montagem" tipo="alerta">
                Verifique a alimentação, o GND comum e a identificação dos
                terminais antes de energizar o circuito. O LED externo utiliza
                resistor de 220 Ω. Consulte o diagrama do Wokwi para confirmar
                as ligações físicas de cada componente.
              </Aviso>

              <a
                href="https://wokwi.com/projects/465199340265498625"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#a99a49]/40 px-5 py-3 text-xs font-semibold text-[#e7d98b] transition hover:bg-[#a99a49]/10"
              >
                Visualizar montagem no Wokwi ↗
              </a>
            </section>

            {/* SENSORES */}
            <section id="sensores" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="05"
                titulo="Sensores e coleta de dados"
                descricao="Conheça as variáveis ambientais monitoradas pelo dispositivo."
              />

              <div className="space-y-4">
                <Bloco titulo="5.1 Sensor de luminosidade — LDR">
                  O LDR (Light Dependent Resistor) identifica a intensidade
                  luminosa do ambiente. Sua resistência elétrica varia conforme
                  a quantidade de luz recebida.
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Conectado ao GPIO 34 do ESP32.</li>
                    <li>Utiliza a leitura analógica do conversor ADC.</li>
                    <li>
                      Realiza uma média de oito leituras para reduzir ruídos.
                    </li>
                    <li>
                      Converte o resultado para uma escala percentual de 0 a
                      100.
                    </li>
                  </ul>
                </Bloco>

                <Bloco titulo="5.2 Sensor DHT22 — Temperatura e umidade">
                  O DHT22 realiza duas medições ambientais:
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Temperatura em graus Celsius (°C).</li>
                    <li>Umidade relativa do ar em porcentagem (%).</li>
                    <li>Comunicação pelo GPIO 4.</li>
                    <li>Intervalo de leitura configurado em 2 segundos.</li>
                  </ul>
                </Bloco>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  ["☼", "Luminosidade", "0–100%", "Sensor LDR"],
                  ["♨", "Temperatura", "°C", "Sensor DHT22"],
                  ["◉", "Umidade", "%", "Sensor DHT22"],
                ].map(([icon, nome, unidade, sensor]) => (
                  <div
                    key={nome}
                    className="rounded-xl border border-white/10 bg-[#ffffff05] p-5"
                  >
                    <span className="text-2xl text-[#d5c578]">{icon}</span>
                    <p className="mt-3 text-sm font-semibold">{nome}</p>
                    <p className="mt-1 text-xl font-bold text-[#d5c578]">
                      {unidade}
                    </p>
                    <p className="mt-2 text-[10px] text-[#85816d]">{sensor}</p>
                  </div>
                ))}
              </div>

              <Aviso titulo="Interpretação dos dados">
                A escala percentual do LDR representa a luminosidade normalizada
                pelo programa, não uma medição em lux. A calibração dos extremos
                depende das características do sensor e do ambiente.
              </Aviso>
            </section>

            {/* WIFI */}
            <section id="conexao" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="06"
                titulo="Conectividade Wi-Fi"
                descricao="Configuração e manutenção da conexão de rede do ESP32."
              />

              <p className="mb-5 text-sm leading-7 text-[#bcb8a4]">
                O ESP32 utiliza Wi-Fi para estabelecer comunicação com o broker
                MQTT. Na simulação do Wokwi, o projeto utiliza a rede de testes
                disponibilizada pela própria plataforma.
              </p>

              <Accordion id="wifi" titulo="Configuração para simulação Wokwi">
                No início do arquivo sketch.ino, são definidas as credenciais:
                <Codigo>{`const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASSWORD = "";`}</Codigo>
                A rede Wokwi-GUEST não exige senha. O código também configura o
                canal 6 para acelerar a conexão na simulação.
              </Accordion>

              <Accordion id="wifi-real" titulo="Configuração para ESP32 físico">
                Para utilizar uma rede real, substitua as credenciais pelas
                informações da rede Wi-Fi autorizada:
                <Codigo>{`const char* WIFI_SSID = "NOME_DA_REDE";
const char* WIFI_PASSWORD = "SENHA_DA_REDE";`}</Codigo>
                Não compartilhe senhas em repositórios públicos. Utilize
                configurações protegidas para armazenar credenciais.
              </Accordion>

              <Bloco titulo="Reconexão automática">
                O programa verifica o estado da conexão e realiza novas
                tentativas de conexão Wi-Fi em intervalos de 10 segundos. O
                processo não depende de bloqueios prolongados no loop principal.
              </Bloco>
            </section>

            {/* MQTT */}
            <section id="mqtt" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="07"
                titulo="Comunicação MQTT e FIWARE"
                descricao="Entenda a transmissão de dados e o recebimento de comandos remotos."
              />

              <Bloco titulo="O que é MQTT?">
                MQTT é um protocolo de comunicação leve, utilizado em aplicações
                IoT. Ele permite que dispositivos publiquem informações e
                recebam comandos por meio de um broker.
              </Bloco>

              <div className="mt-5 space-y-4">
                <Bloco titulo="7.1 Configuração do broker">
                  O endereço do broker deve ser configurado no código:
                  <Codigo>{`const char* BROKER_MQTT =
  "COLOQUE_AQUI_O_IP_DO_BROKER";

const uint16_t BROKER_PORT = 1883;`}</Codigo>
                  É necessário informar um endereço IP acessível pelo ESP32. O
                  endereço localhost não deve ser utilizado, pois representa o
                  próprio microcontrolador, e não o servidor externo.
                </Bloco>

                <Bloco titulo="7.2 Identificação do dispositivo">
                  Cada dispositivo possui uma chave de identificação e um
                  identificador próprio.
                  <Codigo>{`const char* API_KEY = "TEF";
const char* DEVICE_ID = "lamp001";`}</Codigo>
                  Esses valores devem corresponder às credenciais e à identidade
                  cadastradas na infraestrutura FIWARE.
                </Bloco>
              </div>

              <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[450px] text-left text-sm">
                  <thead className="bg-[#a99a49]/10 text-xs text-[#d5c578]">
                    <tr>
                      <th className="p-4">TÓPICO MQTT</th>
                      <th className="p-4">FINALIDADE</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-[#c5c1ac]">
                    <tr className="border-t border-white/10">
                      <td className="p-4 font-mono">/TEF/lamp001/attrs</td>
                      <td className="p-4">Envio das leituras e do estado.</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="p-4 font-mono">/TEF/lamp001/cmd</td>
                      <td className="p-4">Recebimento de comandos.</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="p-4 font-mono">/TEF/lamp001/cmdexe</td>
                      <td className="p-4">Confirmação da execução.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Aviso titulo="Atenção: configuração obrigatória" tipo="alerta">
                O código disponibilizado contém um endereço de broker
                provisório. Sem substituí-lo por um broker válido, o dispositivo
                poderá conectar-se ao Wi-Fi, mas não conseguirá transmitir os
                dados ao FIWARE.
              </Aviso>

              <Bloco titulo="7.3 Integração com FIWARE">
                O FIWARE recebe e gerencia as informações dos dispositivos IoT.
                O ESP32 utiliza o protocolo Ultralight sobre MQTT, permitindo
                transmitir atributos ambientais e receber comandos de
                acionamento. A integração também prevê a resposta pelo tópico
                cmdexe, evitando que os comandos permaneçam pendentes na
                plataforma.
              </Bloco>
            </section>

            {/* ALERTAS */}
            <section id="alertas" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="08"
                titulo="Sistema de alertas"
                descricao="Funcionamento do mecanismo de sinalização visual e sonora."
              />

              <Bloco titulo="8.1 Ativação do alerta">
                Quando o dispositivo recebe o comando on pelo tópico MQTT, o
                ESP32 ativa o mecanismo de sinalização.
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>O LED externo começa a piscar.</li>
                  <li>O buzzer emite um sinal sonoro sincronizado.</li>
                  <li>O estado do dispositivo é atualizado.</li>
                  <li>O FIWARE recebe a confirmação da execução.</li>
                </ul>
              </Bloco>

              <Bloco titulo="8.2 Desativação do alerta">
                Ao receber o comando off, o programa interrompe a sinalização
                visual e sonora, atualiza o estado e publica a nova informação
                na infraestrutura.
              </Bloco>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                  <span className="text-xs font-bold tracking-widest text-emerald-400">
                    ESTADO OFF
                  </span>
                  <div className="my-4 text-4xl">◉</div>
                  <p className="text-sm font-bold">Alerta desativado</p>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    LED e buzzer permanecem desligados.
                  </p>
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
                  <span className="text-xs font-bold tracking-widest text-amber-400">
                    ESTADO ON
                  </span>
                  <div className="my-4 animate-pulse text-4xl">◉</div>
                  <p className="text-sm font-bold">Alerta ativado</p>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    LED pisca e buzzer emite sinal sonoro.
                  </p>
                </div>
              </div>

              <Bloco titulo="8.3 Parâmetros do alarme">
                <Codigo>{`const bool BUZZER_ENABLED = true;
const bool BUZZER_PASSIVE = true;
const int BUZZER_FREQ_HZ = 2000;

const uint32_t BLINK_HALF_PERIOD_MS = 500;`}</Codigo>
                O período de 500 ms corresponde a cada fase do pisca. Portanto,
                o ciclo completo de acender e apagar dura aproximadamente 1
                segundo.
              </Bloco>
            </section>

            {/* UTILIZAÇÃO */}
            <section id="utilizacao" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="09"
                titulo="Inicialização e utilização"
                descricao="Procedimento para iniciar a simulação e verificar o funcionamento do dispositivo."
              />

              <div className="space-y-3">
                {[
                  [
                    "01",
                    "Acesse o projeto",
                    "Abra o projeto Colosys Sentinel na plataforma Wokwi.",
                  ],
                  [
                    "02",
                    "Verifique o circuito",
                    "Confira os componentes e suas conexões antes de iniciar.",
                  ],
                  [
                    "03",
                    "Inicie a simulação",
                    "Clique em Start Simulation para executar o ESP32.",
                  ],
                  [
                    "04",
                    "Verifique o Wi-Fi",
                    "Observe o console Serial e aguarde a conexão.",
                  ],
                  [
                    "05",
                    "Configure o broker",
                    "Informe o endereço correto do servidor MQTT.",
                  ],
                  [
                    "06",
                    "Verifique a telemetria",
                    "Acompanhe as leituras e a publicação dos atributos.",
                  ],
                  [
                    "07",
                    "Teste os comandos",
                    "Envie on e off pela infraestrutura MQTT/FIWARE.",
                  ],
                ].map(([numero, titulo, descricao]) => (
                  <div
                    key={numero}
                    className="flex gap-4 rounded-xl border border-white/10 bg-[#ffffff05] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#a99a49]/10 text-xs font-bold text-[#d5c578]">
                      {numero}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{titulo}</h3>
                      <p className="mt-1 text-xs leading-6 text-[#aaa68f]">
                        {descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Aviso titulo="Sobre os comandos">
                Os comandos on e off são recebidos pelo tópico MQTT de comando.
                A interface do cliente precisa estar integrada à infraestrutura
                para que o acionamento remoto funcione. Iniciar a simulação,
                isoladamente, não configura o broker.
              </Aviso>
            </section>

            {/* MONITORAMENTO */}
            <section id="monitoramento" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="10"
                titulo="Monitoramento dos dados"
                descricao="Como interpretar as informações produzidas pelo ESP32."
              />

              <Bloco titulo="Console Serial">
                O monitor serial permite acompanhar informações importantes
                durante a execução do programa, incluindo:
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Estado da conexão Wi-Fi.</li>
                  <li>Endereço IP recebido pelo ESP32.</li>
                  <li>Estado da conexão MQTT.</li>
                  <li>Leitura bruta e percentual do LDR.</li>
                  <li>Temperatura e umidade.</li>
                  <li>Comandos recebidos e respectivas respostas.</li>
                </ul>
              </Bloco>

              <Bloco titulo="Intervalos e parâmetros">
                <div className="space-y-3">
                  {[
                    ["Telemetria", "2.000 ms"],
                    ["Nova tentativa MQTT", "3.000 ms"],
                    ["Nova tentativa Wi-Fi", "10.000 ms"],
                    ["Velocidade Serial", "115200 baud"],
                  ].map(([nome, valor]) => (
                    <div
                      key={nome}
                      className="flex justify-between gap-3 border-b border-white/10 pb-2"
                    >
                      <span>{nome}</span>
                      <span className="font-mono text-[#d5c578]">{valor}</span>
                    </div>
                  ))}
                </div>
              </Bloco>
            </section>

            {/* PROBLEMAS */}
            <section id="problemas" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="11"
                titulo="Solução de problemas"
                descricao="Orientações para identificar e corrigir falhas comuns durante a execução."
              />

              <div className="space-y-3">
                <Accordion id="erro1" titulo="O ESP32 não conecta ao Wi-Fi">
                  Verifique se o nome da rede e a senha estão corretos. No
                  Wokwi, utilize Wokwi-GUEST e senha vazia. Reinicie a simulação
                  e confira as mensagens no console Serial.
                </Accordion>

                <Accordion
                  id="erro2"
                  titulo="O ESP32 conecta ao Wi-Fi, mas não ao MQTT"
                >
                  Verifique o endereço IP do broker, a porta 1883 e a
                  disponibilidade do servidor. Certifique-se de que o endereço é
                  acessível pela rede utilizada e de que o broker está em
                  execução.
                </Accordion>

                <Accordion
                  id="erro3"
                  titulo="O sensor DHT22 não apresenta leituras"
                >
                  Confira a ligação do pino de dados no GPIO 4, a alimentação e
                  o tipo de sensor definido no código. Verifique também se a
                  biblioteca DHT e a Adafruit Unified Sensor estão instaladas.
                </Accordion>

                <Accordion
                  id="erro4"
                  titulo="A luminosidade apresenta valores incorretos"
                >
                  Verifique a calibração LDR_RAW_MIN e LDR_RAW_MAX e a
                  configuração LDR_INVERTED. A orientação do sinal pode variar
                  de acordo com o módulo utilizado.
                </Accordion>

                <Accordion id="erro5" titulo="O LED ou buzzer não funciona">
                  Confira as conexões GPIO 26 e GPIO 27, respectivamente.
                  Verifique também a configuração BUZZER_ENABLED e
                  BUZZER_PASSIVE.
                </Accordion>

                <Accordion
                  id="erro6"
                  titulo="Os comandos on e off não são executados"
                >
                  Confira a inscrição no tópico cmd, a API_KEY, o DEVICE_ID e o
                  formato da mensagem recebida. Verifique se o comando pertence
                  ao dispositivo correto.
                </Accordion>

                <Accordion
                  id="erro7"
                  titulo="Os comandos ficam pendentes no FIWARE"
                >
                  Verifique se a resposta está sendo publicada no tópico cmdexe.
                  O programa utiliza uma confirmação após o processamento dos
                  comandos reconhecidos.
                </Accordion>
              </div>
            </section>

            {/* MANUTENÇÃO */}
            <section id="manutencao" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="12"
                titulo="Manutenção e recomendações"
                descricao="Boas práticas para preservar o funcionamento e a confiabilidade do sistema."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Bloco titulo="Cuidados com o hardware">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Verificar periodicamente as conexões.</li>
                    <li>Evitar curtos-circuitos.</li>
                    <li>Utilizar alimentação compatível com os componentes.</li>
                    <li>Proteger o circuito contra umidade e poeira.</li>
                    <li>Conferir o estado dos cabos e sensores.</li>
                  </ul>
                </Bloco>

                <Bloco titulo="Cuidados com o software">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Manter as bibliotecas atualizadas.</li>
                    <li>Preservar uma cópia do código-fonte.</li>
                    <li>Testar alterações antes de utilizá-las.</li>
                    <li>Proteger as credenciais de acesso.</li>
                    <li>Monitorar a estabilidade da comunicação.</li>
                  </ul>
                </Bloco>
              </div>

              <Aviso titulo="Segurança e confiabilidade" tipo="alerta">
                A configuração apresentada utiliza MQTT na porta 1883 e não
                demonstra autenticação ou criptografia no código
                disponibilizado. Para implantação em ambiente real, recomenda-se
                avaliar autenticação, TLS, controle de acesso e armazenamento
                seguro das credenciais.
              </Aviso>
            </section>

            {/* REFERÊNCIAS */}
            <footer className="border-t border-white/10 pt-8">
              <span className="text-xs font-bold tracking-[0.25em] text-[#a99a49]">
                DOCUMENTAÇÃO E REFERÊNCIAS
              </span>

              <h2 className="mt-3 text-2xl font-bold">Explore o projeto.</h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#aaa68f]">
                Consulte os recursos originais para acessar o código-fonte, a
                simulação eletrônica e os arquivos utilizados no desenvolvimento
                do Colosys Sentinel.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <a
                  href="https://github.com/MurilloFonseca/colosys-lamp-client"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-[#ffffff05] p-5 transition hover:border-[#a99a49]/50"
                >
                  <span className="text-xs text-[#a99a49]">01 / SOFTWARE</span>
                  <h3 className="mt-3 font-bold">GitHub Repository ↗</h3>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    Código-fonte do cliente Colosys Lamp.
                  </p>
                </a>

                <a
                  href="https://wokwi.com/projects/465199340265498625"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-[#ffffff05] p-5 transition hover:border-[#a99a49]/50"
                >
                  <span className="text-xs text-[#a99a49]">02 / HARDWARE</span>
                  <h3 className="mt-3 font-bold">Wokwi Simulation ↗</h3>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    Circuito eletrônico e programação do ESP32.
                  </p>
                </a>
              </div>

              <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[10px] tracking-widest text-[#77735e] md:flex-row">
                <span>COLOSYS SENTINEL © 2026</span>
                <span>DOCUMENTAÇÃO TÉCNICA • VERSÃO 1.0</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Manual;
