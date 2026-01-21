import { Component } from '@angular/core';
import { Contact } from '../contact/contact';
import { Notice } from '../notice/notice';

@Component({
  selector: 'app-footer',
  imports: [Contact, Notice],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
