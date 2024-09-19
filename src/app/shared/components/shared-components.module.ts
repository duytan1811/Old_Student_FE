import { NgModule } from '@angular/core';

import { InlineSVGModule } from 'ng-inline-svg';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { StatusBadgeComponent } from 'src/app/shared/components/status-badge/status-badge.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TranslationModule } from 'src/app/modules/i18n';
import { NgPagination } from './paginator/ng-pagination/ng-pagination.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    declarations: [
        StatusBadgeComponent,
        PaginatorComponent,
        NgPagination,
    ],
    imports: [
        CommonModule,
        DirectiveModule,
        InlineSVGModule,
        ReactiveFormsModule,
        TranslationModule,
        MatSelectModule,
        FormsModule,
        DirectiveModule,
        MatCheckboxModule,
        MatExpansionModule
    ],
    exports: [
        CommonModule,
        PaginatorComponent,
        StatusBadgeComponent,
        InlineSVGModule,
        ReactiveFormsModule,
        TranslationModule,
        MatSelectModule,
        FormsModule,
        FormGroupDirective,
        DirectiveModule,
        MatExpansionModule
    ],
    providers: [
    ]
})
export class SharedComponentModule { }
