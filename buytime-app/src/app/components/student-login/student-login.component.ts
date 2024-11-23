import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Додаємо FormsModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [FormsModule], // Додаємо до імпортів
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss'],
})
export class StudentLoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const data = { username: this.username, password: this.password };
    this.http.post('http://localhost:5000/api/login', data).subscribe(
      (response: any) => {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/teachers']);
      },
      (error) => {
        alert('Login failed!');
        console.error(error);
      }
    );
  }
}
