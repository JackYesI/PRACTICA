import { Routes } from '@angular/router';
import { RoleSelectorComponent } from './components/role-selector/role-selector.component';
import { StudentAuthComponent } from './components/student-auth/student-auth.component';
import { TeacherAuthComponent } from './components/teacher-auth/teacher-auth.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';

export const routes: Routes = [
  { path: '', component: RoleSelectorComponent },
  { path: 'student-auth', component: StudentAuthComponent },
  { path: 'teacher-auth', component: TeacherAuthComponent },
  { path: 'student-profile', component: StudentProfileComponent },
  { path: 'profile', component: TeacherProfileComponent },
];
