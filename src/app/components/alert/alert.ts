import { Component, computed, signal } from '@angular/core';

type alarmType = 'error' | 'warning' | 'info' | 'success' | undefined;

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  message = signal('Hello');
  kind = signal<alarmType>('error');
  alertClass = computed(() => {
    const mapping = {
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info',
      success: 'alert-success',
      normal: '',
    };
    return ['alert', mapping[this.kind() || 'normal'], "m-8"];
  });
}
