import { Component, OnInit } from "@angular/core";
declare let $;
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  constructor() {
    $("meta[name=viewport]").attr("content", "width=1100");
  }

  ngOnInit() {}
}
