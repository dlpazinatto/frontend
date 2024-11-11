# Frontend

This is a frontend angular project  
PS: This project runs on Node version 20.11.1 and npm version 10.5.0.

## Run Project  
Set backend host on src/environments/environment.prod.ts for production and src/environments/environment.ts fro development
```ts
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3001',
};
```
After:
```bash
npm install
npm run start
```

**After running the commands, access the frontend at:**
```text
http://localhost:4200
```
If port 4200 is in use, the Angular application will run on another port. The new port will be displayed at the end of the application startup log. For example:
```text
Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:58221/
  ➜  press h + enter to show help
```
Access the address displayed in the Angular startup log. By default, it is http://localhost:4200.  

**Frontend use**  
After the Angular application is displayed in the web browser, log in using the email and password. The email and password are provided by the backend application.  
After logging in to the frontend, all books are displayed. You can navigate through the pages if available.  
At this page, you are can ADD, Delete, EDIT and Search book.  

*ADD BOOK*  
To add a book, click the "Adicionar Livro" button and set the following values in the displayed modal:
- **Título**
- **Autor**
- **Data de Publicação**
  
Then, click "Adicionar Livro" to add the book or "Cancelar" to cancel. The new book are displayed at modal.  

*Delete Book*  
To delete a book, simply click the trash icon on the right side of the book name in the "Ações" column.  

*Search book by name*  
To search for a book by name, simply type the name in the "Buscar por Título" text box and click the "Buscar" button.  

*View and Edit book*  
To edit a book, the first step is to click the eye icon on the right side of the book name in the "Ações" column.  
On the new page, the book details are shown, and there are two buttons:  
- **Buttun 1:** "Voltar para a lista". This button return no list ok books
- **Button 2:** "Editar" This buttun show modal to edit any book information execpt book id

In the edit modal, both the "Cancelar" and "Salvar" buttons return to the book list.  


## Stay in touch

- Author - [Dilceu Pazinatto](dlpazinatto@gmail.com)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).



