import { Card } from "@/components/ui/card";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Design: Warm & Playful
 * Componente de galeria com imagens de antes e depois dos serviços
 */

interface GaleriaItem {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  servico: string;
}

const GALERIA_ITEMS: GaleriaItem[] = [
  {
    id: 1,
    titulo: "Golden Retriever - Banho e Tosa",
    descricao: "Transformação completa com banho, tosa e hidratação",
    imagem: "https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/x7UGM2s19vuNE40ezlvUbe-img-1_1770594591000_na1fn_YmVmb3JlLWFmdGVyLTE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3g3VUdNMnMxOXZ1TkU0MGV6bHZVYmUtaW1nLTFfMTc3MDU5NDU5MTAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRFLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=O6W~qQWD6spHBAaGoJ~PUFKwM5ygrreVPxnWKk6vVsr0~bZmlwF180OMjtM2~4ziAPmEML55xNkpzSodgXpWdK1by2CuT92zflo3shSrKt1WapdEF7La2T3KKZkxWlG4-lSQXpUQoj3G1WdAWPBGI6Sja-reZz1Y-TyA0R-Kqu-V9klLaZYadyG53BBG~K4FKMw-KlNn2xiRQt8qruxVYAliIqIMwTedeiC-r2IKTIkEGJAz49Y94f6MpXlukNxCZvVebRDX7foqd4CdpG1K6NnVJ6PRhAvEe5uSDLOoVceYtuGPCj5Pv4SsY-PnieXBi-eAbNZOwILE2wLC2DSeow__",
    servico: "Banho e Tosa",
  },
  {
    id: 2,
    titulo: "Gato Tabby - Tosa Higiênica",
    descricao: "Remoção de nós e tosa de manutenção com cuidado especial",
    imagem: "https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/x7UGM2s19vuNE40ezlvUbe-img-2_1770594591000_na1fn_YmVmb3JlLWFmdGVyLTI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3g3VUdNMnMxOXZ1TkU0MGV6bHZVYmUtaW1nLTJfMTc3MDU5NDU5MTAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRJLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jVbTHGNA3GvUP4QFXs2oAI78PcjTw6DR1mr9RcZwf65DMuJ1f6gAHo9JvCq8GBVZ9is9qHr6VHQigxwrkauvweZnPLiOfmWL2c~mj8XIgDHeTO7-UxQf7FamN5ICLd9mYlGxxnh1F-wi2~EdZddHWIkrcpfxjqbEwumuMDgNLe2FCK29OlPcfrylQ7WPhKXTPeJb~lsgrDXtA5vvNLrd6hnQUBevLXJThrx4WsWsM4XOimombZ0C-JxpRegd8jEtBQuCku0ZBeiTZYBv~HgMdJv8CfsmG624hk10dz23ZY~l6vervM31Q26eicqfRg603X807M7RDkk-NTkyoAVfQw__",
    servico: "Tosa Higiênica",
  },
  {
    id: 3,
    titulo: "Poodle - Tosa Completa",
    descricao: "Tosa artística completa com hidratação profunda",
    imagem: "https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/x7UGM2s19vuNE40ezlvUbe-img-3_1770594591000_na1fn_YmVmb3JlLWFmdGVyLTM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3g3VUdNMnMxOXZ1TkU0MGV6bHZVYmUtaW1nLTNfMTc3MDU5NDU5MTAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRNLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Mw-zV1AXM99nO0OIXl4ni65pDj-DzklmthraDTT7jatkMoK3btcpOxS97NwYeWi8f8CpfkGQtMb9gFdr5VAxGzBlyspBp1E6PLw1kaNJPOOvNbxHamwXiYy7wn7U6yzLVZqw2eN8Nn8VWgAcl3G0w3c-~~AzyRJ6m1vPvKBrIXGEWHdKT0-PC43oKMdHIM3u17bCB0itv2fFzjfvIiD9nT9ts~SWwXf4bdPuu~J2-njlBoRpTzpPh8dKgQBYk6MMlzvTob2Uy6oor52LASZqssEG7vOi2762SIaWPpndj4oHdW4Ul0kmUVfj~04rfDeRvMdA9sosVt1zw~H7BqJNvA__",
    servico: "Tosa Completa",
  },
  {
    id: 4,
    titulo: "Labrador - Banho e Cuidados",
    descricao: "Banho com produtos premium e cuidados especiais com pele",
    imagem: "https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/x7UGM2s19vuNE40ezlvUbe-img-4_1770594592000_na1fn_YmVmb3JlLWFmdGVyLTQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3g3VUdNMnMxOXZ1TkU0MGV6bHZVYmUtaW1nLTRfMTc3MDU5NDU5MjAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=a7VSBLLb0g82Ay1tV05zNwV3oIZtY2EFPY77yBcgCf0qd07uE4oWYchK5o6FOPLoZ3-jqiE3aufMGY7pozxCplLrjG9mHaXHbVCIW1HhD1gdvbnCr251zIIOXQmk8QTorJFkHn6K87GRIK8jRIVt-ZYkfDArmDjj6elmmwTUhA5h4jSJ61z-VFb9LLKBHqndWbQD~kPKEibO67mVUxJTjqQa2PtlsWOomXEfOwAnEvIHCy30T60mz63obuAvhNnr8V4WWj7r3ZgDnaY6gwEAPV4WHqbwJPAijv9t4Py18L1qxdekd~Xqdbk1utazIL~Vr1jEgbYINQ3zsmCKuotRVw__",
    servico: "Banho e Cuidados",
  },
  {
    id: 5,
    titulo: "Gato Branco - Banho e Grooming",
    descricao: "Banho relaxante com secagem profissional e grooming",
    imagem: "https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/x7UGM2s19vuNE40ezlvUbe-img-5_1770594591000_na1fn_YmVmb3JlLWFmdGVyLTU.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3g3VUdNMnMxOXZ1TkU0MGV6bHZVYmUtaW1nLTVfMTc3MDU5NDU5MTAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRVLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KD7Bs0GT4Ydwud8ObNX11epeRpFmXBeai0plSOVu-nXnO6pQcT0QPPlf-~cl890JqD9kktPfk27zt1Gv3bW7JHMB-1ifpyQycWnBDLRcImOpVD9Xgspa86QsUIxe0PyAzDJFumCpSOfCbFlLq~O7-Gb5-GUAPROSX1OpoNTuQZ3CtcX25Tso6mb8I-JLEsU8rI23cBPwlYvOI7O9~uVjgZ7AE9lcENyp2nvefZc~MQnjeWC3qkNntBExuFsH6GdRgDrhuksiFvGJKJgA2iUUQ6jsvTEkX4kC~biZEDhW8bRKLB800Ol1FRhvWYLVsX4D2EXmp25DoaKLSTq8GjnuDQ__",
    servico: "Banho e Grooming",
  },
];

export default function GaleriaAntesDepois() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? GALERIA_ITEMS.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === GALERIA_ITEMS.length - 1 ? 0 : ((prev ?? 0) + 1) % GALERIA_ITEMS.length
      );
    }
  };

  const selectedItem =
    selectedIndex !== null ? GALERIA_ITEMS[selectedIndex] : null;

  return (
    <>
      {/* Grid de Galeria */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALERIA_ITEMS.map((item, index) => (
          <Card
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105 border-0"
          >
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img
                src={item.imagem}
                alt={item.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{item.titulo}</h3>
                  <p className="text-sm text-orange-300">{item.servico}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2">{item.titulo}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.descricao}</p>
              <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                {item.servico}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Visualização Completa */}
      {selectedItem !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{selectedItem.titulo}</h2>
                <p className="text-orange-100 mt-1">{selectedItem.descricao}</p>
              </div>
              <button
                onClick={() => setSelectedIndex(null)}
                className="hover:bg-white/20 p-2 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <div className="mb-6">
                <img
                  src={selectedItem.imagem}
                  alt={selectedItem.titulo}
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Serviço</h3>
                  <p className="text-gray-600">{selectedItem.servico}</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Resultado</h3>
                  <p className="text-gray-600">Transformação completa com qualidade premium</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Detalhes</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>✓ Produtos premium de alta qualidade</li>
                  <li>✓ Profissionais experientes e dedicados</li>
                  <li>✓ Cuidado com amor e paciência</li>
                  <li>✓ Resultado que faz a diferença</li>
                </ul>
              </div>

              {/* Navegação */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition transform hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    {(selectedIndex ?? 0) + 1} de {GALERIA_ITEMS.length}
                  </p>
                  <div className="flex gap-2 mt-2 justify-center">
                    {GALERIA_ITEMS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`w-2 h-2 rounded-full transition ${
                          idx === selectedIndex
                            ? "bg-orange-500 w-6"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition transform hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 p-6 border-t flex gap-4">
              <button
                onClick={() => setSelectedIndex(null)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-bold transition"
              >
                Fechar
              </button>
              <a
                href="#agendamento"
                onClick={() => setSelectedIndex(null)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-lg font-bold transition text-center"
              >
                Agendar Serviço
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
