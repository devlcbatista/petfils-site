# 🚀 Como Colocar o Site Online - Guia Completo

## 📋 Índice
1. [Opção 1: Vercel (Recomendado - Grátis)](#opção-1-vercel-recomendado---grátis)
2. [Opção 2: Netlify (Grátis)](#opção-2-netlify-grátis)
3. [Opção 3: GitHub Pages (Grátis)](#opção-3-github-pages-grátis)
4. [Opção 4: Hostinger (Pago - Mais Controle)](#opção-4-hostinger-pago---mais-controle)
5. [Opção 5: Manus (Recomendado - Já Configurado)](#opção-5-manus-recomendado---já-configurado)
6. [Arquivos Necessários](#arquivos-necessários)
7. [Domínio Personalizado](#domínio-personalizado)

---

## ✨ OPÇÃO 1: VERCEL (Recomendado - Grátis)

### Por que escolher Vercel?
- ✅ Grátis para sempre
- ✅ Deploy automático
- ✅ Domínio grátis incluído
- ✅ Suporta React perfeitamente
- ✅ Velocidade excelente
- ✅ SSL automático

### Passo a Passo:

#### 1. Preparar os Arquivos
```bash
# Crie uma pasta com os arquivos do projeto
mkdir petfils-site
cd petfils-site

# Copie todos os arquivos do projeto para esta pasta
# Você precisa de:
# - client/ (pasta completa)
# - package.json
# - vite.config.ts
# - tsconfig.json
# - .gitignore (criar se não existir)
```

#### 2. Criar .gitignore
```bash
# Crie arquivo .gitignore na raiz do projeto
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
EOF
```

#### 3. Inicializar Git
```bash
git init
git add .
git commit -m "Initial commit - PetFils website"
```

#### 4. Enviar para GitHub
```bash
# 1. Vá para github.com e crie uma nova conta (se não tiver)
# 2. Crie um novo repositório chamado "petfils-site"
# 3. Execute os comandos:

git remote add origin https://github.com/SEU_USUARIO/petfils-site.git
git branch -M main
git push -u origin main
```

#### 5. Fazer Deploy no Vercel
```bash
# 1. Vá para vercel.com
# 2. Clique em "Sign Up" e escolha "Continue with GitHub"
# 3. Autorize o Vercel
# 4. Clique em "New Project"
# 5. Selecione o repositório "petfils-site"
# 6. Clique em "Import"
# 7. Configure:
#    - Framework: Vite
#    - Root Directory: ./
#    - Build Command: npm run build
#    - Output Directory: dist/public
# 8. Clique em "Deploy"
```

#### 6. Seu site estará online em:
```
https://petfils-site.vercel.app
```

---

## 🎨 OPÇÃO 2: NETLIFY (Grátis)

### Passo a Passo:

#### 1. Preparar Arquivos (igual ao Vercel)
```bash
# Siga os passos 1-4 da Opção 1 (Vercel)
```

#### 2. Fazer Deploy no Netlify
```bash
# 1. Vá para netlify.com
# 2. Clique em "Sign up" e escolha "GitHub"
# 3. Autorize o Netlify
# 4. Clique em "New site from Git"
# 5. Selecione GitHub e o repositório "petfils-site"
# 6. Configure:
#    - Build command: npm run build
#    - Publish directory: dist/public
# 7. Clique em "Deploy site"
```

#### 3. Seu site estará online em:
```
https://petfils-site.netlify.app
```

---

## 📚 OPÇÃO 3: GITHUB PAGES (Grátis)

### Passo a Passo:

#### 1. Modificar vite.config.ts
```typescript
// Abra vite.config.ts e adicione:
export default defineConfig({
  base: '/petfils-site/', // Adicione esta linha
  plugins: [react()],
})
```

#### 2. Fazer Build
```bash
npm run build
```

#### 3. Enviar para GitHub
```bash
git add .
git commit -m "Configure for GitHub Pages"
git push origin main
```

#### 4. Ativar GitHub Pages
```bash
# 1. Vá para github.com/SEU_USUARIO/petfils-site
# 2. Clique em "Settings"
# 3. Vá para "Pages"
# 4. Em "Source", selecione "Deploy from a branch"
# 5. Selecione branch "main" e pasta "dist/public"
# 6. Clique em "Save"
```

#### 5. Seu site estará online em:
```
https://SEU_USUARIO.github.io/petfils-site
```

---

## 💻 OPÇÃO 4: HOSTINGER (Pago - Mais Controle)

### Por que escolher Hostinger?
- ✅ Domínio próprio incluído
- ✅ Suporte 24/7
- ✅ Controle total
- ✅ Preço acessível (~R$ 30-50/mês)

### Passo a Passo:

#### 1. Comprar Hosting
```bash
# 1. Vá para hostinger.com.br
# 2. Escolha um plano (recomendo Premium)
# 3. Escolha seu domínio (ex: petfils.com.br)
# 4. Complete a compra
```

#### 2. Fazer Build Local
```bash
npm run build
```

#### 3. Acessar cPanel
```bash
# 1. Vá para seu painel Hostinger
# 2. Clique em "cPanel"
# 3. Procure por "File Manager"
```

#### 4. Fazer Upload dos Arquivos
```bash
# 1. Abra File Manager
# 2. Vá para pasta "public_html"
# 3. Delete tudo que está lá
# 4. Faça upload de todos os arquivos da pasta "dist/public"
# 5. Aguarde o upload completar
```

#### 5. Seu site estará online em:
```
https://petfils.com.br (ou seu domínio)
```

---

## 🌟 OPÇÃO 5: MANUS (Recomendado - Já Configurado)

### Por que escolher Manus?
- ✅ Já está tudo configurado
- ✅ Deploy com 1 clique
- ✅ Domínio grátis incluído
- ✅ Suporte excelente
- ✅ Otimizado para React

### Passo a Passo:

#### 1. Acessar Painel Manus
```bash
# 1. Vá para seu painel Manus
# 2. Selecione o projeto "petfils-site"
# 3. Clique em "Publish" (botão no topo)
```

#### 2. Escolher Domínio
```bash
# Opção 1: Usar domínio Manus grátis
# - petfils.manus.space

# Opção 2: Usar domínio personalizado
# - Compre em registradora (ex: namecheap.com, registro.br)
# - Configure os DNS no painel Manus
```

#### 3. Publicar
```bash
# 1. Clique em "Publish"
# 2. Aguarde 2-5 minutos
# 3. Seu site estará online!
```

#### 4. Seu site estará online em:
```
https://petfils.manus.space
ou
https://seu-dominio.com.br (se personalizado)
```

---

## 📦 Arquivos Necessários

Para fazer deploy em qualquer plataforma, você precisa de:

```
petfils-site/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── AgendamentoForm.tsx
│   │   │   ├── GaleriaAntesDepois.tsx
│   │   │   └── ui/ (pasta completa)
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── index.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── public/ (se houver)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── GUIA_COMPLETO.md
├── PUBLICAR_AGORA.md
└── DADOS_PARA_EDITAR.md
```

---

## 🌐 Domínio Personalizado

### Comprar Domínio
```bash
# Opções recomendadas:
1. Namecheap.com - Barato e confiável
2. Registro.br - Domínios .br brasileiros
3. GoDaddy.com - Mais caro mas popular
4. Hostinger - Incluso no hosting
```

### Configurar Domínio

#### Para Vercel:
```bash
# 1. Vá para seu painel Vercel
# 2. Clique em "Settings" > "Domains"
# 3. Adicione seu domínio
# 4. Siga as instruções para configurar DNS
# 5. Aguarde 24-48 horas para propagar
```

#### Para Netlify:
```bash
# 1. Vá para seu painel Netlify
# 2. Clique em "Domain settings"
# 3. Clique em "Add custom domain"
# 4. Digite seu domínio
# 5. Configure DNS conforme instruções
# 6. Aguarde 24-48 horas
```

#### Para Hostinger:
```bash
# 1. Já vem incluído no pacote
# 2. Domínio é configurado automaticamente
```

#### Para Manus:
```bash
# 1. Vá para Settings > Domains
# 2. Clique em "Add Domain"
# 3. Escolha seu domínio
# 4. Configure DNS
# 5. Aguarde propagação
```

---

## 📊 Comparação de Plataformas

| Plataforma | Preço | Facilidade | Velocidade | Suporte |
|-----------|-------|-----------|-----------|---------|
| Vercel | Grátis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Bom |
| Netlify | Grátis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Bom |
| GitHub Pages | Grátis | ⭐⭐⭐ | ⭐⭐⭐ | Comunidade |
| Hostinger | ~R$30-50/mês | ⭐⭐⭐ | ⭐⭐⭐⭐ | Excelente |
| Manus | Variável | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Excelente |

---

## ✅ Checklist de Deploy

- [ ] Todos os arquivos copiados
- [ ] .gitignore criado
- [ ] Git inicializado
- [ ] Repositório GitHub criado
- [ ] Código enviado para GitHub
- [ ] Plataforma de deploy escolhida
- [ ] Projeto importado na plataforma
- [ ] Build configurado corretamente
- [ ] Deploy realizado
- [ ] Site acessível online
- [ ] Domínio personalizado configurado (opcional)
- [ ] SSL ativado (automático em todas as plataformas)

---

## 🔍 Testar Site Online

Após fazer deploy:

```bash
# 1. Acesse a URL do seu site
# 2. Teste todas as funcionalidades:
#    - Navegação
#    - Formulário de agendamento
#    - Links do WhatsApp
#    - Galeria de imagens
#    - Responsividade em mobile
# 3. Verifique velocidade: https://pagespeed.web.dev
# 4. Teste SEO: https://www.seobility.net/pt/
```

---

## 🆘 Troubleshooting

### Site não carrega
```bash
# 1. Verifique se o build foi bem-sucedido
# 2. Verifique se os arquivos foram enviados corretamente
# 3. Limpe cache do navegador (Ctrl+Shift+Del)
# 4. Aguarde 5 minutos para DNS propagar
```

### Imagens não aparecem
```bash
# 1. Verifique se as URLs das imagens estão corretas
# 2. Use URLs completas (https://...)
# 3. Verifique permissões de arquivo
```

### Formulário não funciona
```bash
# 1. Verifique número do WhatsApp
# 2. Teste em navegador diferente
# 3. Verifique console do navegador (F12)
```

---

## 🎯 Próximos Passos

1. **Escolha uma plataforma** (recomendo Vercel ou Manus)
2. **Siga o guia passo a passo**
3. **Teste tudo online**
4. **Compartilhe com clientes**
5. **Monitore performance**

---

**Seu site estará online em poucos minutos! 🚀**
