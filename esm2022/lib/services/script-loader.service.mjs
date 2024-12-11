import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ScriptLoaderService {
    loadedScripts = {};
    scriptPromises = {}; // Neu
    loadScript(src) {
        // Wenn das Skript bereits erfolgreich geladen wurde, sofort auflösen
        if (this.loadedScripts[src]) {
            return Promise.resolve();
        }
        // Wenn ein Ladevorgang für dieses Skript bereits im Gange ist, das vorhandene Promise zurückgeben
        if (this.scriptPromises[src]) {
            return this.scriptPromises[src];
        }
        // Ein neues Promise für das Skript-Laden erstellen und speichern
        this.scriptPromises[src] = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true; // Empfohlen für externe Skripte
            script.onload = () => {
                this.loadedScripts[src] = true; // Markiere das Skript als geladen
                resolve();
            };
            script.onerror = (error) => {
                this.scriptPromises[src] = null; // Bei Fehler, entferne das Promise, damit erneute Versuche möglich sind
                reject(error);
            };
            document.body.appendChild(script);
        });
        return this.scriptPromises[src];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ScriptLoaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ScriptLoaderService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ScriptLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS9zcmMvbGliL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUt6QyxNQUFNLE9BQU8sbUJBQW1CO0lBQ3RCLGFBQWEsR0FBK0IsRUFBRSxDQUFDO0lBQy9DLGNBQWMsR0FBcUMsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUVyRSxVQUFVLENBQUMsR0FBVztRQUNwQixxRUFBcUU7UUFDckUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO1FBRUQsa0dBQWtHO1FBQ2xHLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakM7UUFFRCxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6RCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsZ0NBQWdDO1lBQ3JELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLGtDQUFrQztnQkFDbEUsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUM7WUFDRixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsd0VBQXdFO2dCQUN6RyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDO1lBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQzt1R0FoQ1UsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNjcmlwdExvYWRlclNlcnZpY2Uge1xuICBwcml2YXRlIGxvYWRlZFNjcmlwdHM6IHsgW3NyYzogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gIHByaXZhdGUgc2NyaXB0UHJvbWlzZXM6IHsgW3NyYzogc3RyaW5nXTogUHJvbWlzZTx2b2lkPiB9ID0ge307IC8vIE5ldVxuXG4gIGxvYWRTY3JpcHQoc3JjOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBXZW5uIGRhcyBTa3JpcHQgYmVyZWl0cyBlcmZvbGdyZWljaCBnZWxhZGVuIHd1cmRlLCBzb2ZvcnQgYXVmbMO2c2VuXG4gICAgaWYgKHRoaXMubG9hZGVkU2NyaXB0c1tzcmNdKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLy8gV2VubiBlaW4gTGFkZXZvcmdhbmcgZsO8ciBkaWVzZXMgU2tyaXB0IGJlcmVpdHMgaW0gR2FuZ2UgaXN0LCBkYXMgdm9yaGFuZGVuZSBQcm9taXNlIHp1csO8Y2tnZWJlblxuICAgIGlmICh0aGlzLnNjcmlwdFByb21pc2VzW3NyY10pIHtcbiAgICAgIHJldHVybiB0aGlzLnNjcmlwdFByb21pc2VzW3NyY107XG4gICAgfVxuXG4gICAgLy8gRWluIG5ldWVzIFByb21pc2UgZsO8ciBkYXMgU2tyaXB0LUxhZGVuIGVyc3RlbGxlbiB1bmQgc3BlaWNoZXJuXG4gICAgdGhpcy5zY3JpcHRQcm9taXNlc1tzcmNdID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTsgLy8gRW1wZm9obGVuIGbDvHIgZXh0ZXJuZSBTa3JpcHRlXG4gICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlZFNjcmlwdHNbc3JjXSA9IHRydWU7IC8vIE1hcmtpZXJlIGRhcyBTa3JpcHQgYWxzIGdlbGFkZW5cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5zY3JpcHRQcm9taXNlc1tzcmNdID0gbnVsbDsgLy8gQmVpIEZlaGxlciwgZW50ZmVybmUgZGFzIFByb21pc2UsIGRhbWl0IGVybmV1dGUgVmVyc3VjaGUgbcO2Z2xpY2ggc2luZFxuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLnNjcmlwdFByb21pc2VzW3NyY107XG4gIH1cbn1cbiJdfQ==