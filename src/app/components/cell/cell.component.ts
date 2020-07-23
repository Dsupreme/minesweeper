import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.scss"],
})
export class CellComponent implements OnInit {
  @Input("cell")
  cell;

  @Output() leftClick = new EventEmitter<boolean>();
  @Output() rightClick = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.leftClick.emit(true);
  }

  onRightClick($event) {
    $event.preventDefault();
    this.rightClick.emit(true);
  }
}
