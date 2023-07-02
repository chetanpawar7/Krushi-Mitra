import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { UserCrudComponent } from "./user-crud/user-crud.component";
import { SchemesComponent } from "./admin-dashboard/schemes/schemes.component";

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    UserCrudComponent,
    SchemesComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
