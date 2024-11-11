import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if ('access_token' in response) {
          this.router.navigate(['/livros']);
        }else{
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';  
        }
      },
      error: () => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    });
  }

}
