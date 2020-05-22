import { Component, OnInit } from "@angular/core";
declare let $;
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $("meta[name=viewport]").attr("content", "width=1100");
  }
}
