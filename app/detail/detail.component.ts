import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { screen } from "platform";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./detail.component.html"
})
export class DetailComponent implements OnInit {


    constructor(private page: Page, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
    }

}
