import { Component, OnInit } from '@angular/core';
import { CenarioService } from 'app/service/cenario/cenario.service';
import { ItemService } from 'app/service/item/item.service';

@Component({
  selector: 'app-comparation',
  templateUrl: './comparation.component.html',
  styleUrls: ['./comparation.component.scss']
})
export class ComparationComponent implements OnInit {

  constructor(
    private cenarioService: CenarioService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
  }

  

}
