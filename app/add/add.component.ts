import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
// import { ImagePicker } from "nativescript-imagepicker";
import { Page } from "ui/page";
import { screen } from "platform";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { TokenModel } from "nativescript-ui-autocomplete";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as imagepicker from "nativescript-imagepicker";

@Component({
    selector: "Add",
    moduleId: module.id,
    templateUrl: "./add.component.html"
})
export class AddComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent) bottomDrawer: RadSideDrawerComponent;
    drawerIsOpen: boolean;
    splitCount: number;
    imageAssets: Array<any>;
    imageSrc: any;
    selectedImage: any;
    isSingleMode: boolean;
    _items: ObservableArray<TokenModel>;
    scrollContainer;

    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        this.splitCount = 0;
        this.isSingleMode = true;
        this.drawerIsOpen = false;
        this.page.on('navigatedTo', () => {
            this.scrollContainer = this.page.getViewById("scrollContainer");
        });

        this.initDataItems();
    }

    ngOnInit(): void {
    }

    get dataItems(): ObservableArray<TokenModel> {
        return this._items;
    }

    private initDataItems() {
        this._items = new ObservableArray<TokenModel>();

        var users = [
            {
                text: "Ashley Cole",
                image: "~/Assets/ashley.png"
            },
            {
                text: "Yura",
                image: "~/Assets/yura.png"
            },
            {
                text: "Brian Kim",
                image: "~/Assets/brian.png"
            },
            {
                text: "Rick Steven",
                image: "~/Assets/rick.png"
            }
        ];

        for (var i = 0; i < users.length; i++) {
            this.dataItems.push(new TokenModel(users[i].text, users[i].image));
        };
    }

    openDrawer(): void {
        this.bottomDrawer.sideDrawer.showDrawer();
    }

    closeDrawer(): void {
        this.bottomDrawer.sideDrawer.closeDrawer();
    }

    addAttachment() {
        let context = imagepicker.create({
            mode: "single"
        });

        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                let imageAsset = selection.length > 0 ? selection[0] : null;

                if (imageAsset) {
                    this.selectedImage = imageAsset;
                }
            }).catch(function (e) {
                console.log(e);
            });
    }

    onDidAutoComplete(args) {
        var name = args.text.split(" ")[0];
        var paidByValueObject;
        var splitObject;

        var paidByObject;
        if (name == "Ashley") {
            paidByObject = this.page.getViewById("paidByAshley");
            paidByValueObject = this.page.getViewById("paidByAshleyValue");
            splitObject = this.page.getViewById("splitAshley");
        } else if (name == "Yura") {
            paidByObject = this.page.getViewById("paidByYura");
            paidByValueObject = this.page.getViewById("paidByYuraValue");
            splitObject = this.page.getViewById("splitYura");
        } else if (name == "Brian") {
            paidByObject = this.page.getViewById("paidByBrian");
            paidByValueObject = this.page.getViewById("paidByBrianValue");
            splitObject = this.page.getViewById("splitBrian");
        } else if (name == "Rick") {
            paidByObject = this.page.getViewById("paidByRick");
            paidByValueObject = this.page.getViewById("paidByRickValue");
            splitObject = this.page.getViewById("splitRick");
        }
        paidByObject.className = paidByObject.className.replace("hide", "");
        paidByValueObject.className = paidByValueObject.className.replace("hide-opacity", "");
        splitObject.className = splitObject.className.replace("hide-opacity", "");
        this.splitCount++;
        this.page.getViewById("splitCount").nativeView.text = this.splitCount;
    }

    onTokenRemoved(args) {
        var name = args.text.split(" ")[0];
        var paidByObject;
        var paidByValueObject;
        var splitObject;
        if (name == "Ashley") {
            paidByObject = this.page.getViewById("paidByAshley");
            paidByValueObject = this.page.getViewById("paidByAshleyValue");
            splitObject = this.page.getViewById("splitAshley");
        } else if (name == "Yura") {
            paidByObject = this.page.getViewById("paidByYura");
            paidByValueObject = this.page.getViewById("paidByYuraValue");
            splitObject = this.page.getViewById("splitYura");
        } else if (name == "Brian") {
            paidByObject = this.page.getViewById("paidByBrian");
            paidByValueObject = this.page.getViewById("paidByBrianValue");
            splitObject = this.page.getViewById("splitBrian");
        } else if (name == "Rick") {
            paidByObject = this.page.getViewById("paidByRick");
            paidByValueObject = this.page.getViewById("paidByRickValue");
            splitObject = this.page.getViewById("splitRick");
        }
        paidByObject.className = paidByObject.className + "hide";
        paidByValueObject.className = paidByValueObject.className + "hide-opacity";
        splitObject.className = splitObject.className + "hide-opacity";
        this.splitCount--;
        this.page.getViewById("splitCount").nativeView.text = this.splitCount;
    }

    onTextChanged(args) {        
        this.scrollContainer.nativeView.scrollToVerticalOffset(280);
    }

    selectCategory(args) {
        var selectedCategoryLabel = this.page.getViewById("selectCategoryText");
        var selectedCategoryIcon = this.page.getViewById("selectCategoryIcon");
        if (args.object.category == "food") {
            selectedCategoryLabel.nativeView.text = "Food & Beverages";
            selectedCategoryIcon.nativeView.src = "~/Assets/food-and-beverage-category.png";
        } else if (args.object.category == "entertainment") {
            selectedCategoryLabel.nativeView.text = "Entertaintment";
            selectedCategoryIcon.nativeView.src = "~/Assets/icon-entertainment.png";
        } else if (args.object.category == "shopping") {
            selectedCategoryLabel.nativeView.text = "Shopping";
            selectedCategoryIcon.nativeView.src = "~/Assets/icon-shopping.png";
        } else if (args.object.category == "transportation") {
            selectedCategoryLabel.nativeView.text = "Transportation";
            selectedCategoryIcon.nativeView.src = "~/Assets/transportation-category.png";
        } else if (args.object.category == "travel") {
            selectedCategoryLabel.nativeView.text = "Travel";
            selectedCategoryIcon.nativeView.src = "~/Assets/travel-category.png";
        } else if (args.object.category == "others") {
            selectedCategoryLabel.nativeView.text = "Others";
            selectedCategoryIcon.nativeView.src = "~/Assets/others-category.png";
        }
        this.closeDrawer();
    }

    onSave(): void {
        this.routerExtensions.navigate(["/home"], {
            animated: true,
            clearHistory: true,
            transition: {
                name: "slideRight",
                duration: 380,
                curve: "easeIn"
            }
        });
    }

}
