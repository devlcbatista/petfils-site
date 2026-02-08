# 🐾 Guia Completo - Site PetFils

## 📋 Índice
1. [Acesso ao Site](#acesso-ao-site)
2. [Como Editar o Site](#como-editar-o-site)
3. [Personalizações Importantes](#personalizações-importantes)
4. [Como Publicar](#como-publicar)
5. [Suporte e Dúvidas](#suporte-e-dúvidas)

---

## 🌐 Acesso ao Site

### Versão de Desenvolvimento
- **URL:** https://3000-if2e78mzz1yrl0wo9hnme-99178f0b.us2.manus.computer
- **Uso:** Para testes e edições antes de publicar
- **Acesso:** Automático quando você faz login na plataforma Manus

### Versão Publicada
- **URL:** Será gerada após publicar (seu domínio personalizado)
- **Uso:** Versão pública para seus clientes
- **Acesso:** Qualquer pessoa pode acessar

---

## ✏️ Como Editar o Site

### 1. Editar Textos e Conteúdo

#### Localização do arquivo principal:
```
/home/ubuntu/petfils-site/client/src/pages/Home.tsx
```

#### Principais seções para editar:

**Hero Section (Título Principal)**
```
Procure por: "Amor, Qualidade e Cuidado para seu Pet"
Altere para o seu texto desejado
```

**Descrição da Loja**
```
Procure por: "Bem-vindo à PetFils! Somos um petshop completo..."
Altere para sua descrição
```

**Serviços**
```
Procure por: SERVICOS = [...]
Adicione ou remova serviços conforme necessário
```

**Informações de Contato**
```
Procure por: "Rodovia Serafim Derenzi, 349"
Altere para seu endereço
```

### 2. Editar Número do WhatsApp

**Importante:** O número do WhatsApp está em vários lugares. Procure por:
- `5527999999999` - Número padrão
- Substitua por seu número com código de país (ex: 5527988776655)

**Locais para alterar:**
1. `client/src/pages/Home.tsx` - Múltiplas ocorrências
2. `client/src/components/AgendamentoForm.tsx` - Número do WhatsApp

### 3. Editar Cores e Design

**Arquivo de cores:**
```
/home/ubuntu/petfils-site/client/src/index.css
```

**Cores atuais (Warm & Playful):**
- Laranja vibrante: `#FF8C42`
- Coral suave: `#FF6B9D`
- Amarelo quente: `#FFD93D`
- Verde menta: `#A8E6CF`
- Branco/Cinza: `#FFFFFF` / `#F5F5F5`

**Para alterar cores:**
1. Abra o arquivo `index.css`
2. Procure por `:root {`
3. Altere os valores HEX das cores
4. Salve e veja as mudanças em tempo real

### 4. Editar Imagens

**Imagens atuais:**
- Hero banner: Cães e gatos felizes
- Serviços: Ilustração 4 quadrantes (grooming, nutrição, exercício, saúde)
- Produtos: Showcase de produtos premium
- Comunidade: Ilustração de tutores e pets
- Galeria: 5 imagens de antes e depois

**Para alterar imagens:**
1. Acesse a seção de Management UI (painel de controle)
2. Clique em "Code" para ver a estrutura
3. Localize as URLs das imagens nos componentes
4. Substitua pelas suas URLs

---

## 🎨 Personalizações Importantes

### 1. Alterar Logo
```
No header, procure por: <span className="text-white font-bold text-lg">🐾</span>
Substitua o emoji 🐾 por sua logo ou texto
```

### 2. Alterar Título da Página
```
Arquivo: client/index.html
Procure por: <title>PetFils - Amor e Cuidado para seu Pet</title>
Altere para o nome do seu petshop
```

### 3. Adicionar Mais Serviços
```
Arquivo: client/src/components/AgendamentoForm.tsx
Procure por: const SERVICOS = [...]
Adicione novos serviços à lista
```

### 4. Adicionar Mais Imagens na Galeria
```
Arquivo: client/src/components/GaleriaAntesDepois.tsx
Procure por: const GALERIA_ITEMS: GaleriaItem[] = [...]
Adicione novos objetos com id, titulo, descricao, imagem, servico
```

---

## 📤 Como Publicar

### Passo 1: Fazer Checkpoint (Salvar Versão)
1. No painel Manus, clique em "Save Checkpoint"
2. Descreva as mudanças realizadas
3. Aguarde a confirmação

### Passo 2: Publicar o Site
1. Clique no botão "Publish" no painel superior
2. Escolha seu domínio (pode ser personalizado)
3. Confirme a publicação
4. Aguarde 2-5 minutos para o site ficar online

### Passo 3: Acessar o Site Publicado
1. Seu site estará disponível em: `seu-dominio.manus.space`
2. Ou em seu domínio personalizado se configurado
3. Compartilhe o link com seus clientes

---

## 🔧 Edições Avançadas

### Adicionar Nova Seção
1. Abra `client/src/pages/Home.tsx`
2. Crie um novo `<section>` com id único
3. Adicione o link na navegação (header)
4. Estilize com classes Tailwind CSS

### Alterar Tipografia
```
Arquivo: client/src/index.css
Fonts usadas:
- Fredoka One: Títulos grandes (display)
- Poppins: Títulos e headings
- Inter: Corpo do texto

Para alterar, modifique o import no client/index.html
```

### Adicionar Animações
Use as classes Tailwind CSS pré-configuradas:
- `animate-fade-in`: Fade in suave
- `hover:scale-105`: Escala ao passar mouse
- `transition`: Transição suave

---

## 📞 Suporte e Dúvidas

### Informações do Projeto
- **Nome:** PetFils - Amor e Cuidado para seu Pet
- **Tipo:** Website estático (React + Tailwind)
- **Hospedagem:** Manus
- **Versão Atual:** 9459ea36

### Arquivos Principais
```
/home/ubuntu/petfils-site/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx (PÁGINA PRINCIPAL)
│   │   ├── components/
│   │   │   ├── AgendamentoForm.tsx (FORMULÁRIO)
│   │   │   └── GaleriaAntesDepois.tsx (GALERIA)
│   │   └── index.css (CORES E ESTILOS)
│   └── index.html (CONFIGURAÇÃO HTML)
└── package.json (DEPENDÊNCIAS)
```

### Funcionalidades Principais
✅ Hero section com imagem
✅ Seção de serviços
✅ Showcase de produtos
✅ Galeria de antes e depois (5 imagens)
✅ Formulário de agendamento com WhatsApp
✅ Seção de comunidade
✅ Informações de contato
✅ Design responsivo (mobile, tablet, desktop)
✅ Animações suaves
✅ Paleta Warm & Playful

### Próximas Melhorias (Opcional)
- [ ] Adicionar depoimentos de clientes
- [ ] Criar seção de FAQ
- [ ] Adicionar blog de dicas
- [ ] Integrar Google Maps
- [ ] Adicionar sistema de avaliações
- [ ] Criar página de política de privacidade

---

## 💡 Dicas Importantes

1. **Sempre faça backup:** Antes de grandes alterações, salve um checkpoint
2. **Teste as mudanças:** Visualize no modo desenvolvimento antes de publicar
3. **Número do WhatsApp:** Certifique-se de usar o formato correto (código país + número)
4. **Imagens:** Use URLs completas (https://) para melhor compatibilidade
5. **Mobile First:** Sempre teste em celular antes de publicar

---

## 🚀 Começar a Editar

1. Acesse o painel Manus
2. Clique em "Preview" para ver o site
3. Clique em "Code" para editar arquivos
4. Faça suas alterações
5. Salve com Checkpoint
6. Publique com o botão Publish

**Seu site está pronto para vender! Boa sorte com a PetFils! 🐾**
