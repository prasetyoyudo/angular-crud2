import { LayoutService } from "../_service/layout.service";
import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from "@angular/core";
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from "../_model/layout.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {
    userDataModel: UserModel[] | undefined;
    subscription: Subscription[] = [];
    layoutForm!: FormGroup
    isFormEmail: boolean = true
    isFormPassword: boolean = true
    usersData: any
    page: number = 1

    constructor(
        private _Layout: LayoutService,
        private fb: FormBuilder,
        private Router : Router
    ) { }

    async ngOnInit() {
        try {
            this.usersData = await this.getUserList(this.page)
            console.log(this.usersData)
            let storage = localStorage.getItem('user')
            if( storage != null) {
                this.usersData.push(JSON.parse(storage))
                console.log(this.usersData)
            }
            console.log(storage)
        } catch (error) {

        }
    }

    async ngOnDestroy() {
        this.subscription.forEach((each) => each.unsubscribe());
    }

    async pageEvent(event: number) {
        this.page = event
        this.usersData = await this.getUserList(this.page)
    }

    async getUserList(eventPage : number) {
        return new Promise((resolve, reject) => {
            this._Layout.getUserListService(eventPage)
                .subscribe(data => {
                    this.page = data.page

                    data['data'].map((dataMapping : any) => {
                        dataMapping.basicSalary = '200000'
                        dataMapping.email = 'test@gmail.com'
                        dataMapping.dob = '21/03/96'
                        return
                    })
                    resolve(this.userDataModel = data['data'])
            })
        })
    }

    async onEditEmployee() {
        alert("edit employee")
    }

    async onDeleteEmployee(id : string) {
        alert("delete user "+id)
    }

    async onAddEmployee() {
        this.Router.navigate(['users/add-user'])
    }

    async onDetailEmployee(id : string) {
        this.Router.navigate(['users/add-user'],{ queryParams: { userId: id } })
    }
}
