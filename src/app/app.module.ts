import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './core/nav/nav.component';
import { LoginComponent } from './user/login/login.component';
import { PrimaryPanelComponent } from './training/primary-panel/primary-panel.component';
import { ChatPanelComponent } from './training/chat-panel/chat-panel.component';
import { SearchComponent } from './shared/search/search.component';
import { QaPanelComponent } from './training/qa-panel/qa-panel.component';
import { TeacherDashboardComponent } from './training/teacher-dashboard/teacher-dashboard.component';
import { ModalContentComponent } from './shared/modal-content/modal-content.component';
import { StudentDashboardComponent } from './training/student-dashboard/student-dashboard.component';
import { HomeComponent } from './landing/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    PrimaryPanelComponent,
    ChatPanelComponent,
    SearchComponent,
    QaPanelComponent,
    TeacherDashboardComponent,
    ModalContentComponent,
    StudentDashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy}],
  entryComponents: [ModalContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
