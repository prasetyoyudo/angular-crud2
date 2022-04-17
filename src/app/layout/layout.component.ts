import { LayoutService }                    from "./_service/layout.service";
import { 
          Component, 
          OnDestroy, 
          OnInit ,
          ViewChild     
        }                                   from "@angular/core";
import { Subscription }                     from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit, OnDestroy {
    //   orderDataModel          : Order[] | undefined;
    subscription            : Subscription[] = [];
    layoutForm!             : FormGroup
    isFormEmail             : boolean = true
    isFormPassword          : boolean = true

  constructor(
    private _Layout         : LayoutService,
    private fb              : FormBuilder,
    private Router          : Router
  ) { }

  async ngOnInit(){
    try {
        await this.initForm()

    } catch(error) {

    }
  }

  async ngOnDestroy(){
      this.subscription.forEach((each) => each.unsubscribe()); 
  }

  initForm() {
    const customPattern = /^(\d{10,15}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/;
    this.layoutForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(customPattern)
      ] )],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ] )],
      remember_me: [false]
    })
  }

  inputEmail(event: any) {
    console.log(11111)
    const customPattern = /^(\d{10,15}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/;
    this.isFormEmail = !event.target.value.match(customPattern);
    console.log(this.isFormEmail)
  }

  inputPassword(event: any) {
    this.isFormPassword = event.target.value.length < 8;
  }

  onLogin() {
    this.Router.navigate(['users'])
  }
}
