# Alyra Dapp Voting

Bienvenue dans notre application décentralisée de voting ! Cette application permet de mettre en place un système de vote simplifié pour une petite organisation.

Nous avons choisi d'utiliser **Hardhat** pour la partie backend et **NextJs** pour le frontend.

## Utilisation immédiate

Vous pouve utiliser l'application en vous rendant ici : 

## Utilisation locale

### Prérequis
- Hardat + Dépendances
- NextJS + Dépendances

### Démarrage

Cloner le repo
```bash
git clone https://github.com/KevinFarani/Alyra-Dapp-Voting.git
```
Lancer la blockchain locale hardhat
```bash
cd Alyra-Dapp-Voting/backend
npx harhat node
```
Déployer le contrat
```bash
cd Alyra-Dapp-Voting/backend
npx hardhat run ./scripts/01_deploy.js --network localhost
```
Lancer le front
```bash
cd Alyra-Dapp-Voting/frontend
npm run dev
```

## Video

Une vidéo de démonstration est disponible ici : 

## Credits

@Djangoz1 the frontrunner
@KevinFarani the backbuilder
