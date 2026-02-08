import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

/**
 * Design: Warm & Playful
 * Componente de formulário de agendamento que envia dados para WhatsApp
 */

interface FormData {
  nomeCliente: string;
  nomePet: string;
  tipoPet: string;
  servico: string;
  dataPreferida: string;
  telefone: string;
  mensagemAdicional: string;
}

const SERVICOS = [
  "Banho e Tosa",
  "Banho Simples",
  "Tosa Higiênica",
  "Tosa Completa",
  "Consulta Veterinária",
  "Compra de Produtos",
  "Outro",
];

const TIPOS_PET = ["Cão", "Gato", "Coelho", "Hamster", "Outro"];

export default function AgendamentoForm() {
  const [formData, setFormData] = useState<FormData>({
    nomeCliente: "",
    nomePet: "",
    tipoPet: "",
    servico: "",
    dataPreferida: "",
    telefone: "",
    mensagemAdicional: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const gerarMensagemWhatsApp = (): string => {
    const mensagem = `
🐾 *AGENDAMENTO DE SERVIÇO - PetFils* 🐾

*Dados do Cliente:*
📝 Nome: ${formData.nomeCliente}
📱 Telefone: ${formData.telefone}

*Dados do Pet:*
🐶 Nome do Pet: ${formData.nomePet}
🐱 Tipo: ${formData.tipoPet}

*Serviço Solicitado:*
✨ Serviço: ${formData.servico}
📅 Data Preferida: ${formData.dataPreferida}

${formData.mensagemAdicional ? `*Observações:*\n💬 ${formData.mensagemAdicional}` : ""}

---
Enviado via site PetFils
    `.trim();

    return encodeURIComponent(mensagem);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    if (
      !formData.nomeCliente ||
      !formData.nomePet ||
      !formData.tipoPet ||
      !formData.servico ||
      !formData.dataPreferida ||
      !formData.telefone
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setCarregando(true);

    // Simular delay de envio
    setTimeout(() => {
      const mensagem = gerarMensagemWhatsApp();
      const numeroWhatsApp = "5527999999999"; // Número da PetFils
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

      // Abrir WhatsApp em nova aba
      window.open(urlWhatsApp, "_blank");

      setCarregando(false);
      setEnviado(true);

      // Resetar formulário após 3 segundos
      setTimeout(() => {
        setFormData({
          nomeCliente: "",
          nomePet: "",
          tipoPet: "",
          servico: "",
          dataPreferida: "",
          telefone: "",
          mensagemAdicional: "",
        });
        setEnviado(false);
      }, 3000);
    }, 500);
  };

  if (enviado) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Agendamento Enviado! ✅
        </h3>
        <p className="text-gray-600 mb-4">
          Seu agendamento foi enviado para o WhatsApp da PetFils. Em breve
          entraremos em contato para confirmar!
        </p>
        <p className="text-sm text-gray-500">
          Redirecionando para WhatsApp...
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-0 shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        📅 Agende seu Serviço
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção: Dados do Cliente */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-700 text-lg">Seus Dados</h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Seu Nome *
              </label>
              <input
                type="text"
                name="nomeCliente"
                value={formData.nomeCliente}
                onChange={handleChange}
                placeholder="João Silva"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(27) 9 9999-9999"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Seção: Dados do Pet */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-700 text-lg">Dados do seu Pet</h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Pet *
              </label>
              <input
                type="text"
                name="nomePet"
                value={formData.nomePet}
                onChange={handleChange}
                placeholder="Max"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Pet *
              </label>
              <select
                name="tipoPet"
                value={formData.tipoPet}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Selecione um tipo</option>
                {TIPOS_PET.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Seção: Serviço e Data */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-700 text-lg">Serviço Desejado</h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Serviço *
              </label>
              <select
                name="servico"
                value={formData.servico}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Selecione um serviço</option>
                {SERVICOS.map((servico) => (
                  <option key={servico} value={servico}>
                    {servico}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Data Preferida *
              </label>
              <input
                type="date"
                name="dataPreferida"
                value={formData.dataPreferida}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Seção: Mensagem Adicional */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Observações (Opcional)
          </label>
          <textarea
            name="mensagemAdicional"
            value={formData.mensagemAdicional}
            onChange={handleChange}
            placeholder="Ex: Meu pet é agressivo, tem alergia, preferência de horário, etc."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Botão de Envio */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={carregando}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-lg font-bold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {carregando ? (
              <>
                <div className="animate-spin">⏳</div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar para WhatsApp
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          * Campos obrigatórios. Seus dados serão enviados diretamente para o
          WhatsApp da PetFils.
        </p>
      </form>
    </Card>
  );
}
