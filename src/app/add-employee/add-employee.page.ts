import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
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

  constructor(public router: Router, public storageService: StorageService, private toastController: ToastController, public formBuilder: FormBuilder, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.employData = new objEmployee();
  }

  async AddEmploy(){
    //console.log(this.employData);
    //await this.storageService.addEmployee(this.employData);
    //this.router.navigate(['home']);

    await this.storageService.getEmployee().then(async empListstr => {
      var empList=[];
      let empSts:boolean = false;
      if(empListstr!=null){
        empList=JSON.parse(empListstr);
        for (let i of empList){
          if(i.EmpNo === this.employData.EmpNo){
            empSts = true;
            break;
          }
        }

        if(empSts === false ){
            console.log(this.employData);
            await this.storageService.addEmployee(this.employData);
            this.router.navigate(['home']);
        }
        else{
         var alert = this.alertCtrl.create({
            header: "Employee Alert",
            message: "Employee number is already exists. Please try with some other number.",
            buttons:["Cancel"]
          });

          (await alert).present();
        }
      }
      });
  };


  backToHome(){
    this.router.navigate(['home']);
  }
}
