const SectionHeading = ({ eyebrow, titulo, descricao }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-[10px] uppercase tracking-[0.25em] text-amarelo-claro/45">
        {eyebrow}
      </span>

      <h2 className="mt-2 font-['Playfair_Display'] text-2xl font-semibold italic text-amarelo-claro sm:text-3xl">
        {titulo}
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-texto/45">
        {descricao}
      </p>
    </div>
  );
};

export default SectionHeading;
