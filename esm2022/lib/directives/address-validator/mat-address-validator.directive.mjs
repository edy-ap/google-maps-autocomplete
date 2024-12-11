import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import * as i0 from "@angular/core";
// https://github.com/angular/angular/blob/master/packages/forms/src/directives/validators.ts
export class MatValidateAddressDirective {
    subscription;
    _address;
    constructor() {
    }
    validate() {
        return (control) => {
            return this.address ? null : {
                validateAddress: {
                    valid: false
                }
            };
        };
    }
    subscribe(eventEmitter) {
        this.subscription = eventEmitter.subscribe((address) => {
            this.address = address;
        });
    }
    unsubscribe() {
        this.subscription.unsubscribe();
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatValidateAddressDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.2", type: MatValidateAddressDirective, selector: "[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]", providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatValidateAddressDirective), multi: true }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatValidateAddressDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]',
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatValidateAddressDirective), multi: true }
                    ]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItbWF0ZXJpYWwtZXh0ZW5zaW9ucy9nb29nbGUtbWFwcy1hdXRvY29tcGxldGUvc3JjL2xpYi9kaXJlY3RpdmVzL2FkZHJlc3MtdmFsaWRhdG9yL21hdC1hZGRyZXNzLXZhbGlkYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBZ0IsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBa0IsYUFBYSxFQUEyQyxNQUFNLGdCQUFnQixDQUFDOztBQUd4Ryw2RkFBNkY7QUFRN0YsTUFBTSxPQUFPLDJCQUEyQjtJQUUvQixZQUFZLENBQU07SUFFakIsUUFBUSxDQUFjO0lBRzlCO0lBQ0EsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLENBQUMsT0FBd0IsRUFBMEIsRUFBRTtZQUMxRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUsS0FBSztpQkFDYjthQUNGLENBQUM7UUFDSixDQUFDLENBQUE7SUFDSCxDQUFDO0lBRU0sU0FBUyxDQUFDLFlBQStCO1FBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQW9CLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7dUdBcENVLDJCQUEyQjsyRkFBM0IsMkJBQTJCLGtJQUozQjtZQUNULEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDJCQUEyQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztTQUNsRzs7MkZBRVUsMkJBQTJCO2tCQU52QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5R0FBeUc7b0JBQ25ILFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsNEJBQTRCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO3FCQUNsRztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCBQbGFjZVJlc3VsdCA9IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdDtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy92YWxpZGF0b3JzLnRzXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtYWRkcmVzcy12YWxpZGF0ZV1bZm9ybUNvbnRyb2xOYW1lXSxbTWF0VmFsaWRhdGVBZGRyZXNzXVtmb3JtQ29udHJvbF0sW01hdFZhbGlkYXRlQWRkcmVzc11bbmdNb2RlbF0nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlKSwgbXVsdGk6IHRydWV9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBwdWJsaWMgc3Vic2NyaXB0aW9uOiBhbnk7XG5cbiAgcHJpdmF0ZSBfYWRkcmVzczogUGxhY2VSZXN1bHQ7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgYW55ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZHJlc3MgPyBudWxsIDoge1xuICAgICAgICB2YWxpZGF0ZUFkZHJlc3M6IHtcbiAgICAgICAgICB2YWxpZDogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlKGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4pIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGV2ZW50RW1pdHRlci5zdWJzY3JpYmUoKGFkZHJlc3M6IFBsYWNlUmVzdWx0KSA9PiB7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBnZXQgYWRkcmVzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkcmVzcztcbiAgfVxuXG4gIHNldCBhZGRyZXNzKHZhbHVlKSB7XG4gICAgdGhpcy5fYWRkcmVzcyA9IHZhbHVlO1xuICB9XG59XG4iXX0=