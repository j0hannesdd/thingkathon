import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceComponent } from './components/device/device.component';
import { DevicesComponent } from './components/devices/devices.component';
import { MapComponent } from './components/map/map.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SiteComponent } from './components/site/site.component';
import { SitesComponent } from './components/sites/sites.component';


const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'device', component: DevicesComponent },
	{ path: 'device/:id', component: DeviceComponent },
    { path: 'task', component: TasksComponent },
    { path: 'task/:id', component: TaskComponent },
    { path: 'site', component: SitesComponent },
    { path: 'site/:id', component: SiteComponent },
    { path: 'map', component: MapComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
