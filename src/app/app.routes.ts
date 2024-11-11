import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { ListaLivrosComponent } from './livros/lista-livros/lista-livros.component';
import { DetalheLivroComponent } from './livros/detalhe-livro/detalhe-livro.component';
import { EditarLivroComponent } from './livros/editar-livro/editar-livro.component';
import { AuthGuard } from './auth/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'livros', component: ListaLivrosComponent, canActivate: [AuthGuard] },
    { path: 'livros/:id', component: DetalheLivroComponent, canActivate: [AuthGuard] },
    { path: 'livros/edit/:id', component: EditarLivroComponent , canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent },
];
