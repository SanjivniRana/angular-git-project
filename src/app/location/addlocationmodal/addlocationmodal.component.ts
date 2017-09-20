import { Component, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { LocationService } from "../../services/location.service";
import { ToasterService } from "../../toaster/toaster.service";

@Component({
    selector: 'app-locationmodal',
    templateUrl: './addlocationmodal.component.html',
    styleUrls: ['./addlocationmodal.component.css']
})
export class AddlocationmodalComponent {
    complexForm: FormGroup;
    model: any = {};
    //@Input() childMessage: string;
    loading = false;
    public modalRef: BsModalRef;
    constructor(fb: FormBuilder,

        private router: Router,
        private locationService: LocationService,
        private toasterService: ToasterService,

        private alertService: AlertService, private modalService: BsModalService) {
        this.complexForm = fb.group({

            'Name': [null, Validators.required],

            'City': [null, Validators.required],

            'Phone': [null, Validators.required],

            'Zip': [null, Validators.required],

            'Address1': [null, Validators.required],

            'Address2': [null, Validators.required],

        },

        )
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    submitForm(model: any) {
        this.loading = true;
        this.locationService.create(model).subscribe(
            data => {
                this.toasterService.showToaster('Successfully Added');
                window.location.reload();
            },
            error => {
                this.toasterService.showToaster('Already Exist');
                this.loading = false;
            });
    }

    _NumberOnly(event: any) {
        const numpattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!numpattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    _CharacterOnly(event: any) {
        const charpattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!charpattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}