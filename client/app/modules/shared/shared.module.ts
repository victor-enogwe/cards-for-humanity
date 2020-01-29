import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// components
import { MainContainerComponent } from 'client/app/components/main-container/main-container.component'



@NgModule({
  declarations: [MainContainerComponent],
  exports: [CommonModule, MainContainerComponent],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
