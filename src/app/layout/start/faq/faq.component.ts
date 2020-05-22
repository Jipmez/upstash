import { Component, OnInit } from "@angular/core";
declare let $;
@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"]
})
export class FaqComponent implements OnInit {
  constructor() {
    $("meta[name=viewport]").attr("content", "width=1100");
  }

  ngOnInit() {}
}
