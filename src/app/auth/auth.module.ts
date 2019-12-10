import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        AuthComponent
    ]
})

export class AuthModule { }