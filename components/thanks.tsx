export default function Thanks() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F14] text-white px-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold">
          Obrigado pelo contato
        </h1>

        <p className="text-gray-400 mt-4">
          Recebemos sua mensagem. Em breve vamos entrar em contato.
        </p>

        <a
          href="/"
          className="inline-block mt-6 text-green-400 hover:text-green-300"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}