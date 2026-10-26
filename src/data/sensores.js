const sensores = [
  {
    id: "temperatura",
    nome: "Temperatura",
    descricaoConfig: "Defina os limites de temperatura da vinheria.",
    descricaoHistorico: "Histórico de temperatura",
    icon: "fa-temperature-half",
    unidade: "°C",
    cor: "text-temperatura",
    fundo: "bg-temperatura",
  },
  {
    id: "umidade",
    nome: "Umidade",
    descricaoConfig: "Defina os limites de umidade do ambiente.",
    descricaoHistorico: "Histórico de umidade",
    icon: "fa-droplet",
    unidade: "%",
    cor: "text-umidade",
    fundo: "bg-umidade",
  },
  {
    id: "luminosidade",
    nome: "Luminosidade",
    descricaoConfig: "Defina os limites de luminosidade do ambiente.",
    descricaoHistorico: "Histórico de luminosidade",
    icon: "fa-lightbulb",
    unidade: "%",
    cor: "text-luz",
    fundo: "bg-luz",
  },
];

export default sensores;
