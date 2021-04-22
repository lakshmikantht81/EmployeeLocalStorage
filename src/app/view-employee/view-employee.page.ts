import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.page.html',
  styleUrls: ['./view-employee.page.scss'],
})
export class ViewEmployeePage implements OnInit {
  employData: any;
  employNo: any;
  
  get phone(){
    return this.registrationForm.get('phone');

  }
  get email(){
    return this.registrationForm.get('email');
  }
  
  public errorMessages={
    phone: [
      { type: 'required', message: 'Phone No is required.'},
      { type: 'pattern', message: 'Invalid Phone No.'}
    ],
    email: [
      { type: 'required', message: 'Email is required.'},
      { type: 'pattern', message: 'Invalid Email.'}
    ]
  };

  registrationForm = this.formBuilder.group({
    phone: [
      '',
      [ Validators.required,
        Validators.pattern('[+][0-9]{1,4}-[0-9]{3}-[0-9]{5,7}')//[0-9]{4}')
      ]
  ],
  email: [
    '',
    [ Validators.required,
      Validators.pattern('^[a-zA-Z0-9.%-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$')
    ]
  ],
  });

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService, public formBuilder: FormBuilder, private alertCtrl:AlertController ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.employData = JSON.parse(params.special);
        this.employNo = this.employData.EmpNo;
      }
    });

   }

  ngOnInit() {
  }

  returnToHome(){
    this.router.navigate(['home']);
  }

  async deleteEmploy(){
    var alert = this.alertCtrl.create({
      header: "Confirm",
      message: "Are you sure you want to delete this employee.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            await this.storageService.deleteEmployee(this.employData.EmpNo);
            console.log(this.employData);
            this.router.navigate(['home']);
          }
        }
      ]
      //buttons:["Cancel"]
    });

    (await alert).present();
  }

  async saveEmploy(){
    await this.storageService.setEmploy(this.employData);
    console.log(this.employData);
    this.router.navigate(['home']);
}

}
