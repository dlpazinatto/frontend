import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Livro, LivrosResponse, SearchParam } from './livros.model';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  getLivros(param: SearchParam): Observable<LivrosResponse> {
    const token = this.getAndCheckToken();
    if (!token) {
      return throwError('Token inválido');
    }
    
    const header = { Authorization: `Bearer ${token}` };
    let fullUrl = `${this.apiUrl}?name=${param.searchQuery}&page=${param.page}&limit=${param.limit}`;
    let data = this.http.get<LivrosResponse>(fullUrl, { headers: header }).pipe(
      map((response) => response),
      catchError((err) => {
        console.error('Erro ao buscar livros:', err);
        return throwError('Erro ao carregar livros');
      })
    );
    
    return data;
  }

  getLivroById(id: number): Observable<Livro> {
    const token = this.getAndCheckToken();
    
    if (!token) {
      return throwError('Token inválido');
    }

    const header = { Authorization: `Bearer ${token}` };

    return this.http.get<Livro>(`${this.apiUrl}/${id}`, { headers: header }).pipe(
      catchError((err) => {
        console.error('Erro ao buscar livro:', err);
        return throwError('Erro ao carregar livro');
      })
    );
  }

  criarLivro(livro: Livro): Observable<Livro> {
    const token = this.getAndCheckToken();
    
    if (!token) {
      return throwError('Token inválido');
    }
    const header = { Authorization: `Bearer ${token}` };

    return this.http.post<Livro>(this.apiUrl, livro, { headers: header }).pipe(
      catchError((err) => {
        console.error('Erro ao criar livro:', err);
        return throwError('Erro ao criar livro');
      })
    );
  }

  atualizarLivro(livro: Livro): Observable<Livro> {
    const token = this.getAndCheckToken();
    
    if (!token) {
      return throwError('Token inválido');
    }
    const header = { Authorization: `Bearer ${token}` };

    return this.http.put<Livro>(`${this.apiUrl}/${livro.id}`, livro, { headers: header }).pipe(
      catchError((err) => {
        console.error('Erro ao atualizar livro:', err);
        return throwError('Erro ao atualizar livro');
      })
    );
  }

  excluirLivro(id: number): Observable<void> {
    const token = this.getAndCheckToken();
    
    if (!token) {
      return throwError('Token inválido');
    }
    const header = { Authorization: `Bearer ${token}` };

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: header }).pipe(
      catchError((err) => {
        console.error('Erro ao excluir livro:', err);
        return throwError('Erro ao excluir livro');
      })
    );
  }

  logOut(): void {
    this.authService.logout();
  }

  getAndCheckToken(): string | null {
    let token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return null;
    }else{
      return token;
    }  
  }

}
