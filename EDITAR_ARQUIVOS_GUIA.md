# ✏️ Guia Prático: Como Editar os Arquivos do Site

## 🎯 Onde Estão os Arquivos Principais?

```
petfils-site/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx          ← EDITE AQUI (página principal)
│       │   ├── Dashboard.tsx      ← Dashboard de admin
│       │   ├── Estoque.tsx        ← Gerenciamento de estoque
│       │   └── Relatorios.tsx     ← Gráficos e análises
│       └── index.css              ← Cores e estilos
├── server/
│   ├── db.ts                      ← Banco de dados
│   └── routers.ts                 ← API
└── drizzle/
    └── schema.ts                  ← Estrutura do banco
```

---

## 📝 EDIÇÃO #1: Mudar o Nome do PetShop

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `"PetFils"`

### Passo 2: Substitua o nome
**ANTES:**
```jsx
<h1 className="display-title text-2xl">PetFils</h1>
```

**DEPOIS:**
```jsx
<h1 className="display-title text-2xl">Seu Pet Shop</h1>
```

### Passo 3: Salve e pronto!
- Pressione Ctrl+S (Windows) ou Cmd+S (Mac)
- O site atualizará automaticamente

---

## 📝 EDIÇÃO #2: Mudar o Endereço

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `"Rodovia Serafim Derenzi, 349"`

### Passo 2: Substitua o endereço
**ANTES:**
```jsx
<p className="text-sm sm:text-base text-gray-600">
  Rodovia Serafim Derenzi, 349
  <br />
  Santo Antônio, Vitória - ES
</p>
```

**DEPOIS:**
```jsx
<p className="text-sm sm:text-base text-gray-600">
  Rua Exemplo, 123
  <br />
  Bairro, Cidade - UF
</p>
```

---

## 📝 EDIÇÃO #3: Mudar o Telefone/WhatsApp

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `"5527999999999"`

### Passo 2: Substitua o número
**ANTES:**
```jsx
href="https://wa.me/5527999999999"
```

**DEPOIS:**
```jsx
href="https://wa.me/5527998765432"
```

### ⚠️ Formato Correto
- Comece com: `55` (código do Brasil)
- Depois: DDD (2 dígitos) - exemplo: `27`
- Depois: número (9 dígitos) - exemplo: `998765432`
- **Resultado:** `5527998765432`

---

## 📝 EDIÇÃO #4: Mudar o Título Principal

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `"Amor, Qualidade e Cuidado para seu Pet"`

### Passo 2: Substitua o título
**ANTES:**
```jsx
<h1 className="display-title text-3xl sm:text-4xl md:text-5xl leading-tight">
  Amor, Qualidade e Cuidado para seu Pet
</h1>
```

**DEPOIS:**
```jsx
<h1 className="display-title text-3xl sm:text-4xl md:text-5xl leading-tight">
  Seu novo título aqui
</h1>
```

---

## 📝 EDIÇÃO #5: Mudar a Descrição

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `"Bem-vindo à PetFils!"`

### Passo 2: Substitua a descrição
**ANTES:**
```jsx
<p className="text-base sm:text-lg text-gray-600 leading-relaxed">
  Bem-vindo à PetFils! Somos um petshop completo em Vitória, ES, dedicado a oferecer os melhores produtos e serviços para seus companheiros de quatro patas.
</p>
```

**DEPOIS:**
```jsx
<p className="text-base sm:text-lg text-gray-600 leading-relaxed">
  Sua descrição aqui! Fale sobre seu petshop, localização, diferenciais, etc.
</p>
```

---

## 📝 EDIÇÃO #6: Mudar Horário de Funcionamento

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `"Seg - Sex: 9h às 18h"`

### Passo 2: Substitua o horário
**ANTES:**
```jsx
<p className="text-sm sm:text-base text-gray-600">
  Seg - Sex: 9h às 18h
  <br />
  Sab: 9h às 14h
</p>
```

**DEPOIS:**
```jsx
<p className="text-sm sm:text-base text-gray-600">
  Seg - Sex: 8h às 19h
  <br />
  Sab: 8h às 15h
  <br />
  Dom: Fechado
</p>
```

---

## 📝 EDIÇÃO #7: Adicionar Novo Serviço

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `{ name: "Banho e Tosa", desc: "Higiene completa com produtos premium" },`

### Passo 2: Adicione um novo serviço
**ANTES:**
```jsx
{[
  { name: "Banho e Tosa", desc: "Higiene completa com produtos premium" },
  { name: "Nutrição Balanceada", desc: "Rações das melhores marcas para cada tipo de pet" },
  // ... mais serviços
]}
```

**DEPOIS:**
```jsx
{[
  { name: "Banho e Tosa", desc: "Higiene completa com produtos premium" },
  { name: "Nutrição Balanceada", desc: "Rações das melhores marcas para cada tipo de pet" },
  { name: "Seu Novo Serviço", desc: "Descrição do novo serviço" },  // ← NOVO
  // ... mais serviços
]}
```

---

## 🎨 EDIÇÃO #8: Mudar Cores

### Passo 1: Abra o arquivo
- Arquivo: `client/src/index.css`

### Passo 2: Procure pelas cores
```css
@layer base {
  :root {
    --primary: 34 100% 55%;    /* Laranja */
    --secondary: 0 84% 60%;    /* Rosa */
    --accent: 45 100% 55%;     /* Amarelo */
  }
}
```

### Passo 3: Altere os valores
**Cores populares:**
- Laranja: `34 100% 55%`
- Rosa: `0 84% 60%`
- Vermelho: `0 100% 50%`
- Verde: `150 60% 60%`
- Azul: `210 100% 50%`
- Roxo: `270 100% 50%`

**EXEMPLO - Mudar para verde:**
```css
@layer base {
  :root {
    --primary: 150 60% 60%;    /* Verde */
    --secondary: 0 84% 60%;    /* Rosa */
    --accent: 45 100% 55%;     /* Amarelo */
  }
}
```

---

## 🖼️ EDIÇÃO #9: Mudar Imagens

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`

### Passo 2: Procure pela imagem
```jsx
<img
  src="https://old-image-url.com/image.png"
  alt="Descrição"
  className="..."
/>
```

### Passo 3: Substitua a URL
**ANTES:**
```jsx
src="https://old-image-url.com/image.png"
```

**DEPOIS:**
```jsx
src="https://new-image-url.com/image.png"
```

### 📌 Onde conseguir URLs de imagens?
1. **Unsplash:** https://unsplash.com (fotos grátis)
2. **Pexels:** https://pexels.com (fotos grátis)
3. **Seu próprio servidor:** Upload e copie a URL
4. **Manus:** Use `manus-upload-file` para fazer upload

---

## 📝 EDIÇÃO #10: Mudar Link do Instagram

### Passo 1: Abra o arquivo
- Arquivo: `client/src/pages/Home.tsx`
- Procure por: `"https://www.instagram.com/petfils/"`

### Passo 2: Substitua o link
**ANTES:**
```jsx
href="https://www.instagram.com/petfils/"
```

**DEPOIS:**
```jsx
href="https://www.instagram.com/seu-usuario/"
```

---

## 🔄 Como Salvar e Publicar

### Passo 1: Salve o arquivo
- Pressione Ctrl+S (Windows) ou Cmd+S (Mac)

### Passo 2: Verifique as alterações
- Acesse seu site em: `https://seu-dominio.com`
- Limpe o cache: Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)

### Passo 3: Publique (se necessário)
- Se você estiver usando Git:
  ```bash
  git add .
  git commit -m "Atualizei informações do site"
  git push origin main
  ```
- Se você estiver usando o painel Manus:
  - Clique em "Publish" no painel de controle

---

## ⚠️ Erros Comuns

### ❌ Erro: Falta aspas
```jsx
// ERRADO
<h1>Meu Título</h1>  // Falta aspas

// CORRETO
<h1>{"Meu Título"}</h1>
```

### ❌ Erro: Quebra de linha errada
```jsx
// ERRADO
<p>
  Linha 1
  Linha 2
</p>

// CORRETO
<p>
  Linha 1
  <br />
  Linha 2
</p>
```

### ❌ Erro: URL incompleta
```jsx
// ERRADO
href="wa.me/5527999999999"

// CORRETO
href="https://wa.me/5527999999999"
```

---

## ✅ Checklist de Edição

- [ ] Editei o nome do petshop
- [ ] Editei o endereço
- [ ] Editei o telefone/WhatsApp
- [ ] Editei o título principal
- [ ] Editei a descrição
- [ ] Editei o horário
- [ ] Editei os serviços
- [ ] Editei as cores (opcional)
- [ ] Editei as imagens (opcional)
- [ ] Editei o link do Instagram
- [ ] Salvei todos os arquivos
- [ ] Verifiquei as alterações no site
- [ ] Publiquei as alterações

---

## 🎓 Próximos Passos

Depois de editar os arquivos básicos, você pode:
1. Adicionar novos serviços no dashboard
2. Adicionar produtos ao estoque
3. Monitorar agendamentos
4. Analisar vendas nos relatórios
5. Integrar pagamento com Stripe

---

**Parabéns! Você agora sabe como editar o site! 🎉**
