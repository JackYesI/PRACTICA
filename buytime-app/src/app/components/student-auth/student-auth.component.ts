import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-auth.component.html',
  styleUrls: ['./student-auth.component.scss']
})
export class StudentAuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    this.http.post('http://localhost:5000/api/register', {
      username: this.username,
      password: this.password,
      role: 'student'
    }).subscribe(
      () => {
        alert('Реєстрація успішна! Тепер увійдіть.');
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Помилка під час реєстрації: ' + error.error.error;
      }
    );
  }

  login(): void {
    this.http.post('http://localhost:5000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe(
      (response: any) => {
        localStorage.setItem('username', response.user.username);
        this.router.navigate(['/student-profile']);
      },
      (error) => {
        this.errorMessage = 'Неправильні дані для входу.';
      }
    );
  }
}
