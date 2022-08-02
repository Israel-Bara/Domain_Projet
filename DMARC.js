/*Fonction de création de l'objet XMLHttpRequest en fonction de la version des navigateurs*/
function getXMLHttpRequest() {
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
   
	return xhr;  
}
//Creation de l'objet XMLHttpRequest
var xhr=getXMLHttpRequest();
/*Fonction appelé lorsque l'utilisateur clic sur le boutton scan pour envoyer le nom de domaine*/
function process(){
   if(xhr.readyState<4 && xhr.status!=200){
      document.getElementById("gif").innerHTML="<img src='image/patiente.gif'/>";
      document.getElementById("buttonHidden").style.visibility="hidden";
   }
   if(xhr.readyState==0 || xhr.readyState==4){
        /*Recuperation de la valeur du nom de domaine*/
        domainNAme=encodeURIComponent(document.getElementById("domainNAme").value);
        /*Preparation de la requete*/
        xhr.open("GET","DMARC.php?domainNAme="+domainNAme,true);
        /*Fonction permettant de recuperer les donnees du serveur */
        xhr.onreadystatechange=handleResponse;
        /*Envoie des donnees*/
        xhr.send(null);
}
else{
   /*Rappeler la fonction process tous les 1seconde*/
   setTimeout('process()',1000);
}
}
/*Definition de la fonction de recuperation de donnees du serveur*/
function handleResponse(){
   /*Si le serveur est pret a communiquer*/
   if(xhr.readyState==4 && xhr.status==200){
         document.getElementById("buttonHidden").style.visibility="visible";
         document.getElementById("gif").style.display="none";
         /*Recuperation des donnees du serveur avec responseText*/
         responseType=JSON;
         reponse=xhr.responseText;
         reponse=JSON.parse(reponse);
         /*Action a realiser lorsque l'utilisateur entre un nom de domaine vide*/
         if(reponse==="Veuillez entrer un nom de domaine"){
            document.getElementById("enterDomaine").innerHTML="Veuillez entrer un nom de domaine";
            document.getElementById("domainNAme").style.borderColor="red";
            document.getElementById("enterDomaine").style.color="red";
            document.getElementById("resultatDomaine").innerHTML="";
            document.getElementById("resulatDetail").innerHTML="";
            document.getElementById("resultatDomaine").style.color="black";
            document.getElementById("resulatDetail").style.color="black";
            document.getElementById("texteSPF").style.color="black";
            document.getElementById("texteDmarc").style.color="black";
            document.getElementById("col11").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col12").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col21").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col22").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("codeDMARC").innerHTML="";
            document.getElementById("codeSPF").innerHTML="";
            document.getElementById("codeSPF").style.color="red";
            document.getElementById("codeDMARC").style.color="red";
            document.getElementById("iconSVGDmarc").style.color="red";
            document.getElementById("iconSVGSpf").style.color="red";
            document.getElementById("texteDmarc").innerHTML="";
            document.getElementById("texteSPF").innerHTML="";
            document.getElementById("texteSPF").style.color="black";
            document.getElementById("texteDmarc").style.color="black";
         }
         else{
            /*Recuperation des enregistrement dmarc, spf,dkim et le dns dans des variable*/
            dmarc=reponse["Txt_dmarc"];
            spf=reponse["Txt_spf"];
            dns=reponse["Txt_dns"];
            console.log(spf);
            /*Actions a realiser si le domaine entrer n'est pas un domaine valide*/
            if(dns.includes("MX preference")==false){
                document.getElementById("enterDomaine").innerHTML="Entrez un nom de domaine valide";
                document.getElementById("domainNAme").style.borderColor="red";
                document.getElementById("enterDomaine").style.color="red";
                document.getElementById("codeDMARC").innerHTML="Le nom de domaine entré est invalide";
                document.getElementById("codeSPF").innerHTML="Le nom de domaine entré est invalide";
                document.getElementById("codeSPF").style.color="red";
                document.getElementById("codeDMARC").style.color="red";
                document.getElementById("iconSVGDmarc").style.color="red";
                document.getElementById("iconSVGSpf").style.color="red";
                document.getElementById("col12").style.backgroundColor = "red";
                document.getElementById("col22").style.backgroundColor = "red";
                document.getElementById("resultatDomaine").style.color="black";
                document.getElementById("resulatDetail").style.color="black";
                document.getElementById("resultatDomaine").innerHTML="";
                document.getElementById("resulatDetail").innerHTML="";
                document.getElementById("col11").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("col12").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("col21").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("col22").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("texteDmarc").innerHTML="";
                document.getElementById("texteSPF").innerHTML="";
                document.getElementById("texteSPF").style.color="black";
                document.getElementById("texteDmarc").style.color="black";
               }
             else{
               /*Si le nom de domaine est valide, algorithme pour recuperer la valeur des enregistrements
                 spf,dmarc,dkim, qui sont au milieu d'un longue chaine de caractere*/
                spf=spf.substring(spf.lastIndexOf('"v=spf'));
                dmarc=dmarc.substring(dmarc.lastIndexOf('"v=DMARC'));
                /*Action a realiser si le nom de domaine est valide et ne dispose pas d'enregistrement dmarc*/
                if(dmarc.includes('"v=DMARC')==false){
                    document.getElementById("codeDMARC").value="Votre domaine ne dispose pas d'enregistrement DMARC";
                    document.getElementById("codeDMARC").style.color="red";
                    document.getElementById("col12").style.backgroundColor = "red";
                    document.getElementById("col11").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGDmarc").style.color="red";
                    document.getElementById("texteDmarc").innerHTML="Nous n'avons trouvé aucun enregistrement DMARC associé à votre domaine.Vous devez générer un enregistrement DMARC pour protéger votre domaine contre les abus par les hameçonneurs et les spammeurs"
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("recordDmarc").innerHTML="";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                  }
                 else{
                  /*Action a realiser si le nom de domaine est valide et dispose d'un enregistrement dmarc, 
                   on recupere la valeur et on envoie sur la page html*/
                    document.getElementById("codeDMARC").value="txt= "+dmarc;
                    /*Decomposition et explication detaillee sur la valeur de l'enregistrement dmarc*/
                    dmarc=dmarc.split(";");
                    for(var i=0;i<dmarc.length;i++){
                     if(dmarc[i].includes("v=dmarc")){
                        document.getElementById("recordDmarc").innerHTML="<span>Version "+dmarc[i]+"</span>: La balise v est l'une des balises DMARC représentant la version du protocole DMARC et a toujours la valeur v=DMARC1.";
                     }
                     else if(dmarc[i].includes("p=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Politique "+dmarc[i]+ "</span>: Balise qui indique la règle que vous souhaitez que les opérateurs de messagerie appliquent lorsque votre message échoue à l'authentification DMARC. Vous pouvez choisir entre rejeter, mettre en quarantaine et aucun.";
                     }
                     else if(dmarc[i].includes("sp=reject")||dmarc[i].includes("sp=none")||dmarc[i].includes("sp=quarantine")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Politique Sous-domaine "+dmarc[i]+"</span>: La balise sp est configurée pour définir un mode de politique pour vos sous-domaines.";
                     }
                     else if(dmarc[i].includes("pct=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Pourcentage "+dmarc[i]+"</span>: Cette balise représente le pourcentage d'emails auxquels le mode de politique est applicable.";
                     }
                     else if(dmarc[i].includes("rua=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Rapports agrégés "+dmarc[i]+"</span>: La balise rua est l'une des balises DMARC facultatives qui spécifie l'adresse électronique ou le serveur Web à partir duquel les organisations déclarantes doivent envoyer leurs données d'identification.";
                     }
                     else if(dmarc[i].includes("ruf=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Rapport légal d'échec "+dmarc[i]+"</span>: Cette balise permet aux opérateurs de messagerie de savoir où vous souhaitez recevoir vos rapports d'investigation numérique (messages). Ces rapports sont plus détaillés et sont conçus pour être remis par les opérateurs de messagerie presque immédiatement après la détection d'un échec d'authentification DMARC. Toutefois, en raison de problèmes potentiels liées à la confidentialité et à la performance, la majorité des opérateurs de messagerie ne les envoient pas. ";
                     }
                     else if(dmarc[i].includes("fo=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Option de rapport d'échec "+dmarc[i]+"</span>: Cette balise correspond aux options de rapport d'échec que les propriétaires de domaine peuvent choisir. Si vous n'avez pas activé ruf pour votre domaine, vous pouvez ignorer ce point.";
                     }
                     else if(dmarc[i].includes("aspf=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Alignement Spf "+dmarc[i]+"</span>: Cette balise représente le mode d'alignement du SPF. La valeur peut être soit stricte (s) soit relaxée (r).";
                     }
                     else if(dmarc[i].includes("adkim=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Alignement Dkim "+dmarc[i]+"</span>: De même, la balise adkim représente le mode d'alignement DKIM, dont la valeur peut être soit stricte (s), soit relaxée (r).";
                     }
                     else if(dmarc[i].includes("rf=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Format Rapport "+dmarc[i]+"</span>: La balise DMARC rf spécifie les différents formats pour les rapports légaux.";
                     }
                     else if(dmarc[i].includes("ri=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Interval de temps "+dmarc[i]+"</span>: Cette balise ri indique l'intervalle de temps en secondes entre deux rapports agrégés consécutifs envoyés par l'organisme de rapport au propriétaire du domaine.";
                     }
                  }    
                    document.getElementById("codeDMARC").style.color="blue";
                    document.getElementById("col11").style.backgroundColor = "green";
                    document.getElementById("col12").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGDmarc").style.color="green";
                    document.getElementById("texteDmarc").innerHTML="Votre domaine a un enregistrement DMARC valide et votre politique DMARC empêchera les abus de votre domaine par les hameçonneurs et les spammeurs";
                    document.getElementById("texteDmarc").style.color="black";
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resultatDomaine").style.color="black";
                    document.getElementById("resulatDetail").style.color="black";
                  }
                   /*Action a realiser si le nom de domaine est valide et ne dispose pas d'enregistrement dmarc*/
                 if(spf.includes('"v=spf')==false ){
                   document.getElementById("codeSPF").value="Votre domaine ne dispose pas d'enregistrement SPF";
                    document.getElementById("codeSPF").style.color="red";
                    document.getElementById("col22").style.backgroundColor = "red";
                    document.getElementById("col21").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGSpf").style.color="red";
                    document.getElementById("texteSPF").innerHTML="Nous n'avons trouvé aucun enregistrement SPF associé à votre domaine. Vous devez générer un enregistrement SPF pour protéger votre domaine contre les attaques de phishing par e-mail."
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("recordSpf").innerHTML="";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                 }
                 else{
                   /*Action a realiser si le nom de domaine est valide et dispose d'un enregistrement spf, 
                     on recupere la valeur et on envoie sur la page html*/
                    document.querySelector("#codeSPF").innerHTML="txt= "+spf;
                  /*Decomposition et explication detaillee sur la valeur de l'enregistrement spf*/
                    spf=spf.split(" ");
                    for(var i=0; i<spf.length;i++){
                       if(spf[i].includes('"v=spf')){
                        console.log(spf[i]);
                        var def=" La balise v est obligatoire et représente la version du protocole.";
                        document.querySelector("#recordSpf").innerHTML="<span>"+spf[i]+":</span> "+def;
                     }
                       else if(spf[i].includes("mx")){
                        console.log(spf[i]);
                        var def=" Un enregistrement MX définit les serveurs de messagerie à utiliser lorsqu'un utilisateur relaie un e-mail . Le mécanisme « MX » approuve automatiquement ces serveurs.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span>" +def;
                      }
                       else if(spf[i].includes("a")){
                        console.log(spf[i]);
                        var def=" Tous les enregistrements A du  domaine  sont testés. Si l'IP du client se trouve parmi eux, ce mécanisme correspond. Les enregistrements A doivent correspondre exactement à l'adresse IP du client, sauf si une  longueur de préfixe  est fournie, auquel cas chaque adresse IP renvoyée par la recherche A sera étendue à son préfixe CIDR correspondant, et l'adresse IP du client sera recherchée dans ce sous-réseau.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("ip4")){
                        console.log(spf[i]);
                        var def=" Spécifie une adresse IP IPv4 ou une plage CIDR IP autorisée à envoyer du courrier pour le domaine.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("ip6")){
                        console.log(spf[i]);
                        var def=" Spécifie une adresse IP IPv6 ou une plage CIDR IP autorisée à envoyer du courrier pour le domaine.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("include")){
                        console.log(spf[i]);
                        var def=" Le domaine spécifié   est recherché pour une correspondance. Si la recherche ne renvoie pas de correspondance ou d'erreur, le traitement passe à la directive suivante.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("exists")){
                        console.log(spf[i]);
                        var def=" Cette balise effectue une recherche d'enregistrement A sur le domaine utilisé pour voir s'il en existe un. Si l'enregistrement A existe, cela passe.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("ptr")){
                        console.log(spf[i]);
                        var def=" Cette balise permet d'inclure l'intégralité de l'enregistrement SPF d'un autre domaine ou sous-domaine. Ceci est souvent utilisé si vous utilisez un service tiers pour envoyer des e-mails ou si vous avez plusieurs domaines/sous-domaines qui envoient des e-mails.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("all")){
                        console.log(spf[i]);
                        var def=" Cette balise DOIT aller à la fin de votre enregistrement et fournit des instructions sur ce qu'un destinataire doit faire s'il n'y a pas de correspondance avec votre enregistrement SPF. Il existe 3 options courantes utilisées qui permettent à un expéditeur de dire à l'utilisateur de rejeter le courrier qui correspond à l'enregistrement ( -all ), de traiter le courrier comme suspect ( ~all ) et une recommandation neutre ( ?all ) qui laisse le choix à destinataire. Dans la plupart des cas, traiter le courrier comme suspect fonctionnera ( ~all ) car cela entraînera généralement le marquage des messages non correspondants comme spam.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }                      
                    }
                    document.getElementById("codeSPF").style.color="blue";
                    document.getElementById("col21").style.backgroundColor = "green";
                    document.getElementById("col22").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGSpf").style.color="green";
                    document.getElementById("texteSPF").innerHTML="Votre domaine a un enregistrement SPF valide. Vous pouvez suivre, gérer et améliorer vos normes d'authentification des e-mails en utilisant notre plateforme.";
                    document.getElementById("texteSPF").style.color="black";
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resultatDomaine").style.color="black";
                    document.getElementById("resulatDetail").style.color="black";
                  }
             }
         }     
    }
    
}
