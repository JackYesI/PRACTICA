import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-auth.component.html',
  styleUrls: ['./teacher-auth.component.scss']
})
export class TeacherAuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    this.http.post('http://localhost:5000/api/register', {
      username: this.username,
      password: this.password,
      role: 'teacher'
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
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.errorMessage = 'Неправильні дані для входу.';
      }
    );
  }
}
