import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock, Star, Heart, Zap } from "lucide-react";
import { useState } from "react";

/**
 * Design: Warm & Playful
 * - Laranja vibrante (#FF8C42), Coral (#FF6B9D), Amarelo (#FFD93D), Verde menta (#A8E6CF)
 * - Tipografia: Fredoka One (display), Poppins (headings), Inter (body)
 * - Animações: Fade-in suave, hover effects lúdicos, scroll parallax
 */

export default function Home() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
            <h1 className="display-title text-2xl">PetFils</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-gray-700 hover:text-orange-500 transition">
              Serviços
            </a>
            <a href="#produtos" className="text-gray-700 hover:text-orange-500 transition">
              Produtos
            </a>
            <a href="#contato" className="text-gray-700 hover:text-orange-500 transition">
              Contato
            </a>
          </div>
          <a
            href="https://wa.me/5527999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition transform hover:scale-105"
          >
            WhatsApp
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Conteúdo */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="display-title text-4xl md:text-5xl leading-tight">
                Amor, Qualidade e Cuidado para seu Pet
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Bem-vindo à PetFils! Somos um petshop completo em Vitória, ES, dedicado a oferecer os melhores produtos e serviços para seus companheiros de quatro patas.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/5527999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg transform hover:scale-105 transition">
                    Fale Conosco
                  </Button>
                </a>
                <a href="#servicos">
                  <Button variant="outline" className="border-orange-300 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full text-lg">
                    Conheça Nossos Serviços
                  </Button>
                </a>
              </div>
            </div>

            {/* Imagem Hero */}
            <div className="relative h-96 md:h-full animate-fade-in-delayed">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/pKK7exrBSo4CP8m6QGCAkR-img-1_1770594203000_na1fn_aGVyby1iYW5uZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3BLSzdleHJCU280Q1A4bTZRR0NBa1ItaW1nLTFfMTc3MDU5NDIwMzAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gVdOGYLjd6loZXc8Po2d8d3wW~plc6Vto~ruBV5qid7CTUhVa~eBZlgagWjE0i8RmoneX6JwGlW8ECKwfgV7f1vmaZYj3F97GoTGRjeLROeqUPS4hMCh5tj-Wmf8w6ZmKdFf-yIB9zflyQY62IB9U1yGUwL1HlYINCpaH0boTEWNfTfdIDg-hdO5wd9gDvnGdknaedGe6QKom2hj0PRtnb3sxCg3fSgWDX9NTASDu0CvSJjxE8E25hzhSm14RlN-Vl4DsuwHTr8T2EI3GqYZHVzRRHgUCY-EzfX5nwIsVKfUIP~nN~N23Yxmd7NpG5E-BpAHh86HFWSjfuwdiOE4NQ__"
                alt="Cães e gatos felizes"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-gradient-to-r from-orange-50 to-pink-50 py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition p-6 text-center">
              <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Pediu, chegou! A entrega mais rápida do Brasil está aqui.</p>
            </Card>
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition p-6 text-center">
              <Star className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">Produtos das melhores marcas com variedade incomparável.</p>
            </Card>
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition p-6 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cuidado com Amor</h3>
              <p className="text-gray-600">Cada serviço é feito com dedicação e carinho pelo seu pet.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nossos Serviços</h2>
            <p className="text-lg text-gray-600">Cuidado completo para seus companheiros de quatro patas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Imagem Serviços */}
            <div className="flex items-center">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/pKK7exrBSo4CP8m6QGCAkR-img-2_1770594195000_na1fn_c2VydmljZXMtaWxsdXN0cmF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3BLSzdleHJCU280Q1A4bTZRR0NBa1ItaW1nLTJfMTc3MDU5NDE5NTAwMF9uYTFmbl9jMlZ5ZG1salpYTXRhV3hzZFhOMGNtRjBhVzl1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rpGLL8pBgK3tZa3SsxiwWU4YZkSNgTzFneQPtyWPE1Q4gYjYXVT7ryy0Ao8Ccax-KFQSTTb-fDP8QuMq7BoIG2yqgF68zR3ixNYmIu7ngMFHdDqEC77lWJ9vvijeexJA~HD2WNruKRDszBout1R8B9Fa4916IFBgOqn6c6BUGLdHvBllhsSL6zNTFZ8wlFHamG~FMiNtpDPgiJC5tAGVZaJx4bowsO9fCFyOrI0~liABZKxRsJzVnsnZ0fW5BYzJVln8OWJ9OxyvUQx8j6zDrdF0jCiwcgmtFpleIXIY5jN5b~NVsumRLeyTv67AcVpQaDxYbKWz1vCQQs1SZjN6Qg__"
                alt="Serviços de grooming, nutrição, exercício e saúde"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>

            {/* Lista de Serviços */}
            <div className="space-y-4">
              {[
                { name: "Banho e Tosa", desc: "Higiene completa com produtos premium" },
                { name: "Nutrição Balanceada", desc: "Rações das melhores marcas para cada tipo de pet" },
                { name: "Brinquedos e Acessórios", desc: "Diversidade de produtos para lazer e conforto" },
                { name: "Petiscos e Sachês", desc: "Opções saudáveis e saborosas para seus companheiros" },
                { name: "Consulta Veterinária", desc: "Acompanhamento de saúde com profissionais qualificados" },
                { name: "Areias e Higiene", desc: "Produtos de limpeza para ambiente do seu pet" },
              ].map((service, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-r from-orange-50 to-yellow-50 border-0 shadow-sm hover:shadow-md transition cursor-pointer p-4"
                  onClick={() => setActiveService(service.name)}
                >
                  <h3 className="font-bold text-gray-800 text-lg">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Produtos Premium</h2>
            <p className="text-lg text-gray-600">Tudo que seu pet precisa em um só lugar</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Imagem Produtos */}
            <div className="order-2 md:order-1">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/pKK7exrBSo4CP8m6QGCAkR-img-3_1770594198000_na1fn_cHJvZHVjdHMtc2hvd2Nhc2U.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3BLSzdleHJCU280Q1A4bTZRR0NBa1ItaW1nLTNfMTc3MDU5NDE5ODAwMF9uYTFmbl9jSEp2WkhWamRITXRjMmh2ZDJOaGMyVS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=E34beWsqbdQm8uDcRrbyQQ1Zm3zdgOplEM1AAyH4aC~Q246e4O9kDYTJIiTvPjs9CC3HH8dNrVOIfGAwUoVWUlf9C~~Rv5pd7Dd13FSAU7AAlLKTgilXSXAFvB5lQnVQeoBgpXZMubUWqXHKfGsb-ExDIZRfSiyY07hzQsZuUByCUr6wbRX5S-NW3RHbg4kTwAzCQIMf4KEr09KCmq6uSQA75Bc~-UKCXVq7kuaCBvWmAuxef1emLRUa8zwzGV4wP91Akwpn9nMBYMB611VgZwgswrDpxE~ZgCiDD3-ZN903D-rkcTrGAcZXhAsLF9Ifbjmhh85JykpuzseB7A8AMQ__"
                alt="Produtos premium para pets"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>

            {/* Conteúdo Produtos */}
            <div className="order-1 md:order-2 space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Variedade Incomparável</h3>
              <p className="text-gray-600 leading-relaxed">
                Oferecemos uma seleção cuidadosa de produtos das melhores marcas do mercado. Desde rações premium até brinquedos interativos, tudo pensado no bem-estar do seu pet.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-800">Rações Premium</h4>
                    <p className="text-sm text-gray-600">Nutrição balanceada para cada fase de vida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-500 text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-800">Brinquedos Divertidos</h4>
                    <p className="text-sm text-gray-600">Entretenimento e exercício para seu companheiro</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-800">Promoções Frequentes</h4>
                    <p className="text-sm text-gray-600">Descontos exclusivos para nossos clientes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comunidade */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-yellow-50 to-green-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nossa Comunidade</h2>
            <p className="text-lg text-gray-600">Conectando tutores que amam seus pets</p>
          </div>

          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/7XMpXQMZirPzHv4Z0OV8sQ/sandbox/pKK7exrBSo4CP8m6QGCAkR-img-4_1770594196000_na1fn_Y29tbXVuaXR5LXBldHM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvN1hNcFhRTVppclB6SHY0WjBPVjhzUS9zYW5kYm94L3BLSzdleHJCU280Q1A4bTZRR0NBa1ItaW1nLTRfMTc3MDU5NDE5NjAwMF9uYTFmbl9ZMjl0YlhWdWFYUjVMWEJsZEhNLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tU~z-xRQmQmSJrz0xwwPGjD4TkjBKImQaGtrJLXeHAmvyZquK45SUwvYkSnghnAkbBdb~Z2mz--xMynPjGteAWC45gVi5p6ZWNyn8jSYXKNboM-GtaQxeISrkA~PH7VxntlXZtTQ1Tx~Ireto~hSIzKF5fzBBlxnStqLlX0oe4rJ5Um1sZZpym5RnI5tKrpy90I0mlPLXAp4K6JHhXdmKRHdG8GWHD993anvH-z5pk~aIdezftn1ahGc6kN8ukqs3Yzga0u00onuD9ulA-Yk-SrIsIF1rxdh4M7NKoFObfcCceDge-vgtHALLE31CCunyhZzrqCd2skSnOgOmb4LPA__"
            alt="Comunidade de tutores e pets"
            className="w-full rounded-2xl shadow-lg max-w-2xl mx-auto"
          />

          <div className="text-center mt-8">
            <p className="text-lg text-gray-600 mb-6">
              Siga-nos no Instagram e compartilhe a história do seu pet com nossa comunidade!
            </p>
            <a
              href="https://www.instagram.com/petfils/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105"
            >
              @petfils no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Entre em Contato</h2>
            <p className="text-lg text-gray-600">Estamos prontos para atender você e seu pet</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Localização */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-md p-8 text-center">
              <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Localização</h3>
              <p className="text-gray-600">
                Rodovia Serafim Derenzi, 349
                <br />
                Santo Antônio, Vitória - ES
              </p>
            </Card>

            {/* Telefone/WhatsApp */}
            <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-0 shadow-md p-8 text-center">
              <Phone className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/5527999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 font-bold"
              >
                (27) 9 9999-9999
              </a>
              <p className="text-gray-600 text-sm mt-2">Clique para conversar conosco</p>
            </Card>

            {/* Horário */}
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-md p-8 text-center">
              <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Horário</h3>
              <p className="text-gray-600">
                Seg - Sex: 9h às 18h
                <br />
                Sab: 9h às 14h
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container text-center">
          <p className="mb-2">
            <span className="display-title text-2xl">PetFils</span> - Amor, qualidade e cuidado para os seus pets
          </p>
          <p className="text-gray-400 text-sm">
            © 2026 PetFils. Todos os direitos reservados. | Vitória - ES
          </p>
        </div>
      </footer>

      {/* CSS para animações */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }

        /* Hover effects */
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
