
## Domain Checker


## Documentation Domain Checker
Domain Checker est une plateforme web permettant de vérifier la protection des noms de domaines suivant certains protocoles. Il existe plusieurs protocoles, mais cette plateforme s’intéresse aux plus importants que sont le DMARC, le SPF et le DKIM.

### I)	Définition des protocoles

#### 1.	Le protocole SPF (Sender Policy Framework)
Le protocole SPF permet de certifier que l'IP émettrice a bien le droit d’utiliser votre nom de domaine pour envoyer un email. Ce protocole permet ainsi d'interdire à des tiers d'utiliser frauduleusement votre nom de domaine et de se faire passer pour vous. Ce protocole est particulièrement efficace contre des attaques de phishing.
#### 2.	Le protocole DKIM (Domain key Identified Mail)
Le protocole DKIM est un protocole cryptographique se basant sur l'utilisation de clés publiques qui sont publiés dans vos DNS. Le protocole permet de signer votre email avec votre nom de domaine, comme vous pourriez signer une lettre avec votre signature. Le destinataire de votre email est sûr que l'email qu'il a reçu a bien été écrit par vous et n'a pas été altéré durant sa transmission. Ce protocole est particulièrement efficace contre des attaques type "man in the middle"(homme au milieu).
#### 3.	Le protocole DMARC (Domain-based Message Authentication, Reporting and Conformance)
 Les deux protocoles DKIM et SPF sont complémentaires et répondent à des types d'attaque différentes. Néanmoins ils ont l'inconvénient de ne pas donner de conduite à tenir en cas d'attaque. Le protocole DMARC pallie ce manque et donne des indications en cas d'attaque : il est en particulier possible d'être averti si quelqu'un usurpe votre identité (si l'attaqueur utilise une IP non autorisée ou si l'attaqueur a modifié le contenu de votre email par exemple). Ce protocole permet d’indiquer au serveur de messagerie du destinataire, la politique à tenir lorsqu’un email ne satisfait pas aux politiques spf et dkim.
NB : Si ces trois (03) protocoles sont bien définis, votre domaine a une protection optimale.
 
 ### II)	Guide d’utilisation de la plateforme
 Domain checker est une plateforme relativement simple d’utilisation. Il est constitué d’une seule page et qui interagit avec vous de façon dynamique.
Sur cette page un espace dénommé Domain vous est présenté. A cet endroit nous vous invitons à entrer un nom de domaine. Cela fait, un bouton nommé scan vous permet d’envoyer votre nom de domaine pour être analysé suivant les protocoles ci-dessus cités.
Un serveur se charge en arrière-plan de scanner le nom de domaine entré et retourner les résultats sur la page.
Le serveur vérifie en un premier la validité du nom de domaine. Si celui-ci n’est pas valide, le serveur retourne un message disant que le nom de domaine entré n’est pas valide. Si valide, le serveur procède à la rechercher des enregistrements Dmarc, Spf et Dkim. 
A la fin de l’analyse, les résultats sont renvoyés automatiquement sur la page dans deux sections:
- La première section affiche les résultats partiels en montrant que le domaine possède ou non les différents enregistrements demandés. Et cela se traduit par la présence de deux sortes de voyant, rouge ou vert.
Le voyant rouge symbolise l’absence de l’enregistrement.
Le voyant vert symbolise l’existence de l’enregistrement.
Chaque enregistrement est représenté sur une colonne. Une quatrième colonne présente une note globale sur dix (10), révélant ainsi le niveau de protection pour le domaine en question.
- La deuxième section affiche les résultats détaillés pour le domaine. A ce niveau, chaque protocole est représenté sur une ligne. Si la valeur de l’enregistrement est trouvée, celle-ci est affichée avec les détails sur les différentes balises qu’elle comporte. Si l’enregistrement en question n’est pas défini sur le domaine, un message est par conséquente affiché à l’emplacement réservé pour contenir la valeur de l’enregistrement.

### III)  Les limites
Domain Checker est une plateforme fiable, mais elle rencontre un problème avec l’affichage détaillée de l’enregistrement SPF de google.com et Yahoo.com. Nonobstant cela, Domain Checker informe si ces deux domaines disposent ou non des enregistrements DMARC, SPF et DKIM. Leurs valeurs respectives sont également affichées, mais sans les détails sur les différentes balises composites.

### Conclusion
Domain Checker est une bonne plateforme pour faire un diagnostic sur les noms de domaines afin de visualiser les politiques essentielles de protection qui y sont définis. Cela permettra donc de mettre en place les mesures de sécurité sur un domaine si toutefois le diagnostic révèle une protection non optimale.
Nous travaillons à faire évoluer Domain Checker afin de procurer une plus large vue sur le niveau de protection pour les noms de domaines soumis pour analyse. Merci d’avoir choisis Domain Checker.
