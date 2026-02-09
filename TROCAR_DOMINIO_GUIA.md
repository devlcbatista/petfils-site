# 🌐 Guia Completo: Como Trocar o Domínio/Link do Site

## 📌 O que é um Domínio?

Um domínio é o endereço do seu site:
- ❌ Antes: `https://3000-if2e78mzz1yrl0wo9hnme-99178f0b.us2.manus.computer` (temporário)
- ✅ Depois: `https://petfils.com.br` (profissional)

---

## 🎯 Opções de Domínio

### Opção 1: Domínio Manus (Mais Fácil)
- **URL:** `https://petfils.manus.space`
- **Custo:** Grátis
- **Vantagem:** Configuração automática
- **Desvantagem:** Não é seu domínio próprio

### Opção 2: Domínio Personalizado (Recomendado)
- **URL:** `https://petfils.com.br`
- **Custo:** ~R$ 30-50/ano
- **Vantagem:** Seu próprio domínio, profissional
- **Desvantagem:** Precisa configurar DNS

---

## ✅ Passo 1: Usar Domínio Manus (Rápido)

### Passo 1.1: Acesse o Painel Manus
1. Vá para: https://manus.im
2. Faça login com sua conta
3. Clique no seu projeto "petfils-site"

### Passo 1.2: Configure o Domínio
1. Vá para **Settings** (Configurações)
2. Clique em **Domains** (Domínios)
3. Em "Subdomain", digite seu nome desejado
4. Exemplo: `petfils` (resultado: `petfils.manus.space`)
5. Clique em **Save** (Salvar)

### Passo 1.3: Pronto!
- Seu site estará disponível em: `https://petfils.manus.space`
- Compartilhe este link com seus clientes

---

## 🔗 Passo 2: Usar Domínio Personalizado (Profissional)

### Passo 2.1: Compre um Domínio

#### Opção A: Comprar no Painel Manus (Mais Fácil)
1. Vá para **Settings** → **Domains**
2. Clique em **Buy a Domain** (Comprar um Domínio)
3. Digite o nome desejado: `petfils.com.br`
4. Clique em **Search** (Buscar)
5. Se disponível, clique em **Buy** (Comprar)
6. Pague com cartão de crédito
7. Pronto! Seu domínio está configurado automaticamente

#### Opção B: Comprar em Registrador Externo
Registradores populares:
- **Namecheap:** https://www.namecheap.com
- **GoDaddy:** https://www.godaddy.com
- **Hostinger:** https://www.hostinger.com.br
- **RegistroBR:** https://www.registro.br (para .com.br)

**Passos:**
1. Vá para o site do registrador
2. Procure por `petfils.com.br`
3. Se disponível, adicione ao carrinho
4. Pague (geralmente R$ 30-50/ano)
5. Confirme o email
6. Você receberá acesso ao painel de controle

### Passo 2.2: Configure o DNS (Se comprou em outro lugar)

Se você comprou o domínio em outro registrador, precisa apontar para o Manus:

#### Passo 2.2.1: Obtenha os Dados DNS do Manus
1. No painel Manus, vá para **Settings** → **Domains**
2. Clique em **Add Custom Domain** (Adicionar Domínio Personalizado)
3. Digite seu domínio: `petfils.com.br`
4. Manus mostrará os registros DNS necessários:
   ```
   CNAME: seu-projeto.manus.space
   ou
   A: 1.2.3.4 (IP específico)
   ```

#### Passo 2.2.2: Configure no Registrador
1. Acesse o painel do seu registrador (Namecheap, GoDaddy, etc.)
2. Procure por **DNS Settings** ou **Manage DNS**
3. Adicione o registro CNAME:
   - **Host:** `@` ou deixe em branco
   - **Value:** `seu-projeto.manus.space`
4. Salve as alterações

#### Passo 2.2.3: Aguarde a Propagação
- Pode levar de 30 minutos a 48 horas
- Verifique em: https://www.whatsmydns.net
- Digite seu domínio e veja se está propagado

#### Passo 2.2.4: Ative no Manus
1. Volte ao painel Manus
2. Clique em **Verify** (Verificar)
3. Se tudo estiver correto, seu domínio estará ativo!

---

## 🔄 Trocar de um Domínio para Outro

### Se você quer trocar de `petfils.manus.space` para `petfils.com.br`

#### Passo 1: Compre o novo domínio
- Siga os passos acima

#### Passo 2: Configure no Manus
1. Vá para **Settings** → **Domains**
2. Clique em **Add Custom Domain**
3. Digite seu novo domínio
4. Configure o DNS (se necessário)

#### Passo 3: Atualize os Links
- Todos os seus links no site apontarão automaticamente para o novo domínio
- Clientes antigos que acessarem o domínio antigo serão redirecionados

#### Passo 4: Atualize Redes Sociais
- Altere o link do site no Instagram
- Altere o link no WhatsApp
- Altere o link em outros lugares onde você compartilha

---

## 📱 Exemplos de Domínios

| Tipo | Exemplo | Custo |
|------|---------|-------|
| Manus | `petfils.manus.space` | Grátis |
| .com.br | `petfils.com.br` | R$ 30-50/ano |
| .com | `petfils.com` | R$ 50-100/ano |
| .pet | `petfils.pet` | R$ 100-200/ano |
| .shop | `petfils.shop` | R$ 50-100/ano |

---

## 🆘 Problemas Comuns

### ❌ Problema: Domínio não está funcionando
**Solução:**
1. Verifique se o DNS foi propagado: https://www.whatsmydns.net
2. Aguarde até 48 horas
3. Limpe o cache do navegador (Ctrl+F5)
4. Tente em outro navegador

### ❌ Problema: Domínio já está registrado
**Solução:**
- Escolha outro nome: `petfils-vitoria.com.br`
- Ou compre de quem tem o domínio (geralmente caro)

### ❌ Problema: Erro ao configurar DNS
**Solução:**
1. Verifique se digitou corretamente
2. Verifique se o registrador permite CNAME
3. Aguarde a propagação DNS
4. Entre em contato com o suporte do registrador

---

## 🔐 HTTPS e Certificado SSL

Seu site já vem com HTTPS (seguro) automaticamente:
- ✅ URL começa com `https://` (não `http://`)
- ✅ Cadeado verde na barra de endereço
- ✅ Certificado SSL automático

Não precisa fazer nada! O Manus gerencia isso para você.

---

## 📊 Verificar Seu Domínio

### Verificar se o Domínio Está Ativo
```
1. Acesse: https://seu-dominio.com.br
2. Você deve ver seu site
3. Verifique se o cadeado verde aparece
```

### Verificar DNS
```
1. Vá para: https://www.whatsmydns.net
2. Digite seu domínio
3. Verifique se está propagado em todos os servidores
```

### Verificar Certificado SSL
```
1. Clique no cadeado verde na barra de endereço
2. Clique em "Certificado"
3. Verifique se está válido
```

---

## 💡 Dicas Importantes

### Dica 1: Escolha um Bom Domínio
- ✅ Fácil de lembrar
- ✅ Fácil de digitar
- ✅ Relacionado ao seu negócio
- ✅ Não muito longo

### Dica 2: Renove Seu Domínio
- Domínios expiram anualmente
- Você receberá email de renovação
- Renove com antecedência para não perder

### Dica 3: Configure Email Profissional
- Com seu domínio, você pode ter: `contato@petfils.com.br`
- Isso aumenta a profissionalidade
- Muitos registradores oferecem email grátis

### Dica 4: Redirecione o Domínio Antigo
- Se você tiver um domínio antigo, redirecione para o novo
- Isso mantém seus clientes chegando ao site

---

## ✅ Checklist

- [ ] Decidi qual tipo de domínio usar (Manus ou Personalizado)
- [ ] Comprei o domínio (se personalizado)
- [ ] Configurei o DNS (se necessário)
- [ ] Verifiquei se o domínio está funcionando
- [ ] Atualizei os links nas redes sociais
- [ ] Testei o site em diferentes navegadores
- [ ] Verifiquei o certificado SSL

---

## 🎓 Próximos Passos

1. **Email Profissional:** Configure `contato@seu-dominio.com.br`
2. **SEO:** Otimize seu site para buscas
3. **Analytics:** Configure Google Analytics
4. **Backup:** Faça backup regular do seu site

---

## 📞 Suporte

Se tiver dúvidas:
1. Consulte este guia
2. Verifique a documentação do Manus
3. Entre em contato com o suporte em help.manus.im
4. Contate o suporte do seu registrador de domínio

---

**Parabéns! Você agora sabe como trocar o domínio do seu site! 🎉**
