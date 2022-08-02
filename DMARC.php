<?php 
header('Content-type:application/json;charset=utf-8');
/*On attribu a $domaine la valeur entré par l'utilisateur*/
     $domaine = (isset($_GET["domainNAme"])) ? $_GET["domainNAme"] : "";
     $resultat="Résultat pour ";
     $resultatDetail="Résultat détaillé pour ";
     /*Reponse a renvoyer si le nom de domaine entrer est le caractere vide*/
     if($domaine==""){
        $reponse="Veuillez entrer un nom de domaine";
        $reponseJson=json_encode($reponse);
        echo($reponseJson);
     }
     /*On verifie que le domaine existe et on recherche les enregistrement spf, dmarc et dkim*/
     else {
        $dns=shell_exec('nslookup -q=MX '.$domaine);
        $spf=shell_exec('nslookup -q=txt '.$domaine);
        $dmarc=shell_exec('nslookup -type=txt _dmarc.'.$domaine);
        /*Si le nom de domaine est valide on renvoie la valeur de la'enregistrement spf*/
        if($spf && $dns){
            $SPF=$spf;
        }
        /*Si le nom de domaine est valide on renvoie la valeur de la'enregistrement dmarc*/
        if($dmarc && $dns){
            $DMARC=$dmarc;
        }
        /*On met la reponse dans un array*/
         $reponse=array(
            "Txt_spf"=>$SPF,
            "Txt_dmarc"=>$DMARC,
            "Txt_dns"=>$dns,
            "Txt_Resultat"=>$resultat,
            "Txt_Resultat_Detail"=>$resultatDetail,
            "Txt_domaine"=>$domaine
         );
         /*On encode l'array en format json*/
         $reponseJson=json_encode($reponse);
         /*On envoie la reponse du serveur*/
         echo ($reponseJson);
     }
     
    /*//Recuperation de l'enregistrement spf
    $domaine="ecodev.dev"; 
    $spf=shell_exec('nslookup -q=txt '.$domaine);
    $spf=stristr($spf,'"v');
    echo"Enregistrement SPF pour".$domaine."=";
    echo "$spf"; 
    echo "<br>"; 
    //Recuperation de l'enregistrement dmarc
    $dmarc=shell_exec('nslookup -type=txt _dmarc.'.$domaine);
    $dmarc=stristr($dmarc,'"v');
    echo"Enregistrement DMARC pour ".$domaine."=";
    echo"$dmarc";
    //Recuperation de l'enregistrement DKIM*/
?>
