import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-secret',
  templateUrl: './super-secret.component.html',
  styleUrls: ['./super-secret.component.css']
})
export class SuperSecretComponent implements OnInit {

  private html = "<iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' title='It's a mystery' frameborder='0' allow='autoplay;' allowfullscreen style='width:100vw;height:100vh'></iframe>";

  constructor() { }

  ngOnInit(): void {
  }

  public executeSecret() {
    var secretEle = document.getElementById("secret");
    secretEle.style.position = 'fixed';
    secretEle.style.top = '0';
    secretEle.style.left = '0';
    secretEle.innerHTML = this.html;
  }
}
