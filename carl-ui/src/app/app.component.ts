import { Component, HostListener } from '@angular/core';
import { BackendService } from './services/backend.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDialogComponent } from './components/event-dialog/event-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'carl-ui';

  constructor(public service: BackendService, public dialog: MatDialog) {

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.keyCode == KEY_CODE.E){
      console.log(event);
      this.service.createEvent();

      const dialogRef = this.dialog.open(EventDialogComponent, {
          width: '250px',
          height: '250px',
          data: {name: ''}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
    }
  }

}

export enum KEY_CODE {
    UP_ARROW = 38,
    DOWN_ARROW = 40,
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
    E = 69
}
