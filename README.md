# SEF-KI Baudoku

GPS-Fotodokumentation für Baustellen – Smolens·KI.

**App öffnen:** https://lukassmolenski-prog.github.io/sefki-baudoku/

- Fotos werden per GPS automatisch der richtigen Baustelle zugeordnet
- Pflichtfoto-Lotse sagt an, welches Foto als Nächstes fehlt
- Qualitätsprüfung (Schärfe, Licht, GPS-Genauigkeit) vor dem Speichern
- Stempel im Foto: Baustelle, Zeit, Koordinaten, Blickrichtung
- Karte mit Blickrichtungen, Galerie, PDF-Bericht, ZIP-Export (Fotos + KML/GeoJSON + CSV)
- Läuft offline und lässt sich als App installieren
- **Geisterbild**: Vorher-Foto halbtransparent im Sucher, Lotse zum gleichen Standpunkt und zur gleichen Blickrichtung
- **KI-Bildprüfung** (Claude): Pflichtinhalte, Tiefe vom Meterstab ablesen, Gesichter und Kennzeichen finden
- **Datenschutz-Automatik**: Personen und Kennzeichen werden vor dem Speichern unkenntlich gemacht
- **Beweissicher**: SHA-256-Fingerabdruck, fortlaufende Prüfkette, Zeitstempel über OpenTimestamps, Echtheitsprüfung
- **Trassen-Aufnahme**: Leitungsverlauf ablaufen, Punkte markieren, RTK-Empfänger (Bluetooth/NMEA oder Mock-Standort), Export als Shapefile, DXF, GeoJSON, KML, CSV in ETRS89/UTM
- **Freihändig**: Sprachbefehle „Foto“, „Speichern“, „Nochmal“, „Nächstes“, „Punkt“, „Notiz …“
- **KI-Tagesbericht**: Bautagebuch aus Fotos, Notizen und Trassen – mit Wetter, als PDF
- **Bauplan (indoor)**: Grundriss als Foto, Bild oder PDF hinterlegen, Fotos und Mängel per Tipp genau auf dem Plan verorten – auch dort, wo GPS nicht reicht
- **Mängelverwaltung**: zuständige Firma, Frist, Status (Offen → In Arbeit → Erledigt → Abgenommen) mit Verlauf, Überfällig-Warnung, Weitergabe per Mail/Teilen, Liste als PDF, CSV oder Kalender (ICS)
- **Bautagebuch**: Wetter automatisch, Personal und Geräte mit Stunden, Behinderungen – fließt in den Tagesbericht
- **Abnahmeprotokoll**: Ergebnis, offene Mängel, Unterschrift von Auftraggeber und Auftragnehmer direkt auf dem Handy, versiegelt und als PDF
- **Eigene Vorlagen**: Checklisten im Büro bearbeiten und als Datei ans Team verteilen; Firmen- und Kundenlogo im Bericht
- **Video, Sprachnotizen, 360°-Fotos** (Panorama-Betrachter)
- **Schnittstellen**: Webhook zu Büro-Software (z. B. Make, Zapier, Power Automate), Projekt-Export als JSON, Mängel als CSV/ICS
- **Sprach-Rundgang**: SEF-KI erklärt jeden Knopf automatisch nacheinander – mit Spotlight und Sprache, Kapitel einzeln wählbar, Pause/Zurück/Weiter (Start im Cockpit über „Rundgang“ oder per Sprachbefehl)

## Aufs Handy
1. Link oben auf dem Handy öffnen, Standort und Kamera erlauben
2. Android (Chrome): Menü ⋮ → „App installieren“ · iPhone (Safari): Teilen → „Zum Home-Bildschirm“
3. Einstellungen (Zahnrad) → „Beispieldaten entfernen“, dann erste Baustelle anlegen

Die Fotos liegen nur auf dem Handy. Regelmäßig über „Bericht“ ein ZIP oder in den Einstellungen ein Komplett-Backup sichern.

## Urheberrecht
© 2026 Lukas Smolenski · Smolens·KI. Alle Rechte vorbehalten – siehe [LICENSE](LICENSE).
Das Repository ist nur öffentlich, damit GitHub Pages die App ausliefern kann. Das ist keine Erlaubnis zur Weiterverwendung.
