import Plot from "react-plotly.js";

const Grafico = ({ nome, descricao, cor, x, y }) => {
  const data = [
    {
      x,
      y,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: cor },
    },
  ];

  return (
    <article className="flex min-h-72 min-w-0 flex-col rounded-2xl border border-amarelo-claro/15 bg-[#11110f] p-5 shadow-lg transition-all duration-300 hover:border-amarelo-claro/30 sm:p-6 w-full">
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-['Playfair_Display'] text-lg text-amarelo-claro">
            {nome}
          </h3>

          <p className="mt-1 text-xs text-texto/40">{descricao}</p>
        </div>
      </div>

      <div className="mt-6 flex min-h-48 flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-amarelo-claro/15 bg-black/20 px-4 py-8 text-center">
        <Plot
          data={data}
          layout={{
            font: { color: "#fff0ad" },
            plot_bgcolor: "rgba(0, 0, 0, 0.2)",
            paper_bgcolor: "rgba(0, 0, 0, 0.2)",
            xaxis: {
              gridcolor: "rgba(255, 240, 173, 0.3)",
            },
            yaxis: {
              gridcolor: "rgba(255, 240, 173, 0.3)",
            },
          }}
        />
      </div>
    </article>
  );
};

export default Grafico;
