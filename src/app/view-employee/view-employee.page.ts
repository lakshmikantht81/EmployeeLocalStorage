import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Camera, CameraOptions  } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ModalpopupPage } from '../modalpopup/modalpopup.page';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.page.html',
  styleUrls: ['./view-employee.page.scss'],
})
export class ViewEmployeePage implements OnInit {
  employData: any;
  employNo: any;
  //imgURL;
  modelData: any;
  
  // get fcImageURL(){
  //   return this.addEmployeeForm.get('fcImageURL');
  // }
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
  fcRemarks: [
    '',
    [ ]
  ],
 });

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService, 
              public formBuilder: FormBuilder, private alertCtrl:AlertController, private camera: Camera, 
              public modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.employData = JSON.parse(params.special);
        this.employNo = this.employData.EmpNo;
        this.addDecimal(this.employData.Salary);
        //this.imgURL = this.employData.ImageURL;
      }
    });

   }

  ngOnInit() {
  }

  addDecimal(amount: number) {
    this.employData.Salary = (amount).toFixed(2);
  }

  returnToHome(){
    this.router.navigate(['home']);
  }

  async deleteEmploy(){
    var alert = this.alertCtrl.create({
      header: "Confirm",
      message: "Are you sure you want to delete this employee?",
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
    let empSts:boolean = false;
    let errMessage: string;
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

          var empInfo =  empList.find(emp => emp.EmpNo != this.employData.EmpNo && (emp.PhoneNo == this.employData.PhoneNo || emp.Email == this.employData.Email));
          if(typeof empInfo != 'undefined' && empInfo.length !=0){
            if(empInfo.PhoneNo == this.employData.PhoneNo){
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
            await this.storageService.setEmploy(this.employData);
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
          await this.storageService.setEmploy(this.employData);
          console.log(this.employData);
          this.router.navigate(['home']);
        }
      });
    }
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
    quality:50,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    targetHeight:320,
    targetWidth:320,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
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
      quality:50,
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
