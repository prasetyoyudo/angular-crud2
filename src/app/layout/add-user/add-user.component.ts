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
import { DatePickerService } from "../date-picker/date-picker.service";
import { DatePickerComponent } from "../date-picker/date-picker.component";
import * as moment from 'moment';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})

export class AddUsersComponent implements OnInit, OnDestroy {
    subscription: Subscription[] = [];
    userForm!: FormGroup
    isFormEmail: boolean = true
    birthDate: string = ''
    userId   : string = ''
    userData : any
    isDisplayButton : boolean = true
    genderStatus = [{
        status : 'male'
    },
    {
        status : 'female'
    }]

    constructor(
        private _Layout: LayoutService,
        private fb: FormBuilder,
        private datePickerService: DatePickerService<DatePickerComponent>,
        private Router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    async ngOnInit() {
        try {
            console.log(this.genderStatus)
            await this.initForm()
            this.getBirthDate()
            this.activatedRoute.queryParams.subscribe(async params => {
                console.log(params)
                this.userId = params['userId']
                this.userData = await this.getUserDetail(this.userId)
                console.log(this.userData)
                let gender : string

                this.userForm.controls['firstName'].setValue(this.userData.firstName);
                this.userForm.controls['lastName'].setValue(this.userData.lastName);
                this.userForm.controls['title'].setValue(this.userData.gender);
                this.userForm.controls['email'].setValue('test@gmail.com');
                this.userForm.controls['address'].setValue('Abbey Road');
                this.isDisplayButton = false
            });

        } catch (error) {

        }
    }

    async ngOnDestroy() {
        this.subscription.forEach((each) => each.unsubscribe());
    }

    initForm() {
        const customPattern = /^(\d{10,15}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/;
        this.userForm = this.fb.group({
            firstName: ['', Validators.compose([
                Validators.required,
            ])],
            lastName: ['', Validators.compose([
                Validators.required,
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern(customPattern)
            ])],
            title: ['', Validators.compose([
                Validators.required,
            ])],
            address: ['', Validators.compose([
                Validators.required,
            ])],
        })
    }

    inputEmail(event: any) {
        console.log(11111)
        const customPattern = /^(\d{10,15}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/;
        this.isFormEmail = !event.target.value.match(customPattern);
        console.log(this.isFormEmail)
    }

    async onOpenDatePicker() {
        const datePickerComponent = await DatePickerComponent;
        this.datePickerService.open(datePickerComponent);
    }

    async getBirthDate() {
        this.datePickerService.getSelectedDate().subscribe(
            value => {
                console.log(value)
                if (value != '') {
                    this.birthDate = moment(value).format('DD/MM/yyyy')
                    this.userForm.controls['dob'].setValue(this.birthDate);
                }
            }
        )
    }

    async getUserDetail(userId : string) {
        return new Promise((resolve, reject) => {
            this._Layout.getDetailUserService(userId)
                .subscribe(data => {
                    console.log(data)
                    resolve(data)
                })
        })
    }

    onAddUser(data: any) {
        localStorage.setItem("user", JSON.stringify(data))
        setTimeout(() => {
            this.Router.navigate(['users'])
        }, 1000);
    }

    onCancel() {
        this.Router.navigate(['users'])
    }
}
