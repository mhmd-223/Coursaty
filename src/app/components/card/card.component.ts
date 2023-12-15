import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title: string = 'Lorem Ipsum';
  @Input() brief: string = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur magnam maxime delectus, neque laboriosam aliquam tenetur repellat illum, repellendus fugiat totam nemo veniam, in et iure reprehenderit mollitia laudantium sed.';
  @Input() cover: string = '../../../assets/JS.png';
}
