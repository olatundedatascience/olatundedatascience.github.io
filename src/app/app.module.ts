import { RouterModule } from '@angular/router';
import { eError } from './errorHandler';
import { httpservicescomponent } from './httpservices.component';
import { SignupFormComponent } from './signup-form.component';
import { LoginForm } from './LoginForm.Component';
import { TestIfComponent } from './Directivec.component';
import { PanelComponent } from './panel.component';
import { MultiCasePipe } from './multicase.pipe';
import { CoursesComponent } from './courses.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { MovieServices } from './movies.services';
import { MovieGenerator } from './movies';
import { SummaryPipe } from './summary.pipe';
import { TitleCasePipe } from './title-case.pipe';
import { fstarComponent } from './fstar.component';
import { likeComponent } from './like.component';
import { BoldItalicsPipe } from './BoldItalics.pipe';
import { ForgetPasswordComponent } from './ForgetPassword.Component';

import { el } from './el.directive';

import { BasicFormComponent } from './BasicForm.Component';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule }    from '@angular/common/http';
import { FavouriteComponent } from './favourites.component';

// import "../../node_modules/"

@NgModule({
  declarations: [
    httpservicescomponent,
    SignupFormComponent,
    FavouriteComponent,
    AppComponent,
    PanelComponent,
    CoursesComponent,
    fstarComponent,
    StudentsComponent,
    SummaryPipe,
    ForgetPasswordComponent,
    MultiCasePipe,
    TitleCasePipe,
    likeComponent,
    BoldItalicsPipe,
    TestIfComponent,
    el,
    BasicFormComponent,
    LoginForm
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule
    /*
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'forget', component: ForgetPasswordComponent },
      {path: 'login', component: LoginForm}
    ])
    */
  ],
  providers: [{provide: ErrorHandler, useClass: eError}],
  bootstrap: [AppComponent]
})
export class AppModule {}
