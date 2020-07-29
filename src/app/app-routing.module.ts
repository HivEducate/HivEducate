import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { PrimaryPanelComponent } from './training/primary-panel/primary-panel.component';
import { TeacherDashboardComponent } from './training/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './training/student-dashboard/student-dashboard.component';
import { HomeComponent } from './landing/home/home.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'teacherDashboard', component: TeacherDashboardComponent, canActivate: [AuthGuard] },
  { path: 'studentDashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
