import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DeviceComponent } from './components/device/device.component';
import { DevicesComponent } from './components/devices/devices.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { MapComponent } from './components/map/map.component';
import { SiteComponent } from './components/site/site.component';
import { SitesComponent } from './components/sites/sites.component';
import { EventDialogComponent } from './components/event-dialog/event-dialog.component';
import { BackButtonDirective } from './directives/back-button.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    DeviceComponent,
    DevicesComponent,
    TasksComponent,
    TaskComponent,
    MapComponent,
    SiteComponent,
    SitesComponent,
    EventDialogComponent,
    BackButtonDirective
  ],
  entryComponents: [EventDialogComponent],
  imports: [
    AgmCoreModule.forRoot({
        // please get your own API key here:
        // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
        apiKey: 'AIzaSyCK5VcZMXyOfaakhfn8URCT_BZrL5nzyR4'
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        // iconRegistry.addSvgIcon('thumps-up', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/thumpsup-icon.svg'));
    }
}
