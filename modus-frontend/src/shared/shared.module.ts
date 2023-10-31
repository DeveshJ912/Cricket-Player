import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxWebstorageModule } from "ngx-webstorage";
import { ToastrModule } from "ngx-toastr";
import { AppMaterialModule } from "./material.module";
// import { SwiperModule } from "swiper/angular";

// components
// import { Loader, ErrorNotFound, ErrorScreens } from "shared/components";
// const SHARED_COMPONENTS = [Loader, ErrorNotFound, ErrorScreens];
//directives
import { AlphaNumericWithSpaceOnlyDirective, AlphaWithSpacesDirective, LimitLengthDirective, AlphaNumericOnlyDirective, AlphaNumericWithSpecialsAndSpaceOnlyDirective, NumberWithSlashOnlyDirective, DateFormatterDirective, AlphaOnlyDirective, NumberOnlyDirective, NumberOnlyWithDecimalDirective, AlphaNumericWithSpecialsOnlyDirective, AlphaNumericWithAllSpecialsOnlyDirective } from "./directives/common.directive";
import { HighlightDirective } from "./directives/mydirectiv.directive";
import { Mypipe } from "./common-pipes/mypipe.pipe";
const CORE_DIRECTIVES = [HighlightDirective,AlphaOnlyDirective, NumberOnlyDirective, NumberOnlyWithDecimalDirective, AlphaNumericWithSpecialsOnlyDirective, AlphaNumericWithAllSpecialsOnlyDirective, AlphaNumericWithSpaceOnlyDirective, AlphaWithSpacesDirective, LimitLengthDirective, AlphaNumericOnlyDirective, AlphaNumericWithSpecialsAndSpaceOnlyDirective, NumberWithSlashOnlyDirective, DateFormatterDirective];
// Pipes
// import { SlugifyPipe, SafePipe, FormatSrNoPipe, PhonePipe, IndianCurrencyPipe, CategoryPipe, FoodTypePipe } from "./common-pipes";
// const CORE_PIPES = [SlugifyPipe, SafePipe, FormatSrNoPipe, PhonePipe, IndianCurrencyPipe, CategoryPipe, FoodTypePipe];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AppMaterialModule,
    // SwiperModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-center",
        preventDuplicates: true,
        maxOpened: 1,
        autoDismiss: true
    })
  ],
  declarations: [...CORE_DIRECTIVES,Mypipe],
  exports: [NgxWebstorageModule, ...CORE_DIRECTIVES, AppMaterialModule,ToastrModule,Mypipe],

  // declarations: [...CORE_DIRECTIVES, ...CORE_PIPES, ...SHARED_COMPONENTS],
  // exports: [NgxWebstorageModule, ...CORE_DIRECTIVES, ...CORE_PIPES, ...SHARED_COMPONENTS, AppMaterialModule],
  // providers: [...CORE_PIPES]
})
export class SharedModule {
  constructor() { }
}
