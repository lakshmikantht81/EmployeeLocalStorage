import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  constructor(private modalController: ModalController,) { }

  ngOnInit() {
  }

  async FromCamera() {
    await this.modalController.dismiss('Camera');
  }

  async FromGallery() {
    await this.modalController.dismiss('Gallery');
  }

  async Close() {
    await this.modalController.dismiss('Close');
  }

}
