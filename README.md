# P7-Groupomania

Projet 7 - Groupomania - Création d'une version alpha d'application de réseau social d'entreprise. 

La partie Frontend est conçue sous *React*. 
La partie Backend elle, est faite sous *Express* et utilise une base de données MongoDb. 

**Installation :**

**Partie Frontend :**

Depuis le terminal de votre éditeur, selectionnez le dossier **frontend**. Executez alors la commande :

> npm install

Une fois fait, vous pourrez lancez la partie front de l'application en executant la commande :

> npm start

Si le démarrage de lance pas automatiquement l'application dans votre navigateur, essayez de vous rendre manuellement à l'adresse :
> http://localhost:3000/

**Partie Backend :**

Depuis le terminal de votre éditeur, selectionnez le dossier **frontend**. Executez alors la commande :

> npm install

Une fois fait, vous pourrez lancez la partie front de l'application en executant la commande :

> npm start

ou

> nodemon server

Il vous faudra créer un fichier **.env** et le compléter en suivant les indications du fichier **.env exemple**. 

**Fonctionnement global :**

Un utilisateur peut se créer un compte avec un mot de passe de 8 caractère minimum contenant des majuscules, des minuscules et des chiffres. 
Une fois inscrit, l'utilisateur peut se connecter en utilisant son email comme ID de connexion et le mot de passe qu'il aurait défini au préalable. Le mot de passe et le mail apparaîtrons cryptés dans la base de données. 

Une fois connecté, l'utilisateur peut consulter la liste des commentaires postés par les autres utilisateurs. Il peut liker ou disliker les publications. 
Il peut aussi poster son propre commentaire, y ajouter une image ou non. Il lui est possible d'éditer ses publications ou de les supprimer. 
En allant dans son profil, l'utilisateur peut supprimer son compte. 

Un utilisateur est par défaut considéré comme un utilisateur sans droits particuliers. 
Le rang d'administrateur se détermine uniquement en éditant la base de donnée et en passant "isAdmin" à True. 

Un utilisateur administrateur peut supprimer ou éditer les publications de n'importe quel utilisateur. Il a aussi les droits pour supprimer un autre utilisateur en se rendant sur son profil. 








