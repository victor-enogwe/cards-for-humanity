import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BootstrapModule } from '../bootstrap/bootstrap.module'
import { MaterialModule } from '../material/material.module'

// components
import { MainContainerComponent } from '../..//components/main-container/main-container.component'



@NgModule({
  declarations: [MainContainerComponent],
  exports: [CommonModule, MainContainerComponent, BootstrapModule, MaterialModule],
  imports: [
    CommonModule,
    BootstrapModule,
    MaterialModule,
  ]
})
export class SharedModule { }
