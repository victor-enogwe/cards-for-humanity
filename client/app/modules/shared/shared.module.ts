import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BootstrapModule } from '../bootstrap/bootstrap.module'
import { MaterialModule } from '../material/material.module'

// components
import { MainContainerComponent } from 'client/app/components/shared/main-container/main-container.component'



@NgModule({
  declarations: [MainContainerComponent],
  exports: [CommonModule, MainContainerComponent, BootstrapModule, MaterialModule, ScrollingModule],
  imports: [
    CommonModule,
    BootstrapModule,
    MaterialModule,
    ScrollingModule,
  ]
})
export class SharedModule { }
