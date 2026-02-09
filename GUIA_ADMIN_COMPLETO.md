# 🎯 Guia Completo: Como Editar Arquivos e Acessar o Admin

## 📋 Índice
1. [Como Acessar o Sistema de Admin](#como-acessar-o-sistema-de-admin)
2. [Como Editar Textos e Conteúdo](#como-editar-textos-e-conteúdo)
3. [Como Editar Cores e Design](#como-editar-cores-e-design)
4. [Como Editar Imagens](#como-editar-imagens)
5. [Como Editar Serviços e Preços](#como-editar-serviços-e-preços)
6. [Como Editar Contatos e Redes Sociais](#como-editar-contatos-e-redes-sociais)
7. [Acessar o Dashboard de Admin](#acessar-o-dashboard-de-admin)

---

## 🔐 Como Acessar o Sistema de Admin

### Passo 1: Fazer Login
1. Acesse seu site em: `https://seu-dominio.com`
2. Clique no ícone de **perfil** no canto superior direito (ou procure por um botão de login)
3. Você será redirecionado para a página de login
4. Faça login com sua conta Manus (a mesma que você usa para acessar o painel de controle)

### Passo 2: Acessar o Dashboard
Após fazer login, você verá um menu lateral com as seguintes opções:
- **Dashboard** - Visualizar estatísticas de agendamentos e receita
- **Estoque** - Gerenciar produtos e alertas de reposição
- **Relatórios** - Ver gráficos de vendas e produtos mais vendidos

### Passo 3: Navegar pelo Admin
```
URL do Dashboard:    https://seu-dominio.com/dashboard
URL do Estoque:      https://seu-dominio.com/estoque
URL de Relatórios:   https://seu-dominio.com/relatorios
```

---

## ✏️ Como Editar Textos e Conteúdo

### Editar Título da Página Home
**Arquivo:** `client/src/pages/Home.tsx`

Procure por esta linha (aproximadamente linha 60):
```jsx
<h1 className="display-title text-3xl sm:text-4xl md:text-5xl leading-tight">
  Amor, Qualidade e Cuidado para seu Pet
</h1>
```

**Para editar:** Substitua o texto `"Amor, Qualidade e Cuidado para seu Pet"` pelo seu novo título.

### Editar Descrição da Página Home
Procure por esta linha (aproximadamente linha 64):
```jsx
<p className="text-base sm:text-lg text-gray-600 leading-relaxed">
  Bem-vindo à PetFils! Somos um petshop completo em Vitória, ES, dedicado a oferecer os melhores produtos e serviços para seus companheiros de quatro patas.
</p>
```

**Para editar:** Substitua o texto pela sua descrição.

### Editar Nome do PetShop
Procure por `"PetFils"` no arquivo e substitua por seu nome. Principais locais:
- Linha 29: Logo/Nome na navegação
- Linha 360: Nome no footer

### Editar Endereço
Procure por esta seção (aproximadamente linha 320):
```jsx
<p className="text-sm sm:text-base text-gray-600">
  Rodovia Serafim Derenzi, 349
  <br />
  Santo Antônio, Vitória - ES
</p>
```

**Para editar:** Substitua pelo seu endereço real.

### Editar Telefone/WhatsApp
Procure por `"5527999999999"` e substitua pelo seu número. Locais principais:
- Linha 50: Botão WhatsApp no header
- Linha 75: Link WhatsApp no menu mobile
- Linha 91: Botão "Fale Conosco"
- Linha 330: Seção de contato

**Formato correto:** `55` + DDD (2 dígitos) + número (9 dígitos)
Exemplo: `5527998765432`

### Editar Horário de Funcionamento
Procure por esta seção (aproximadamente linha 345):
```jsx
<p className="text-sm sm:text-base text-gray-600">
  Seg - Sex: 9h às 18h
  <br />
  Sab: 9h às 14h
</p>
```

**Para editar:** Substitua pelos horários do seu petshop.

### Editar Link do Instagram
Procure por `"https://www.instagram.com/petfils/"` (aproximadamente linha 295) e substitua pelo seu perfil.

---

## 🎨 Como Editar Cores e Design

### Editar Cores Principais
**Arquivo:** `client/src/index.css`

As cores principais estão definidas como variáveis CSS. Procure por:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.6%;
    --primary: 34 100% 55%;  /* Laranja */
    --secondary: 0 84% 60%;  /* Rosa/Coral */
    --accent: 45 100% 55%;   /* Amarelo */
  }
}
```

**Para editar:**
- **Laranja vibrante:** Procure por `--primary` e altere o valor
- **Rosa/Coral:** Procure por `--secondary` e altere o valor
- **Amarelo:** Procure por `--accent` e altere o valor

### Entender o Formato de Cores
As cores usam o formato HSL:
- `34 100% 55%` = Matiz 34°, Saturação 100%, Luminosidade 55%

**Valores de referência:**
- Laranja: `34 100% 55%`
- Rosa: `0 84% 60%`
- Amarelo: `45 100% 55%`
- Verde: `150 60% 60%`
- Azul: `210 100% 50%`

### Editar Tipografia
Procure por `@import` no início do `index.css` para ver as fontes importadas do Google Fonts.

**Fontes atuais:**
- Fredoka One - Para títulos grandes
- Poppins - Para headings
- Inter - Para corpo do texto

Para mudar, altere os links do Google Fonts.

---

## 🖼️ Como Editar Imagens

### Localização das Imagens
As imagens estão hospedadas em URLs externas (CDN). Para editar:

1. **Imagem Hero (Cães e Gatos):** Procure por `"hero-banner"` no código
2. **Imagem de Serviços:** Procure por `"services-illustration"`
3. **Imagem de Produtos:** Procure por `"products-showcase"`
4. **Imagem de Comunidade:** Procure por `"community-pets"`

### Como Substituir uma Imagem

**Opção 1: Usar a Mesma URL (Mais Fácil)**
Se você tiver uma imagem hospedada online, copie a URL e substitua no código.

**Opção 2: Fazer Upload para S3 (Recomendado)**
1. Prepare sua imagem (recomendado: 1920x1920px)
2. Use a ferramenta `manus-upload-file` para fazer upload
3. Copie a URL retornada
4. Cole a URL no código

**Exemplo de substituição:**
```jsx
// ANTES
<img src="https://old-url.com/image.png" alt="Descrição" />

// DEPOIS
<img src="https://new-url.com/image.png" alt="Descrição" />
```

---

## 💰 Como Editar Serviços e Preços

### Editar Lista de Serviços na Home
**Arquivo:** `client/src/pages/Home.tsx`

Procure por esta seção (aproximadamente linha 145):
```jsx
{[
  { name: "Banho e Tosa", desc: "Higiene completa com produtos premium" },
  { name: "Nutrição Balanceada", desc: "Rações das melhores marcas para cada tipo de pet" },
  // ... mais serviços
].map((service, idx) => (
```

**Para adicionar um novo serviço:**
```jsx
{ name: "Seu Novo Serviço", desc: "Descrição do serviço" },
```

### Adicionar Preços dos Serviços
Para adicionar preços, edite o objeto de cada serviço:
```jsx
{ 
  name: "Banho e Tosa", 
  desc: "Higiene completa com produtos premium",
  preco: "R$ 80,00"
},
```

Depois, no template, adicione:
```jsx
{preco && <p className="text-orange-500 font-bold">{preco}</p>}
```

---

## 📞 Como Editar Contatos e Redes Sociais

### Editar Link do WhatsApp
Substitua `5527999999999` por seu número em todos os locais:
- Header
- Menu mobile
- Botões de ação
- Seção de contato

**Formato:** `55` + DDD + número (sem caracteres especiais)

### Editar Link do Instagram
Procure por `"https://www.instagram.com/petfils/"` e substitua pelo seu perfil.

### Adicionar Outras Redes Sociais
Para adicionar Facebook, TikTok, etc., adicione novos links na seção de contato:
```jsx
<a href="https://facebook.com/seu-pagina" target="_blank">
  <Facebook className="w-6 h-6" />
</a>
```

---

## 📊 Acessar o Dashboard de Admin

### Dashboard - Visualizar Estatísticas
**URL:** `https://seu-dominio.com/dashboard`

**O que você verá:**
- Total de agendamentos
- Receita total
- Taxa de conclusão
- Clientes mais frequentes
- Gráficos de receita por serviço
- Tabela de agendamentos recentes

### Estoque - Gerenciar Produtos
**URL:** `https://seu-dominio.com/estoque`

**O que você pode fazer:**
- Adicionar novos produtos
- Editar quantidade em estoque
- Receber alertas quando estoque está baixo
- Ver valor total do estoque
- Histórico de movimentações

### Relatórios - Análises de Vendas
**URL:** `https://seu-dominio.com/relatorios`

**O que você verá:**
- Gráfico de vendas por período
- Produtos mais vendidos
- Receita por período
- Receita por categoria
- Estatísticas gerais (ticket médio, vendas/dia)
- Tabela detalhada de produtos

---

## 🔧 Passos para Editar e Salvar

### 1. Fazer Alterações Locais (Se você tiver o código)
```bash
# Abra o arquivo em um editor de texto
# Faça suas alterações
# Salve o arquivo (Ctrl+S ou Cmd+S)
```

### 2. Fazer Upload das Alterações
```bash
# Se você estiver usando Git:
git add .
git commit -m "Descrição das alterações"
git push origin main

# Se você estiver usando o painel Manus:
# 1. Vá para o painel de controle
# 2. Clique em "Publish"
# 3. Suas alterações serão publicadas
```

### 3. Verificar as Alterações
- Acesse seu site
- Limpe o cache do navegador (Ctrl+F5)
- Verifique se as alterações aparecem

---

## ⚠️ Dicas Importantes

### Backup Antes de Editar
Sempre faça backup dos arquivos antes de fazer grandes alterações.

### Não Altere Estes Arquivos
- `server/_core/*` - Arquivos de sistema
- `drizzle/*` - Configurações de banco de dados
- `package.json` - Dependências do projeto

### Testar Antes de Publicar
Sempre teste as alterações localmente antes de publicar.

### Suporte
Se tiver dúvidas sobre como editar algo específico, consulte o arquivo `README.md` no projeto ou entre em contato com o suporte.

---

## 📝 Checklist de Edição

- [ ] Editar nome do petshop
- [ ] Editar endereço
- [ ] Editar telefone/WhatsApp
- [ ] Editar horário de funcionamento
- [ ] Editar descrição da página home
- [ ] Editar lista de serviços
- [ ] Editar cores (opcional)
- [ ] Editar imagens (opcional)
- [ ] Editar links de redes sociais
- [ ] Testar em desktop e mobile
- [ ] Publicar alterações

---

**Pronto! Você agora sabe como editar o site e acessar o sistema de admin! 🎉**
