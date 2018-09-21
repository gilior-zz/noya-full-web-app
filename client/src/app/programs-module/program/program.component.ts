import {Component, Input, OnInit} from '@angular/core';
import {Program} from '../../dal/models';

@Component({
  selector: 'ny-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  @Input() prg: Program;

  constructor() {
  }

  ngOnInit() {
  }

}
