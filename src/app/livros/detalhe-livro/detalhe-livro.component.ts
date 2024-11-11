import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { LivrosService } from '../livros.service';
import { Livro } from '../livros.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe-livro',
  standalone: true,
  templateUrl: './detalhe-livro.component.html',
  styleUrls: ['./detalhe-livro.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class DetalheLivroComponent implements OnInit {
  livro: Livro | null = null;
  carregando = false;
  erro = '';

  constructor(
    private livrosService: LivrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarLivro(parseInt(id));
    }
  }

  carregarLivro(id: number): void {
    this.carregando = true;
    this.livrosService.getLivroById(id).subscribe({
      next: (livro) => {
        this.livro = livro;
        this.carregando = false;
        if (this.livro.publishedDate) {
          const data = new Date(this.livro.publishedDate);
          this.livro.publishedDate = data.toISOString().split('T')[0];
        }
      },
      error: (err) => {
        this.erro = 'Erro ao carregar livro';
        this.carregando = false;
      }
    });
  }

  salvarLivro(): void {
    if (this.livro) {
      this.livrosService.atualizarLivro(this.livro).subscribe({
        next: () => {
          this.router.navigate(['/livros']);
        },
        error: () => {
          this.erro = 'Erro ao salvar livro';
        }
      });
    }
  }

  editarLivro(): void {
    if (this.livro) {
      this.router.navigate(['/livros', 'edit', this.livro.id]);
    }
  }
}
