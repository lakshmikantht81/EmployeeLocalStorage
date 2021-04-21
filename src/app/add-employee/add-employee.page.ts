import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { objEmployee,StorageService } from '../services/storage.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  employData; 
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

  constructor(public router: Router, public storageService: StorageService, private toastController: ToastController, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employData = new objEmployee();
  }

  async AddEmploy(){
      //this.storageService.addEmployee(this.employData).then(employ =>{
        // this.employData = employ;
        // this.show('Employee Added');
        // this.router.navigate(['home']);
      //})
      console.log(this.employData);
      await this.storageService.addEmployee(this.employData);
      this.router.navigate(['home']);
  }


  backToHome(){
    this.router.navigate(['home']);
  }
}
