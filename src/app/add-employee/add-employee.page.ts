import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { objEmployee,StorageService } from '../services/storage.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ModalpopupPage } from '../modalpopup/modalpopup.page';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  employData; 
  modelData: any;
  //imgURL;

  // get fcImageURL(){
  //   return this.addEmployeeForm.get('fcImageURL');
  // }
  get fcEmpNo(){
    return this.addEmployeeForm.get('fcEmpNo');
  }
  get fcName(){
    return this.addEmployeeForm.get('fcName');
  }
  get fcPhone(){
    return this.addEmployeeForm.get('fcPhone');
  }
  get fcEmail(){
    return this.addEmployeeForm.get('fcEmail');
  }
  get fcGender(){
    return this.addEmployeeForm.get('fcGender');
  }
  get fcPosition(){
    return this.addEmployeeForm.get('fcPosition');
  }
  get fcDOB(){
    return this.addEmployeeForm.get('fcDOB');
  }
  get fcSalary(){
    return this.addEmployeeForm.get('fcSalary');
  }
  

  public errorMessages={
    // fcImageURL: [
    //   { type: 'required', message: 'Employee Image is required.'}
    // ],
    fcEmpNo: [
      { type: 'required', message: 'Employee Number is required.'}
    ],
    fcName: [
      { type: 'required', message: 'Employee Name is required.'},
    ],
    fcPhone: [
      { type: 'required', message: 'Phone No is required.'},
      { type: 'pattern', message: 'Invalid Phone No.'}
    ],
    fcEmail: [
      { type: 'required', message: 'Email is required.'},
      { type: 'pattern', message: 'Invalid Email.'}
    ],
    fcGender: [
      { type: 'required', message: 'Gender is required.'},
    ],
    fcPosition: [
      { type: 'required', message: 'Employee Position is required.'},
    ],
    fcDOB: [
      { type: 'required', message: 'Date of Birth is required.'},
    ],
    fcSalary: [
      { type: 'required', message: 'Salary is required.'},
    ],
  };

  addEmployeeForm = this.formBuilder.group({
    // fcImageURL:[
    //   '',
    //   [ Validators.required ]
    // ],
  fcEmpNo: [
      '',
      [ Validators.required ,
        Validators.pattern('[0-9]*')
      ]
  ],
  fcName: [
    '',
    [ Validators.required ]
  ],
  fcPhone: [
      '',
      [ Validators.required,
        Validators.pattern('[+/0][0-9]{10,13}')
      ]
  ],
  fcEmail: [
    '',
    [ Validators.required,
      Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')
    ]
  ],
  fcGender: [
    '',
    [ Validators.required ]
  ],
  fcPosition: [
    '',
    [ Validators.required ]
  ],
  fcDOB: [
    '',
    [ Validators.required ]
  ],
  fcSalary: [
    '',
    [ Validators.required ]
  ],
 });

  constructor(public router: Router, public storageService: StorageService, private toastController: ToastController, 
              public formBuilder: FormBuilder, public alertCtrl: AlertController,
              private camera: Camera, public modalController: ModalController) { }

  ngOnInit() {
    this.employData = new objEmployee();
  }

  addDecimal(amount: number) {
    // var decAmount = (amount).toFixed(2);
    // var num_parts = decAmount.toString().split(".");
    //  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  alert(num_parts.join("."));

    this.employData.Salary = (amount).toFixed(2);
  }

  async AddEmploy(){
    //console.log(this.employData);
    //await this.storageService.addEmployee(this.employData);
    //this.router.navigate(['home']);

    //this.employData.ImageURL = this.imgURL;
    if(typeof this.employData.ImageURL == 'undefined')
    {      
      var alert = this.alertCtrl.create({
        header: "Employee Alert",
        message: "Please select employee image.",
        buttons:["Okey"]
      });

      (await alert).present();
    }
    else{
      await this.storageService.getEmployee().then(async empListstr => {
        var empList=[];
        let empSts:boolean = false;
        let errMessage: string;
       
        if(empListstr!=null){
          empList=JSON.parse(empListstr);
          errMessage = "";
          var empInfo =  empList.find(emp => emp.EmpNo == this.employData.EmpNo || emp.PhoneNo == this.employData.PhoneNo || emp.Email == this.employData.Email);
          if(typeof empInfo != 'undefined' && empInfo.length !=0){
            if(empInfo.EmpNo == this.employData.EmpNo){
              empSts = true;
              errMessage = "Employee number is already exists. Please try with some other number.";
            }
            else if(empInfo.PhoneNo == this.employData.PhoneNo){
              empSts = true;
              errMessage = "Phone number is already exists. Please try with some other number.";
            }
            else if(empInfo.Email == this.employData.Email){
              empSts = true;
              errMessage = "Email is already exists. Please try with some other email address.";
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
              message: errMessage,
              buttons:["Cancel"]
            });
  
            (await alert).present();
          }
        }
        else{
          console.log(this.employData);
          await this.storageService.addEmployee(this.employData);
          this.router.navigate(['home']);
        }
        });
    }
  };


  backToHome(){
    this.router.navigate(['home']);
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalpopupPage,
      showBackdrop:true,
      cssClass: 'my-custom-modal-css'
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modelData = modelData.data;
        //console.log('Modal Data : ' + modelData.data);
        if(this.modelData ==='Gallery'){
          this.getGallery();
        }
        else if(this.modelData ==='Camera'){
          this.getCamera();
        }
      }
    });

    return await modal.present();
  }

  options: CameraOptions = {
    quality:75,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    correctOrientation:true,
    targetHeight:320,
    targetWidth:320,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    //allowEdit:true
  }

  getCamera(){
    this.camera.getPicture(this.options).then((res) => {
      //this.imgURL = res;
      //this.imgURL = 'data:image/jpeg;base64,' + res;
      this.employData.ImageURL = 'data:image/jpeg;base64,' + res;
    }).catch(e =>{
      console.log(e);
    })
  }

  getGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit:true
    }).then((res) => {
      //this.imgURL = 'data:image/jpeg;base64,' + res;
      this.employData.ImageURL = 'data:image/jpeg;base64,' + res;
    }).catch(e =>{
      console.log(e);
    })
  }

}
