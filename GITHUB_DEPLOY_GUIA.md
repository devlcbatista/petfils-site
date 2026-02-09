# 🚀 Guia Completo: GitHub e Deploy Automático

## 📌 O que é GitHub?

GitHub é uma plataforma que permite:
- ✅ Armazenar seu código online
- ✅ Fazer backup automático
- ✅ Colaborar com outros desenvolvedores
- ✅ Fazer deploy automático (publicar alterações automaticamente)
- ✅ Controlar versões do seu código

---

## 🔗 Seu Repositório GitHub

Seu projeto PetFils já está conectado ao GitHub! Aqui estão os detalhes:

### 📍 URL do Repositório
```
https://github.com/seu-usuario/petfils-site
```

### 🔑 Informações de Acesso
- **Remote:** `user_github`
- **Branch:** `main`
- **Status:** Sincronizado automaticamente

---

## 💻 Como Acessar seu Repositório

### Passo 1: Acesse o GitHub
1. Vá para: https://github.com
2. Faça login com sua conta
3. Procure por `petfils-site` na barra de busca

### Passo 2: Visualize seu Código
- Clique no repositório
- Veja todos os arquivos do seu projeto
- Visualize o histórico de alterações (commits)

### Passo 3: Configure Acesso (Se necessário)
1. Vá para **Settings** (Configurações)
2. Clique em **Collaborators** (Colaboradores)
3. Adicione pessoas que podem editar o código

---

## 📤 Como Fazer Upload de Alterações (Push)

### Opção 1: Usando o Painel Manus (Mais Fácil)
```
1. Faça alterações no seu site
2. Clique em "Publish" no painel Manus
3. Suas alterações são enviadas para o GitHub automaticamente
```

### Opção 2: Usando Git (Linha de Comando)
Se você tem Git instalado no seu computador:

```bash
# 1. Clone o repositório (primeira vez)
git clone https://github.com/seu-usuario/petfils-site.git
cd petfils-site

# 2. Faça suas alterações nos arquivos

# 3. Verifique as alterações
git status

# 4. Adicione as alterações
git add .

# 5. Crie um commit (descrição das alterações)
git commit -m "Atualizei informações do site"

# 6. Envie para o GitHub
git push origin main
```

---

## 🔄 Como Sincronizar com o GitHub

### Sincronizar Automaticamente
O Manus sincroniza automaticamente quando você:
- Clica em "Publish"
- Faz alterações no painel
- Salva um checkpoint

### Sincronizar Manualmente
Se você fez alterações direto no GitHub:

```bash
# 1. Puxe as alterações mais recentes
git pull origin main

# 2. Verifique se tudo está atualizado
git status
```

---

## 🌐 Como Fazer Deploy (Publicar o Site)

### Deploy Automático com GitHub Pages
Se você quer que o site seja publicado automaticamente quando você faz push:

#### Passo 1: Configure o GitHub Pages
1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. Vá para **Pages** (no menu lateral esquerdo)
4. Em "Source", selecione **main** branch
5. Clique em **Save**

#### Passo 2: Aguarde o Deploy
- GitHub criará um workflow automático
- Seu site será publicado em: `https://seu-usuario.github.io/petfils-site`

### Deploy com Vercel (Recomendado)
Vercel oferece deploy automático e mais rápido:

#### Passo 1: Crie uma Conta no Vercel
1. Vá para: https://vercel.com
2. Clique em **Sign Up** (Cadastrar)
3. Escolha **Continue with GitHub**
4. Autorize o Vercel a acessar seu GitHub

#### Passo 2: Importe seu Projeto
1. Clique em **New Project** (Novo Projeto)
2. Procure por `petfils-site`
3. Clique em **Import** (Importar)

#### Passo 3: Configure as Variáveis de Ambiente
1. Clique em **Environment Variables**
2. Adicione suas variáveis (DATABASE_URL, JWT_SECRET, etc.)
3. Clique em **Deploy**

#### Passo 4: Seu Site Está Online!
- URL: `https://petfils-site.vercel.app`
- Qualquer push para `main` atualiza automaticamente

---

## 🔐 Variáveis de Ambiente no GitHub

Se você quer usar GitHub Secrets para armazenar informações sensíveis:

### Passo 1: Acesse Secrets
1. Vá para o repositório
2. Clique em **Settings** (Configurações)
3. Clique em **Secrets and variables** → **Actions**

### Passo 2: Adicione um Secret
1. Clique em **New repository secret**
2. Nome: `DATABASE_URL`
3. Valor: sua string de conexão do banco
4. Clique em **Add secret**

### Passo 3: Use no GitHub Actions
```yaml
- name: Deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
  run: npm run build
```

---

## 📊 Visualizar Histórico de Alterações

### Ver Commits
1. Vá para o repositório no GitHub
2. Clique em **Commits** (no topo)
3. Veja todas as alterações feitas

### Ver Diferenças
1. Clique em um commit específico
2. Veja exatamente o que foi alterado
3. Linhas vermelhas = removidas
4. Linhas verdes = adicionadas

---

## 🔄 Workflow Recomendado

### Para Desenvolvedores
```
1. Clone o repositório
   git clone https://github.com/seu-usuario/petfils-site.git

2. Crie uma branch para sua feature
   git checkout -b feature/nova-funcionalidade

3. Faça suas alterações

4. Commit e push
   git add .
   git commit -m "Descrição da alteração"
   git push origin feature/nova-funcionalidade

5. Crie um Pull Request no GitHub

6. Revise e faça merge para main

7. Deploy automático acontece!
```

### Para Proprietários
```
1. Faça alterações no painel Manus
2. Clique em "Publish"
3. Alterações são sincronizadas com GitHub
4. Deploy automático ocorre
5. Site é atualizado em minutos
```

---

## 🆘 Problemas Comuns

### ❌ Erro: "Permission denied"
**Solução:**
```bash
# Gere uma chave SSH
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# Adicione a chave pública ao GitHub
# Settings → SSH and GPG keys → New SSH key
```

### ❌ Erro: "Merge conflict"
**Solução:**
```bash
# Puxe as alterações mais recentes
git pull origin main

# Resolva os conflitos manualmente
# Depois faça commit
git add .
git commit -m "Resolvi conflitos"
git push origin main
```

### ❌ Erro: "Repository not found"
**Solução:**
- Verifique se o repositório existe
- Verifique se você tem permissão de acesso
- Verifique a URL do repositório

---

## 📱 Acessar GitHub pelo Celular

### Usando o App
1. Baixe o app "GitHub" na App Store ou Google Play
2. Faça login com sua conta
3. Veja seus repositórios
4. Visualize commits e pull requests

### Usando o Navegador
1. Acesse https://github.com no navegador
2. Faça login
3. Navegue normalmente (interface mobile-friendly)

---

## 🔗 Links Úteis

| Recurso | Link |
|---------|------|
| GitHub | https://github.com |
| Vercel | https://vercel.com |
| GitHub Pages | https://pages.github.com |
| Git Tutorial | https://git-scm.com/doc |
| GitHub Docs | https://docs.github.com |

---

## ✅ Checklist

- [ ] Criei uma conta no GitHub
- [ ] Acessei meu repositório
- [ ] Visualizei meus commits
- [ ] Fiz um push com alterações
- [ ] Configurei GitHub Pages (opcional)
- [ ] Configurei Vercel (opcional)
- [ ] Adicionei secrets (se necessário)
- [ ] Entendi o workflow de deploy

---

## 🎓 Próximos Passos

1. **Aprender Git:** Entenda melhor como funciona o controle de versão
2. **Configurar CI/CD:** Automatize testes e deploy
3. **Colaboração:** Convide outros desenvolvedores para o projeto
4. **Backup:** Sempre mantenha backup do seu código

---

**Parabéns! Você agora entende como usar GitHub para seu site! 🎉**
