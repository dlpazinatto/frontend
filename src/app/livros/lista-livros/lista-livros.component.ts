import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, FormControlName } from '@angular/forms';
import { LivrosService } from '../livros.service'
import { Livro, LivrosResponse } from '../livros.model'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-livros',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css'
})
export class ListaLivrosComponent implements OnInit {
  livros: Livro[] = [];
  livroForm: FormGroup;
  showForm: boolean = false;
  carregando: boolean = true;
  searchQuery: string = '';
  totalLivros: number = 0;
  page: number = 1;
  limit: number = 2;
  param = {
    searchQuery: this.searchQuery,
    page: this.page,
    limit: this.limit
  }
  

  constructor(private livrosService: LivrosService, 
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) {

    this.livroForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['',[Validators.required]],
      publishedDate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)
      ])
    });
  }

  ngOnInit(): void {
    this.carregarLivros();
  }



  carregarLivros(page: number = this.page): void {
    this.param = {
      searchQuery: this.searchQuery,
      page: page,
      limit: this.limit
    }
    
    this.livrosService.getLivros(this.param).subscribe({
      next: (response: LivrosResponse) => {
        this.livros = response.books;
        this.totalLivros = response.total;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar livros:', error);
        this.carregando = false;
      }
    });
  }

  onSearch(): void {
    this.carregarLivros(1);
  }

  onSubmit(): void {
    if (this.livroForm.valid) {
      const novoLivro = this.livroForm.value;
      this.livrosService.criarLivro(novoLivro).subscribe(
        (livro) => {
          this.livros.push(livro);
          this.showForm = false;
          this.livroForm.reset();
          this.carregarLivros();
        },
        (error) => {
          console.error('Erro ao adicionar livro:', error);
        }
      );
    }
  }

  closeForm(): void {
    this.showForm = false;
  }

  excluirLivro(id: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livrosService.excluirLivro(id).subscribe(
        () => {
          this.livros = this.livros.filter(livro => livro.id !== id);
          this.carregarLivros(1);
        },
        error => console.error('Erro ao excluir o livro:', error)
      );
    }
  }

  buscarlivroPorId(id: number): Livro | undefined {
    return this.livros.find(livro => livro.id === id);
  }

  nextPage(): void {
    if (this.page * this.limit < this.totalLivros) {
      this.page++;
      this.carregarLivros();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.carregarLivros();
    }
  }

  onLimitChange(): void {
    this.carregarLivros();
  }

  logout() {
    this.authService.logout();
  }

  onLogout() {
    this.logout();
    this.router.navigate(['/login']); 
  }
  
}
