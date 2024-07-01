describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Edita uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001/');

    cy.get('.new-todo')
      .type('Tarefa inicial{enter}');
      
    cy.get('.todo-list li')
      .first()
      .dblclick();

    cy.get('.todo-list li .edit')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .and('contain', 'Tarefa editada');
  });

  it('Marca todas as tarefas como completas', () => {
    cy.visit('http://127.0.0.1:7001/');

    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('.toggle-all').click();

    cy.get('.todo-list li .toggle')
      .each($el => {
        cy.wrap($el).should('be.checked');
    });
  });


  it('Persiste tarefas após o reload', () => {
    cy.visit('http://127.0.0.1:7001/');

    cy.get('.new-todo')
      .type('Tarefa persistente{enter}');

    cy.reload();

    cy.get('.todo-list li')
      .should('have.length', 1)
      .and('contain', 'Tarefa persistente');
  });

});