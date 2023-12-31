import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
   @Output() serverCreated = new EventEmitter<{serverName:string, serverContent: string}>();
  @Output("bpCreated") blueprintCreated = new EventEmitter<{serverName:string, serverContent: string}>();
//Use the @Output decorator because we are passing something out of the component to the parent components

   //EventEmitter is an object in the Angular framework which allows you to emit your own events

   //@Output allows parent components to listen to your own events
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
//Used for local referencing
  constructor() { }

  ngOnInit(): void {
    //This is a lifecycle hook
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

}
