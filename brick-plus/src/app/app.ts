import { Component, signal, OnInit, ApplicationRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected readonly title = signal('brick-plus');

  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  ngOnInit(): void {
    // Vérifie si le Service Worker est activé (production uniquement)
    if (this.swUpdate.isEnabled) {
      this.checkForUpdates();
      this.handleVersionUpdates();
    }
  }

  private checkForUpdates(): void {

    // Vérifie les mises à jour toutes les 6 heures
    interval(6 * 60 * 60 * 1000).subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('Vérification des mises à jour effectuée');
      });
    });

    // Vérifie une fois que l'application est stable au démarrage
    this.appRef.isStable.pipe(
      filter((isStable: boolean) => isStable)
    ).subscribe(() => {
      this.swUpdate.checkForUpdate();
    });
  }

  private handleVersionUpdates(): void {

    // Nouvelle version disponible
    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
    ).subscribe((event: VersionReadyEvent) => {

      if (confirm('Nouvelle version disponible. Voulez-vous recharger l\'application ?')) {
        window.location.reload();
      }
    });

    // Erreur non récupérable
    this.swUpdate.unrecoverable.subscribe((event: { reason: string }) => {

      console.error('Erreur Service Worker non récupérable :', event.reason);

      if (confirm('Une erreur est survenue. Voulez-vous recharger l\'application ?')) {
        window.location.reload();
      }
    });
  }
}
