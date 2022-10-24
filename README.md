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

Depuis le terminal de votre éditeur, selectionnez le dossier **backend**. Executez alors la commande :

> npm install

Une fois fait, vous pourrez lancez la partie front de l'application en executant la commande :

> npm start

ou

> nodemon server

Il vous faudra créer un fichier **.env** dans le répertoire principal backend et le compléter en suivant les indications du fichier **.env exemple**. 

Pour définir la photo de profil par défaut, il vous faut créer un dossier **images** dans le dossier principal backend. Dans ce dossier **images**, vous devez créer un dossier default. Ajoutez dans images/default votre image de photo de profil par défaut en la nommant "avatardefault"

**Fonctionnement global :**

Un utilisateur peut se créer un compte avec un mot de passe de 8 caractère minimum contenant des majuscules, des minuscules et des chiffres. 
Une fois inscrit, l'utilisateur peut se connecter en utilisant son email comme ID de connexion et le mot de passe qu'il aurait défini au préalable. Le mot de passe et le mail apparaîtrons cryptés dans la base de données. 

Une fois connecté, l'utilisateur peut consulter la liste des commentaires postés par les autres utilisateurs. Il peut liker ou disliker les publications. 
Il peut aussi poster son propre commentaire, y ajouter une image ou non. Il lui est possible d'éditer ses publications ou de les supprimer. L'utilisateur peut aussi créer une publication sans image, puis l'éditer et y ajouter une image. Il est aussi capable de créer une publication avec une image et de l'éditer afin de supprimer l'image en question. 

En allant dans son profil, l'utilisateur éditer son propre compte. Pour l'heure, il peut modifier son nom et son prénom et se selectionner une photo de profil. En cas de besoin, il peut utiliser le bouton supprimer sur sa photo de profil pour réutiliser la photo de profil définie par défaut sur le site. 
Les utilisateurs peuvent visiter les profils des autres mais n'ont évidemment pas la possibilité de les modifier.

Un utilisateur est par défaut considéré comme un utilisateur sans droits particuliers. 
Le rang d'administrateur se détermine uniquement en éditant la base de données. 

Pour créer un administrateur, vous pouvez créer un compte et aller éditer ses propriétés dans la base de donnée mongoDB manuellement en passant "isAdmin" à true.

Un utilisateur administrateur peut supprimer ou éditer les publications de n'importe quel utilisateur. Il a aussi les droits pour supprimer un autre utilisateur en se rendant sur son profil et peut modifier ses informations publiques. 








