import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  teachers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.http.get('http://localhost:5000/api/teachers').subscribe((data: any) => {
      this.teachers = data;
    });
  }

  bookSlot(teacherId: number, slot: string): void {
    const booking = {
      teacherId,
      slot,
      username: localStorage.getItem('username') // Зберігаємо користувача, що забронював
    };

    this.http.post('http://localhost:5000/api/bookings', booking).subscribe(
      () => {
        alert('Бронювання успішне!');
      },
      () => {
        alert('Помилка бронювання.');
      }
    );
  }
}
