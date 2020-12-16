import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { screen } from "platform";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    category1: any;
    category2: any;
    category3: any;
    item1: any;
    item2: any;
    item3: any;
    item4: any;

    constructor(private page: Page, private routerExtensions: RouterExtensions) {

        this.page.on('navigatedTo', () => {
            this.category1 = this.page.getViewById("category1");
            this.category2 = this.page.getViewById("category2");
            this.category3 = this.page.getViewById("category3");
            this.item1 = this.page.getViewById("item1");
            this.item2 = this.page.getViewById("item2");
            this.item3 = this.page.getViewById("item3");
            this.item4 = this.page.getViewById("item4");            
            this.page.getViewById("addButtonContainer").top = screen.mainScreen.heightDIPs - 120;
        });
    }

    ngOnInit(): void {
    }

    openDrawer(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    navigateAdd(): void {

        this.routerExtensions.navigate(["/add"], {
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "easeIn"
            }
        });
    }

    onTouch(args): void {        
        if (args.object.category == "total") {
            this.category1.className = "owe-dashboard-item active";
            this.category2.className = "owe-dashboard-item";
            this.category3.className = "owe-dashboard-item";
            this.item1.className = "owe-list-item";
            this.item2.className = "owe-list-item";
            this.item3.className = "owe-list-item";
            this.item4.className = "owe-list-item";
        } else if (args.object.category == "owe") {
            this.category1.className = "owe-dashboard-item";
            this.category2.className = "owe-dashboard-item active";
            this.category3.className = "owe-dashboard-item";
            this.item1.className = "owe-list-item";
            this.item2.className = "owe-list-item hide";
            this.item3.className = "owe-list-item hide";
            this.item4.className = "owe-list-item";
        } else if (args.object.category == "owed") {
            this.category1.className = "owe-dashboard-item";
            this.category2.className = "owe-dashboard-item";
            this.category3.className = "owe-dashboard-item active";
            this.item1.className = "owe-list-item hide";
            this.item2.className = "owe-list-item";
            this.item3.className = "owe-list-item hide";
            this.item4.className = "owe-list-item hide";
        }
    }

    onNavigate(): void {
        this.routerExtensions.navigate(["/detail"], {
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "easeIn"
            }
        });
    }

}
