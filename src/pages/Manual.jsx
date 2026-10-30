import { useState } from "react";

const secoes = [
  {
    id: "introducao",
    numero: "01",
    titulo: "Conhecendo o aparelho",
    icon: "◈",
  },
  { id: "primeiro-acesso", numero: "02", titulo: "Primeiro acesso", icon: "▦" },
  { id: "site", numero: "03", titulo: "Utilizando a plataforma", icon: "⌘" },
  { id: "monitoramento", numero: "04", titulo: "Monitoramento", icon: "◉" },
  { id: "dados", numero: "05", titulo: "Coleta e interpretação", icon: "▤" },
  { id: "alertas", numero: "06", titulo: "Alertas", icon: "⚠" },
  { id: "instalacao", numero: "07", titulo: "Posicionamento", icon: "⌁" },
  { id: "cuidados", numero: "08", titulo: "Cuidados e conservação", icon: "✧" },
  { id: "problemas", numero: "09", titulo: "Dúvidas frequentes", icon: "?" },
];

function Manual() {
  const [secaoAtiva, setSecaoAtiva] = useState("introducao");
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [abertos, setAbertos] = useState(["cadastro", "temperatura"]);

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
        <div className="border-t border-white/10 p-4 text-sm leading-7 text-[#bcb8a4]">
          {children}
        </div>
      )}
    </div>
  );

  const CartaoDado = ({ icon, titulo, valor, descricao }) => (
    <div className="rounded-xl border border-white/10 bg-[#ffffff05] p-5">
      <span className="text-2xl text-[#d5c578]">{icon}</span>
      <p className="mt-3 text-sm font-semibold text-[#fefae0]">{titulo}</p>
      <p className="mt-2 text-2xl font-bold text-[#d5c578]">{valor}</p>
      <p className="mt-2 text-xs leading-6 text-[#aaa68f]">{descricao}</p>
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
                <h1 className="font-bold tracking-[0.2em]">COLOSYS</h1>
                <p className="text-[10px] tracking-[0.25em] text-[#a99a49]">
                  SENTINEL SYSTEM
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#aaa68f]">
              Guia de utilização do Colosys Sentinel. Aprenda a acompanhar as
              condições do seu ambiente e utilizar todas as funcionalidades
              disponíveis.
            </p>
          </div>

          <div className="px-4 pt-5">
            <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#85816d]">
              MANUAL DO USUÁRIO
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
              Manual do usuário • Versão 1.0
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
                <span>ÁREA DO USUÁRIO</span>
                <span>/</span>
                <span>MANUAL</span>
              </div>

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="rounded-full border border-[#a99a49]/40 bg-[#a99a49]/10 px-3 py-1 text-[10px] tracking-widest text-[#e7d98b]">
                    GUIA DO USUÁRIO
                  </span>

                  <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
                    Conheça o
                    <span className="block text-[#c5b66a]">
                      Colosys Sentinel.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[#aaa68f]">
                    Tudo o que você precisa saber para utilizar seu aparelho,
                    acompanhar as condições do ambiente e consultar as
                    informações pela plataforma Colosys.
                  </p>
                </div>

                <div className="rounded-xl border border-[#a99a49]/30 bg-[#a99a49]/5 p-5 md:min-w-40">
                  <p className="text-[10px] tracking-widest text-[#a99a49]">
                    VERSÃO DO MANUAL
                  </p>
                  <p className="mt-1 text-3xl font-bold">1.0</p>
                  <p className="mt-1 text-xs text-[#aaa68f]">Outubro / 2026</p>
                </div>
              </div>
            </header>

            {/* 01 - APRESENTAÇÃO */}
            <section id="introducao" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="01"
                titulo="Conhecendo o Colosys Sentinel"
                descricao="Entenda o que é o aparelho e como ele pode ajudar no acompanhamento do seu ambiente."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Bloco titulo="O que é o Colosys Sentinel?">
                  O Colosys Sentinel é um aparelho inteligente de monitoramento
                  ambiental. Ele utiliza sensores para acompanhar
                  características do ambiente, como temperatura, umidade do ar e
                  luminosidade. As informações coletadas são enviadas para uma
                  plataforma online, permitindo que você consulte os dados de
                  maneira prática.
                </Bloco>

                <Bloco titulo="Para que serve?">
                  O aparelho permite acompanhar as condições do ambiente ao
                  longo do tempo, identificar mudanças e observar possíveis
                  situações que mereçam atenção. É uma ferramenta de apoio ao
                  monitoramento, oferecendo mais visibilidade sobre o espaço em
                  que está instalado.
                </Bloco>
              </div>

              <Aviso titulo="Importante">
                O Colosys Sentinel é um equipamento de monitoramento. Ele não
                substitui instrumentos profissionais de medição, sistemas de
                segurança ou avaliações técnicas especializadas.
              </Aviso>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ["01", "Temperatura"],
                  ["02", "Umidade"],
                  ["03", "Luminosidade"],
                  ["04", "Monitoramento"],
                ].map(([numero, nome]) => (
                  <div
                    key={numero}
                    className="rounded-xl border border-white/10 bg-[#ffffff05] p-4"
                  >
                    <p className="text-xl font-bold text-[#b9a958]">{numero}</p>
                    <p className="mt-2 text-xs text-[#aaa68f]">{nome}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 02 - PRIMEIRO ACESSO */}
            <section id="primeiro-acesso" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="02"
                titulo="Primeiro acesso ao sistema"
                descricao="Aprenda a acessar a plataforma e vincular seu aparelho à sua conta."
              />

              <div className="rounded-xl border border-[#a99a49]/30 bg-[#a99a49]/5 p-6">
                <span className="text-[10px] font-bold tracking-widest text-[#a99a49]">
                  SEU APARELHO POSSUI
                </span>
                <h3 className="mt-2 text-xl font-bold">
                  QR Code e identificação exclusiva
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#bcb8a4]">
                  Na identificação do aparelho você encontrará um QR Code, que
                  direciona para o site do projeto, e um código de identificação
                  (ID), utilizado para cadastrar o dispositivo.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  [
                    "01",
                    "Localize o QR Code",
                    "Encontre a etiqueta de identificação presente no aparelho.",
                  ],
                  [
                    "02",
                    "Acesse a plataforma",
                    "Utilize a câmera do celular para ler o QR Code. Você será direcionado ao site do Colosys.",
                  ],
                  [
                    "03",
                    "Crie seu cadastro ou entre na conta",
                    "Siga as instruções apresentadas na plataforma para acessar sua conta.",
                  ],
                  [
                    "04",
                    "Informe o ID do aparelho",
                    "Durante o cadastro do dispositivo, insira o código de identificação que acompanha seu Colosys Sentinel.",
                  ],
                  [
                    "05",
                    "Finalize o cadastro",
                    "Confira se o identificador foi informado corretamente e conclua o procedimento.",
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

              <Aviso titulo="Atenção ao ID do aparelho" tipo="alerta">
                Cada aparelho possui sua própria identificação. Informe
                exatamente o ID presente na etiqueta. Não utilize o
                identificador de outro dispositivo.
              </Aviso>

              <Accordion id="cadastro" titulo="Por que preciso cadastrar o ID?">
                O ID permite que a plataforma identifique qual aparelho está
                associado ao seu cadastro. Dessa forma, os dados recebidos podem
                ser relacionados ao dispositivo correto. Guarde essa
                identificação para eventuais consultas ou solicitações de
                suporte.
              </Accordion>
            </section>

            {/* 03 - SITE */}
            <section id="site" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="03"
                titulo="Utilizando a plataforma Colosys"
                descricao="Saiba como acessar o ambiente online e consultar as informações do aparelho."
              />

              <Bloco titulo="Acesso pelo site">
                A plataforma Colosys é o ambiente utilizado para visualizar as
                informações enviadas pelo aparelho. Você pode acessá-la pelo QR
                Code presente no dispositivo ou diretamente pelo endereço
                disponibilizado pelo projeto.
              </Bloco>

              <div className="mt-5 space-y-4">
                <Bloco titulo="Seu dispositivo cadastrado">
                  Após realizar o cadastro, utilize sua conta para acessar o
                  aparelho vinculado. Confira se o dispositivo apresentado
                  corresponde ao ID que está na etiqueta do seu Colosys
                  Sentinel.
                </Bloco>

                <Bloco titulo="Consultando as informações">
                  Na plataforma, consulte os dados disponibilizados pelo
                  dispositivo. Observe os valores apresentados, suas unidades e
                  os horários das medições, quando essas informações estiverem
                  disponíveis. Acompanhe as atualizações para identificar
                  mudanças nas condições do ambiente.
                </Bloco>

                <Bloco titulo="Acompanhamento ao longo do tempo">
                  Sempre que possível, consulte os registros em diferentes
                  momentos. Comparar os dados ajuda a perceber variações que
                  podem não ser evidentes em uma única leitura.
                </Bloco>
              </div>

              <Aviso titulo="Sobre a disponibilidade dos dados">
                A visualização depende do funcionamento do aparelho, da conexão
                com a internet e da disponibilidade da plataforma. Se os dados
                não estiverem atualizados, verifique a conexão antes de
                considerar a última leitura como uma condição atual do ambiente.
              </Aviso>
            </section>

            {/* 04 - MONITORAMENTO */}
            <section id="monitoramento" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="04"
                titulo="Entendendo o monitoramento"
                descricao="Conheça as informações coletadas pelo aparelho e o significado de cada medição."
              />

              <div className="grid gap-4 md:grid-cols-3">
                <CartaoDado
                  icon="♨"
                  titulo="Temperatura"
                  valor="°C"
                  descricao="Indica a temperatura do ar nas proximidades do aparelho."
                />

                <CartaoDado
                  icon="◉"
                  titulo="Umidade"
                  valor="%"
                  descricao="Representa a quantidade relativa de vapor de água presente no ar."
                />

                <CartaoDado
                  icon="☼"
                  titulo="Luminosidade"
                  valor="%"
                  descricao="Indica a intensidade luminosa conforme a escala utilizada pelo aparelho."
                />
              </div>

              <div className="mt-5 space-y-4">
                <Bloco titulo="Temperatura ambiente">
                  A temperatura representa o nível de aquecimento do ar próximo
                  ao sensor. Valores mais altos podem indicar maior aquecimento
                  do ambiente, enquanto valores menores indicam condições mais
                  frias.
                </Bloco>

                <Bloco titulo="Umidade relativa do ar">
                  A umidade relativa indica quanto vapor de água existe no ar em
                  relação à quantidade máxima que ele poderia conter naquela
                  temperatura. Uma umidade elevada pode favorecer a sensação de
                  abafamento e, dependendo das condições do local, contribuir
                  para problemas relacionados à umidade.
                </Bloco>

                <Bloco titulo="Luminosidade">
                  O sensor de luminosidade identifica a quantidade de luz
                  recebida. Essa informação ajuda a observar se o ambiente está
                  mais iluminado ou mais escuro ao longo do dia.
                </Bloco>
              </div>

              <Aviso titulo="As medições representam o local do aparelho">
                Os sensores monitoram as condições próximas ao ponto em que o
                dispositivo está instalado. Portanto, os valores podem ser
                diferentes em outros cômodos ou regiões do mesmo ambiente.
              </Aviso>
            </section>

            {/* 05 - DADOS */}
            <section id="dados" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="05"
                titulo="Coleta e interpretação dos dados"
                descricao="Entenda os limites dos sensores e como interpretar os valores registrados."
              />

              <Bloco titulo="Sensor de temperatura e umidade">
                O Colosys Sentinel utiliza o sensor DHT11 para acompanhar duas
                características do ambiente: temperatura e umidade relativa do
                ar. Esse sensor possui limites próprios de medição. Por isso, é
                importante conhecer sua faixa de funcionamento para interpretar
                corretamente os resultados.
              </Bloco>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#ffffff05] p-5">
                  <span className="text-xs font-bold tracking-widest text-[#a99a49]">
                    TEMPERATURA
                  </span>
                  <p className="mt-4 text-3xl font-bold text-[#d5c578]">
                    0 °C – 50 °C
                  </p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full rounded-full bg-[#a99a49]" />
                  </div>
                  <p className="mt-3 text-xs leading-6 text-[#aaa68f]">
                    Faixa de medição do sensor DHT11.
                  </p>
                  <p className="mt-2 text-xs text-[#c5c1ac]">
                    Precisão aproximada: ±2 °C.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#ffffff05] p-5">
                  <span className="text-xs font-bold tracking-widest text-[#a99a49]">
                    UMIDADE RELATIVA
                  </span>
                  <p className="mt-4 text-3xl font-bold text-[#d5c578]">
                    20% – 90%
                  </p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full rounded-full bg-[#a99a49]" />
                  </div>
                  <p className="mt-3 text-xs leading-6 text-[#aaa68f]">
                    Faixa de medição do sensor DHT11.
                  </p>
                  <p className="mt-2 text-xs text-[#c5c1ac]">
                    Precisão aproximada: ±5 pontos percentuais.
                  </p>
                </div>
              </div>

              <Aviso titulo="Limites de medição" tipo="alerta">
                Os valores apresentados são limites técnicos do DHT11, não metas
                de conforto. Se a temperatura ou umidade ultrapassar a faixa
                especificada, a leitura pode não representar corretamente a
                condição real do ambiente.
              </Aviso>

              <div className="mt-6 space-y-3">
                <Accordion
                  id="temperatura"
                  titulo="Como interpretar os valores de temperatura?"
                >
                  Observe a evolução da temperatura ao longo do tempo. Por
                  exemplo, uma sequência de leituras crescentes pode indicar
                  aquecimento do ambiente. Para uma análise mais confiável,
                  compare os valores em horários semelhantes e considere fatores
                  como incidência solar, ventilação e presença de equipamentos
                  que geram calor.
                </Accordion>

                <Accordion
                  id="umidade"
                  titulo="Como interpretar os valores de umidade?"
                >
                  Observe se a umidade permanece estável ou apresenta variações
                  significativas. Valores elevados e persistentes podem
                  justificar uma verificação de ventilação, infiltrações ou
                  outras fontes de umidade. Lembre-se de que o sensor possui uma
                  tolerância aproximada de ±5 pontos percentuais.
                </Accordion>

                <Accordion
                  id="luminosidade"
                  titulo="Como interpretar a luminosidade?"
                >
                  O valor de luminosidade é apresentado em uma escala percentual
                  normalizada pelo sistema. Ele serve para comparar ambientes e
                  acompanhar variações de iluminação, mas não equivale a uma
                  medição profissional em lux.
                </Accordion>

                <Accordion
                  id="historico"
                  titulo="Por que consultar o histórico de medições?"
                >
                  Uma leitura isolada mostra apenas uma condição momentânea. Ao
                  comparar diferentes registros, você consegue identificar
                  tendências, mudanças de temperatura, períodos de maior umidade
                  e alterações na iluminação.
                </Accordion>
              </div>

              <Bloco titulo="Boas práticas na análise dos dados">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Considere sempre a data e o horário da leitura.</li>
                  <li>Observe tendências, não apenas valores isolados.</li>
                  <li>Compare medições realizadas em condições semelhantes.</li>
                  <li>Considere a precisão e os limites dos sensores.</li>
                  <li>
                    Não interprete uma leitura fora da faixa como um valor
                    exato.
                  </li>
                </ul>
              </Bloco>
            </section>

            {/* 06 - ALERTAS */}
            <section id="alertas" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="06"
                titulo="Sistema de alertas"
                descricao="Entenda a sinalização do aparelho e como utilizar os alertas disponíveis."
              />

              <Bloco titulo="Sinalização do aparelho">
                O Colosys Sentinel possui indicadores visuais e sonoros que
                podem ser utilizados para sinalizar a ativação do mecanismo de
                alerta. Quando ativado, o aparelho utiliza o LED externo e o
                buzzer para chamar a atenção do usuário.
              </Bloco>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                  <span className="text-xs font-bold tracking-widest text-emerald-400">
                    ALERTA DESATIVADO
                  </span>
                  <div className="my-4 text-4xl">◉</div>
                  <p className="text-sm font-bold">
                    Estado normal de sinalização
                  </p>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    O LED externo e o sinal sonoro permanecem desligados.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
                  <span className="text-xs font-bold tracking-widest text-amber-400">
                    ALERTA ATIVADO
                  </span>
                  <div className="my-4 animate-pulse text-4xl">◉</div>
                  <p className="text-sm font-bold">Sinalização ativa</p>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    O LED pisca e o buzzer emite um sinal sonoro.
                  </p>
                </div>
              </div>

              <Aviso titulo="Atenção">
                A sinalização visual e sonora indica que o mecanismo de alerta
                foi ativado. Ela não representa, por si só, uma emergência
                ambiental ou uma avaliação automática de risco.
              </Aviso>

              <Bloco titulo="Utilização pela plataforma">
                Quando a funcionalidade de acionamento estiver disponível na
                plataforma, utilize os controles correspondentes para ativar ou
                desativar o alerta. Após enviar um comando, aguarde a
                confirmação de execução antes de considerar a operação
                concluída.
              </Bloco>
            </section>

            {/* 07 - POSICIONAMENTO */}
            <section id="instalacao" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="07"
                titulo="Posicionamento do aparelho"
                descricao="Escolha um local adequado para obter medições mais representativas do ambiente."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Bloco titulo="Onde instalar">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Em um local com circulação natural de ar.</li>
                    <li>Em uma superfície estável e segura.</li>
                    <li>Em uma região representativa do ambiente.</li>
                    <li>Em local protegido de respingos de água.</li>
                    <li>Em uma posição que permita a ventilação do sensor.</li>
                  </ul>
                </Bloco>

                <Bloco titulo="Onde evitar instalar">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Próximo a fogões ou aquecedores.</li>
                    <li>Diretamente sob luz solar intensa.</li>
                    <li>Próximo a janelas com incidência solar direta.</li>
                    <li>Em locais com vapor ou respingos frequentes.</li>
                    <li>Em espaços fechados sem circulação de ar.</li>
                  </ul>
                </Bloco>
              </div>

              <Aviso titulo="A posição influencia as medições">
                Instalar o aparelho próximo a fontes de calor, janelas,
                equipamentos eletrônicos ou locais com pouca ventilação pode
                provocar leituras diferentes das condições gerais do ambiente.
              </Aviso>

              <Bloco titulo="Uma recomendação importante">
                Depois de escolher o local, mantenha o aparelho na mesma posição
                sempre que possível. Isso facilita a comparação dos registros e
                permite acompanhar mudanças ambientais com maior consistência.
              </Bloco>
            </section>

            {/* 08 - CUIDADOS */}
            <section id="cuidados" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="08"
                titulo="Cuidados e conservação"
                descricao="Práticas simples para preservar seu aparelho e manter seu funcionamento."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Bloco titulo="Cuidados físicos">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Evite quedas e impactos.</li>
                    <li>Não desmonte o aparelho.</li>
                    <li>Evite contato direto com líquidos.</li>
                    <li>Não obstrua as aberturas de ventilação.</li>
                    <li>Mantenha o aparelho longe de poeira excessiva.</li>
                    <li>Não exponha o dispositivo ao calor extremo.</li>
                  </ul>
                </Bloco>

                <Bloco titulo="Cuidados durante a utilização">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Utilize uma alimentação elétrica adequada.</li>
                    <li>Evite desconectar o aparelho desnecessariamente.</li>
                    <li>Confira periodicamente o estado da conexão.</li>
                    <li>Mantenha o acesso à plataforma disponível.</li>
                    <li>Preserve a etiqueta com o QR Code e o ID.</li>
                    <li>Não compartilhe suas credenciais de acesso.</li>
                  </ul>
                </Bloco>
              </div>

              <Bloco titulo="Limpeza">
                Antes de realizar qualquer limpeza, desconecte o aparelho da
                alimentação elétrica. Utilize um pano macio e seco para remover
                poeira da parte externa. Não utilize água diretamente, produtos
                químicos ou objetos pontiagudos. Não aplique força sobre os
                sensores.
              </Bloco>

              <Aviso titulo="Preservação do dispositivo" tipo="alerta">
                O aparelho contém componentes eletrônicos sensíveis. Não tente
                realizar reparos, alterações ou substituições internas sem
                orientação de uma pessoa responsável pela manutenção.
              </Aviso>
            </section>

            {/* 09 - PROBLEMAS */}
            <section id="problemas" className="mb-16 scroll-mt-8">
              <TituloSecao
                numero="09"
                titulo="Dúvidas frequentes"
                descricao="Confira orientações para situações comuns durante a utilização do Colosys Sentinel."
              />

              <div className="space-y-3">
                <Accordion
                  id="erro1"
                  titulo="Não consigo acessar o site pelo QR Code"
                >
                  Verifique se a câmera do celular consegue identificar o
                  código. Se necessário, tente utilizar outro leitor de QR Code
                  ou acesse diretamente o endereço da plataforma do projeto.
                </Accordion>

                <Accordion
                  id="erro2"
                  titulo="Meu aparelho não aparece na conta"
                >
                  Confira se você informou corretamente o ID presente na
                  etiqueta do aparelho. Verifique também se o cadastro foi
                  concluído. Se o problema persistir, entre em contato com o
                  suporte responsável.
                </Accordion>

                <Accordion id="erro3" titulo="Os dados não estão atualizando">
                  Verifique sua conexão com a internet e atualize a página da
                  plataforma. Se as informações continuarem sem atualização,
                  pode haver uma interrupção na comunicação do aparelho ou na
                  disponibilidade do serviço.
                </Accordion>

                <Accordion id="erro4" titulo="A temperatura parece incorreta">
                  Confira se o aparelho está próximo de fontes de calor, janelas
                  ou incidência solar direta. Lembre-se de que o DHT11 possui
                  precisão aproximada de ±2 °C. Caso a leitura esteja fora da
                  faixa de 0 °C a 50 °C, ela não deve ser considerada confiável.
                </Accordion>

                <Accordion
                  id="erro5"
                  titulo="A umidade apresenta valores inesperados"
                >
                  Verifique se o aparelho está próximo de vapor, líquidos ou
                  fontes localizadas de umidade. O DHT11 possui faixa de medição
                  de 20% a 90%, com precisão aproximada de ±5 pontos
                  percentuais.
                </Accordion>

                <Accordion id="erro6" titulo="O aparelho parou de funcionar">
                  Verifique se a alimentação elétrica está conectada
                  corretamente. Não abra o dispositivo nem tente modificar seus
                  componentes. Se o problema persistir, solicite assistência
                  técnica.
                </Accordion>

                <Accordion
                  id="erro7"
                  titulo="O QR Code ou a etiqueta está danificado"
                >
                  Entre em contato com o responsável pelo fornecimento do
                  aparelho para solicitar orientação sobre a identificação do
                  dispositivo.
                </Accordion>

                <Accordion
                  id="erro8"
                  titulo="O alerta sonoro ou visual não funciona"
                >
                  Confira se o aparelho está alimentado e conectado. Se a
                  sinalização continuar sem funcionar, solicite uma verificação
                  técnica.
                </Accordion>
              </div>

              <div className="mt-6 rounded-xl border border-[#a99a49]/30 bg-[#a99a49]/5 p-6">
                <span className="text-xs font-bold tracking-widest text-[#a99a49]">
                  PRECISA DE AJUDA?
                </span>
                <h3 className="mt-3 text-xl font-bold">
                  Conte com o suporte Colosys.
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#aaa68f]">
                  Se você não conseguir resolver algum problema seguindo este
                  manual, procure o responsável pelo fornecimento ou suporte do
                  projeto.
                </p>
                <p className="mt-3 text-xs text-[#c5b66a]">
                  Tenha em mãos o ID do seu aparelho e uma descrição do problema
                  encontrado.
                </p>
              </div>
            </section>

            {/* REFERÊNCIAS E RODAPÉ */}
            <footer className="border-t border-white/10 pt-8">
              <span className="text-xs font-bold tracking-[0.25em] text-[#a99a49]">
                COLOSYS SENTINEL
              </span>

              <h2 className="mt-3 text-2xl font-bold">
                Seu ambiente, sob acompanhamento.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#aaa68f]">
                O Colosys Sentinel foi desenvolvido para facilitar o
                acompanhamento das condições ambientais. Utilize a plataforma
                regularmente e siga as recomendações deste manual para
                aproveitar melhor seu dispositivo.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <a
                  href="https://github.com/MurilloFonseca/colosys-lamp-client"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-[#ffffff05] p-5 transition hover:border-[#a99a49]/50"
                >
                  <span className="text-xs text-[#a99a49]">01 / PROJETO</span>
                  <h3 className="mt-3 font-bold">Projeto Colosys ↗</h3>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    Consulte o repositório oficial do projeto.
                  </p>
                </a>

                <a
                  href="https://wokwi.com/projects/465199340265498625"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-[#ffffff05] p-5 transition hover:border-[#a99a49]/50"
                >
                  <span className="text-xs text-[#a99a49]">02 / SIMULAÇÃO</span>
                  <h3 className="mt-3 font-bold">Projeto eletrônico ↗</h3>
                  <p className="mt-2 text-xs leading-6 text-[#aaa68f]">
                    Consulte a simulação original do dispositivo.
                  </p>
                </a>
              </div>

              <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[10px] tracking-widest text-[#77735e] md:flex-row">
                <span>COLOSYS SENTINEL © 2026</span>
                <span>MANUAL DO USUÁRIO • VERSÃO 1.0</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Manual;
