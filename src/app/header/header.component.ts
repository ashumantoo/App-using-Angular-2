import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "app/shared/data-storage.service";
import { AuthService } from "app/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSubscription: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
    @Output() featureSelected = new EventEmitter<string>();

    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe(user => {
            // this.isAuthenticated = !user ? false : true;
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        })
    }
    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}