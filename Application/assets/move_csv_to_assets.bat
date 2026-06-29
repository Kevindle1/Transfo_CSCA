@echo off
:: Définir les chemins
set "source_path=V:\RDV CITOYENS DATA EBF VIE MUT"
set "target_path=C:\Users\X500284\Desktop\transfo-csca\src\assets"

:: Copier le fichier
if exist "%source_path%\Outil_transfo.csv" (
    echo Fichier trouvé. Déplacement en cours...
    copy /Y "%source_path%\Outil_transfo.csv" "%target_path%\Outil_transfo.csv"
    if exist "%target_path%\Outil_transfo.csv" (
        echo Fichier déplacé avec succès dans le dossier assets.
        echo %date% %time% > "%log_file%"
    ) else (
        echo Échec du déplacement du fichier.
    )
) else (
    echo Le fichier Outil_transfo.csv n'existe pas dans le dossier source.
)

pause