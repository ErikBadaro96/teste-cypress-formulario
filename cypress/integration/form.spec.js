/// <reference types="cypress" />

describe("Actions Form", () => {
  beforeEach(() => {
    cy.visit("toTest.html"); //Visitando arquivo para ser testado
  });

  it("Verificando o título da página", () => {
    //Verificando se o título da página corresponde a "Campo de Treinamento""
    cy.title().should("include", "Campo de Treinamento");
  });

  it("Verificando acao dos botoes iniciais da pagina", () => {
    //Verificando click dos botes iniciais
    cy.get("#buttonSimple").click();
    cy.get("#buttonPopUpEasy").click();
    cy.get("#buttonPopUpHard").click();
    cy.get("#buttonDelay").click();
  });

  it("Validando campos do formulário", () => {
    //Verificando através do click do botão se o formulário aceita campos nulos
    cy.get('[id="elementosForm:cadastrar"]').click();
  });

  it("Validando formulário com campo nome preenchido", () => {
    //Após verificar que o campo nome é obrigatório, vamos preencher o mesmo e seguir adiante
    cy.get('[id="elementosForm:nome"]').type("Nome");
    cy.get('[id="elementosForm:cadastrar"]').click();
  });

  it("Validando formulário com campo nome e sobrenome preenchido", () => {
    //Após verificar que o campo nome e sobrenome são obrigatório, vamos preencher os mesmos e seguir adiante
    cy.get('[id="elementosForm:nome"]').type("Nome");

    cy.get('[id="elementosForm:sobrenome"]').type("Sobrenome");

    cy.get('[id="elementosForm:cadastrar"]').click();
  });

  it("Validando formulário com campo nome, sobrenome e sexo preenchidos", () => {
    //Após verificar que o campo nome, sobrenome e sexo são obrigatórios, vamos preencher os mesmos e seguir adiante
    cy.get('[id="elementosForm:nome"]').type("Nome");

    cy.get('[id="elementosForm:sobrenome"]').type("Sobrenome");

    // Verificando se o input do tipo radio aceita valor "M" = Masculino & "F" = Feminino
    cy.get('[type="radio"]')
      .check(["M", "F"])
      .should("be.checked");

    cy.get('[id="elementosForm:cadastrar"]').click();
  });

  it("Verificando preenchimento do formulário com os campos obrigatorios preenchidos e cadastrando", () => {
    //Verificando formulário da páginaa
    cy.get("form").within(() => {
      //Verificando se os inputs nome e sobrenomes aceitam string
      cy.get('[id="elementosForm:nome"]').type("Nome");

      cy.get('[id="elementosForm:sobrenome"]').type("Sobrenome");

      // Verificando se o input do tipo radio aceita valor "M" = Masculino & "F" = Feminino
      cy.get('[type="radio"]')
        .check(["M", "F"])
        .should("be.checked");

      // Verificando se o input do tipo checkbox aceita array
      cy.get('[type="checkbox"]')
        .check(["carne", "frango", "pizza", "vegetariano"])
        .should("be.checked");

      //Verificando se o select "escolaridade" estão aceitando todos os valores
      cy.get('[id="elementosForm:escolaridade"]').select("1grauincomp");
      cy.get('[id="elementosForm:escolaridade"]').select("1graucomp");
      cy.get('[id="elementosForm:escolaridade"]').select("2grauincomp");
      cy.get('[id="elementosForm:escolaridade"]').select("2graucomp");
      cy.get('[id="elementosForm:escolaridade"]').select("superior");
      cy.get('[id="elementosForm:escolaridade"]').select("especializacao");
      cy.get('[id="elementosForm:escolaridade"]').select("mestrado");
      cy.get('[id="elementosForm:escolaridade"]').select("doutorado");

      //Verificando se o multi-select "pratica esportes?" estão aceitando multiplas selecoes
      cy.get('[id="elementosForm:esportes"]')
        .select(["natacao", "futebol", "Corrida", "Karate", "nada"])
        .invoke("val")
        .should("deep.equal", [
          "natacao",
          "futebol",
          "Corrida",
          "Karate",
          "nada"
        ]);

      //Verificando text area de sugestoes
      cy.get('[id="elementosForm:sugestoes"]')
        .type("Preenchechendo text area de sugestoes e limpando")
        .clear();

      //Verificando clique dos botoes dos usuarios da tabela
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="button"]')
        .eq(0)
        .click();
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="button"]')
        .eq(1)
        .click();
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="button"]')
        .eq(2)
        .click();
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="button"]')
        .eq(3)
        .click();
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="button"]')
        .eq(4)
        .click();

      //Verificando se os inputs do tipo checkbox e radio onde contém o nome das pessoas são clicavéis (um após o outro) e forcando
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="checkbox"]')
        .not("[disabled]")
        .check({ force: true })
        .should("be.checked");

      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="radio"]')
        .not("[disabled]")
        .check({ force: true })
        .should("be.checked");

      //Preenchendo input com os nomes das pessoas cadastradas na tabela
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="text"]')
        .eq(0)
        .type("Francisco");
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="text"]')
        .eq(1)
        .type("Maria");
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="text"]')
        .eq(2)
        .type("Usuario A");
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="text"]')
        .eq(3)
        .type("Doutorado");
      cy.get('[id="elementosForm:tableUsuarios"]')
        .find('[type="text"]')
        .eq(4)
        .type("UsuarioB");

      //Verificando botao de cadastro de formulario e enviando informacoes
      cy.get('[id="elementosForm:cadastrar"]').click();
    });
  });

  it("Verificando clique dos botões do rodapé da página", () => {
    cy.get('[id="alert"]').click();
    cy.get('[id="confirm"]').click();
    //Enviando valor '10'para prompt de comando exibido na tela
    cy.window().then(win => {
      cy.stub(win, "prompt").returns("10");
      cy.get('[id="prompt"]').click();
    });
  });
});
