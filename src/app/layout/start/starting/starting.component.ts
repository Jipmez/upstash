import { Component, OnInit } from "@angular/core";
declare let $;
@Component({
  selector: "app-starting",
  templateUrl: "./starting.component.html",
  styleUrls: ["./starting.component.scss"]
})
export class StartingComponent implements OnInit {
  constructor() {
    $("meta[name=viewport]").attr("content", "width=1100");
  }

  ngOnInit() {}
}
