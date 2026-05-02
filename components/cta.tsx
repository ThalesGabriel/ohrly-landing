
type Props = {
  loading: boolean
  submit(e: any): Promise<void>
}

export default function CTA({loading, submit: handleSubmit }: Props) {

  return (
    <section className="relative px-8 py-20">

      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#0A0F14]" />

      <div className="max-w-2xl mx-auto">

        {/* header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white">
            Entre em contato
          </h3>

          <p className="text-gray-400 mt-2">
            Entenda como o Ohrly pode detectar degradações antes do impacto.
          </p>
        </div>

        
          <div className="bg-[#11161C] rounded-2xl p-6 border border-gray-800">

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="name"
                placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-lg bg-[#0B0F14] border border-gray-800 text-white"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-3 rounded-lg bg-[#0B0F14] border border-gray-800 text-white"
                required
              />

              <textarea
                name="message"
                placeholder="Conte seu contexto"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[#0B0F14] border border-gray-800 text-white"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-400 text-black py-3 rounded-lg font-medium hover:bg-green-300 transition disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Entrar em contato"}
              </button>

            </form>

          </div>
        

      </div>
    </section>
  );
}