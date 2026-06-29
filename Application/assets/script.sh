#!/bin/bash

# Chemin du fichier source sur le réseau
CSV_FILE_PATH="/mnt/vdrive/DATA DEV ET PILOTAGE - E BUSINESS FACTORY/01 ECHANGES/Outil_transfo.csv"

# Nom du fichier après copie
CSV_FILE_NAME="Outil_transfo.csv"

# Répertoire où votre application Angular stocke les fichiers statiques (modifiez en fonction de votre projet)
ANGULAR_ASSETS_DIR="src/assets/"

# Vérification si le fichier source existe
if [ -f "$CSV_FILE_PATH" ]; then
  echo "Fichier trouvé : $CSV_FILE_PATH"

  # Copie du fichier CSV vers le répertoire des assets Angular
  cp "$CSV_FILE_PATH" "$ANGULAR_ASSETS_DIR/$CSV_FILE_NAME"

  if [ $? -eq 0 ]; then
    echo "Le fichier CSV a été copié avec succès vers $ANGULAR_ASSETS_DIR"
  else
    echo "Erreur lors de la copie du fichier CSV"
  fi
else
  echo "Le fichier source n'existe pas : $CSV_FILE_PATH"
fi
