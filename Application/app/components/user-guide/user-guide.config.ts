// user-guide.config.ts
export const UserGuideConfig = {
    title: 'Guide d\'utilisation',
    welcomeMessage: 'Bienvenue dans l\'application de Premiumisation. Suivez ces étapes pour utiliser pleinement toutes les fonctionnalités :',
    steps: [
      {
        number: '1',
        title: 'Recherche de clients',
        content: 'Utilisez la barre de recherche en haut de l\'écran pour trouver des clients. Vous pouvez rechercher par nom, agence, DAV, ou conseiller. Entrez le terme de recherche et sélectionnez le type de recherche dans le menu déroulant. Cliquez sur "Rechercher" pour afficher les résultats.'
      },
      {
        number: '2',
        title: 'Sélection d\'un client',
        content: 'Une fois les résultats affichés, cliquez sur un client pour voir ses informations détaillées. Vous accéderez ainsi à la fiche client.'
      },
      {
        number: '3',
        title: 'Consultation des propositions de contrat',
        content: 'Vous pouvez maintenant consulter les offres de contrat avec des différentes propositions personnalisées en fonction de votre profil.'
      },
      {
        number: '4',
        title: 'Modification du découvert autorisé',
        content: 'Vous pouvez modifier le montant de découvert autorisé pour le client en ajoutant une nouvelle valeur et en validant. Notez que l\'option Sécuri Trésorerie sera désactivée automatiquement si le découvert est à 0.'
      }
    ]
  };