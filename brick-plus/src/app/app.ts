import { Component, signal, OnInit, ApplicationRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('brick-plus');

  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  ngOnInit(): void {
    // Vérifier que le Service Worker est activé
    if (this.swUpdate.isEnabled) {
      this.checkForUpdates();
      this.handleVersionUpdates();
    }
  }

  private checkForUpdates(): void {
    // Vérifier les mises à jour toutes les 6 heures
    interval(6 * 60 * 60 * 1000).subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('Vérification des mises à jour effectuée');
      });
    });

    // Vérifier quand l'app devient stable (au premier chargement)
    this.appRef.isStable.pipe(
      filter(isStable => isStable)
    ).subscribe(() => {
      this.swUpdate.checkForUpdate();
    });
  }

  private handleVersionUpdates(): void {
    // Écouter les nouvelles versions disponibles
    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
    ).subscribe(event => {
      if (confirm('Nouvelle version disponible. Voulez-vous recharger l\'application ?')) {
        window.location.reload();
      }
    });

    // Gérer les erreurs de Service Worker non récupérables
    this.swUpdate.unrecoverable.subscribe(event => {
      console.error('Erreur Service Worker non récupérable:', event.reason);
      if (confirm('Une erreur est survenue. Voulez-vous recharger l\'application ?')) {
        window.location.reload();
      }
    });
  }
}
