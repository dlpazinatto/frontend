import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LivrosService } from '../livros.service';
import { Livro } from '../livros.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar-livro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.css']
})
export class EditarLivroComponent implements OnInit{
  livroForm: FormGroup;
  carregando: boolean = true;
  livro: Livro = { id: 0, title: '', author: '', publishedDate: '' };
  constructor(
    private route: ActivatedRoute,
    private livroService: LivrosService,
    private router: Router,
    private fb: FormBuilder,

  ) {
    this.livroForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      publishedDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.carregarLivro();
  }

  carregarLivro(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.livroService.getLivroById(+id).subscribe((livro) => {
        this.livro = livro;
        if (livro.publishedDate) {
          const data = new Date(livro.publishedDate);
          livro.publishedDate = data.toISOString().split('T')[0];
        }
        this.livroForm.patchValue({
          title: livro.title,
          author: livro.author,
          publishedDate: livro.publishedDate
        });
      });
    }
  }

  salvarLivro(): void {
    if (this.livroForm.valid) {
      const livroAtualizado: Livro = { id: this.route.snapshot.params['id'], ...this.livroForm.value };
      this.livroService.atualizarLivro(livroAtualizado).subscribe(() => {
        this.router.navigate(['/livros']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/livros']);
  }

}
