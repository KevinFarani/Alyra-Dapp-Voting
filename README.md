# Alyra Dapp Voting

Bienvenue dans notre application décentralisée de voting ! Cette application permet de mettre en place un système de vote simplifié pour une petite organisation.

Nous avons choisi d'utiliser **Hardhat** pour la partie backend et **NextJs** pour le frontend, le tout soupoudré d'une poudre de perlimpinpin **DaisyUI**.

## Video

Une vidéo de démonstration est disponible ici : https://youtu.be/4GV2gbD0Bj8

## Utilisation immédiate

Vous pouve utiliser l'application en vous rendant ici : https://alyra-dapp-voting.vercel.app/

Veuillez nous envoyer vos adresses de test par email/discord afin que nous puissions vous enregistrer en tant que voter et démarrer une session.

_`Remarque :` L'utilisation de notre application sur le testnet Goerli rencontre des difficultés dues à la limitation dans la récupération des events. Une solution future peut être la mise en place d'une base de donnée afin de stocker les events au fur et à mesure, ou d'un SubGraph pour requêter la blockchain de manière plus optimale._

## Utilisation locale

### Prérequis
- Hardat + Dépendances
- NextJS + Dépendances
- Mettre en service le code commenté et préfixé par **USE FOR LOCAL BLOCKCHAIN**

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

## Credits

@Djangoz1 the frontrunner
@KevinFarani the backbuilder
