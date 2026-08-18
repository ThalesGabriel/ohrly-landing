export function BehaviorFlow() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#e1e6df] bg-white p-5 shadow-[0_18px_50px_rgba(20,30,22,.06)] sm:p-7">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <strong className="text-sm font-bold text-[#121512]">
            O que acontece entre a chegada e o resultado?
          </strong>

          <span className="mt-1 block text-xs leading-5 text-[#677067]">
            Ohrly procura os caminhos e sinais que diferenciam quem avança.
          </span>
        </div>

        <span className="mt-2 inline-flex w-fit rounded-full bg-[#e8efe9] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.08em] text-[#213f2d] sm:mt-0">
          aprendendo
        </span>
      </div>

      <svg
        viewBox="0 0 920 300"
        role="img"
        aria-label="Vários visitantes chegam, percorrem caminhos diferentes e poucos chegam ao resultado final"
        className="mt-2 block h-auto w-full"
      >
        <path
          d="M45 150 C145 150 185 150 260 150"
          fill="none"
          stroke="#d7ddd7"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M260 150 C335 150 355 90 430 90"
          fill="none"
          stroke="#9fb0a2"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M430 90 C525 90 585 70 675 70"
          fill="none"
          stroke="#718d76"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <path
          d="M675 70 C760 70 805 58 870 48"
          fill="none"
          stroke="#2d5a3a"
          strokeWidth="9"
          strokeLinecap="round"
        />

        <path
          d="M260 150 C330 150 350 200 430 200"
          fill="none"
          stroke="#dde2dd"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M430 200 C520 200 560 230 650 230"
          fill="none"
          stroke="#e0e4e0"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M650 230 C720 230 760 245 815 260"
          fill="none"
          stroke="#e3e7e3"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M430 90 C475 125 500 148 550 155"
          fill="none"
          stroke="#bfcbbf"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="6 7"
        />

        <path
          d="M550 155 C605 165 640 148 690 135"
          fill="none"
          stroke="#bfcbbf"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="6 7"
        />

        {Array.from({ length: 13 }).map((_, index) => (
          <circle
            key={`traffic-${index}`}
            cx={55 + index * 14}
            cy={150 + ((index % 3) - 1) * 12}
            r="5.5"
            fill={index % 4 === 0 ? "#8da08f" : "#c5cec6"}
          />
        ))}

        <circle cx="260" cy="150" r="13" fill="#9bac9e" />

        <circle
          cx="430"
          cy="90"
          r="17"
          fill="#477253"
          className="animate-pulse"
        />

        <circle cx="550" cy="155" r="11" fill="#aec0b1" />

        <circle
          cx="675"
          cy="70"
          r="17"
          fill="#2f603e"
          className="animate-pulse"
        />

        <circle cx="870" cy="48" r="22" fill="#213f2d" />

        <circle cx="430" cy="200" r="11" fill="#d0d6d0" />
        <circle cx="650" cy="230" r="11" fill="#d7dcd7" />
        <circle cx="815" cy="260" r="10" fill="#e0e4e0" />

        <circle
          cx="430"
          cy="90"
          r="29"
          fill="none"
          stroke="#b8cbbd"
          strokeWidth="2"
          strokeDasharray="4 5"
        />

        <circle
          cx="675"
          cy="70"
          r="29"
          fill="none"
          stroke="#9eb9a4"
          strokeWidth="2"
          strokeDasharray="4 5"
        />

        <text x="42" y="205" fontSize="12" fill="#737c74">
          muita gente chega
        </text>

        <text x="386" y="48" fontSize="12" fill="#2f603e" fontWeight="700">
          sinais relevantes
        </text>

        <text x="806" y="20" fontSize="12" fill="#213f2d" fontWeight="700">
          pouca vira cliente
        </text>

        <text x="690" y="285" fontSize="12" fill="#929993">
          outros caminhos
        </text>
      </svg>

      <div className="mx-auto mt-1 max-w-2xl rounded-2xl bg-[#edf3ee] px-4 py-3 text-center text-xs leading-5 text-[#526158]">
        <strong className="text-[#213f2d]">
          Ohrly procura o que aparece antes do resultado
        </strong>{" "}
        para encontrar oportunidades de otimização sem depender apenas da
        próxima conversão.
      </div>
    </div>
  );
}