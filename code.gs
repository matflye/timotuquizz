function HelloWorld() {
  
  Logger.log("hello !");

}

function listadf(){
    // include the API Key
    const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';
     
    // set the endpoint
    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?ended_after=2022-11-31&ended_before=2022-12-08&id_centre_de_formation=4"; 
//    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?ended_after=2022-11-31&ended_before=2022-12-08";
//    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?id=97";
     
    // set the params object
    const params = {
      'method' : 'get',
        headers: {
          Authorization: API_KEY
        }
      }
     
    // call the API
    const response = UrlFetchApp.fetch(url,params);
    var responseJson = JSON.parse(response.getContentText());
    var responseCount = responseJson.length;
/*
    Logger.log('Total ADF: '+ responseCount); //
    Logger.log(responseJson[0].numero_complet); // le numéro complet de l'élement 0

    for (i = 0; i < responseCount; i++) {
      Logger.log(responseJson[i].numero_complet 
            + ' - Centre de formation: ' + responseJson[i].id_centre_de_formation 
            + ' - lien pre quizz: ' + responseJson[i].c_lien_pre_quizz
            + ' - lien post quizz: ' + responseJson[i].c_lien_post_quizz
            + ' - module: ' + responseJson[i].c_lien_post_quizz);
    }
*/
  var  repadf = responseJson ;

  return repadf ;

}

function listmodules(){
    // include the API Key
    const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';
     
    // set the endpoint
    const url = "https://pro.dendreo.com/timotu/api/modules.php"; 
//    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?ended_after=2022-11-31&ended_before=2022-12-08";
//    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?id=97";
     
    // set the params object
    const params = {
      'method' : 'get',
        headers: {
          Authorization: API_KEY
        }
      }
     
    // call the API
    const response = UrlFetchApp.fetch(url,params);
    var responseJson = JSON.parse(response.getContentText());
    var responseCount = responseJson.length;

    Logger.log('Total MODULES: '+ responseCount); //
    
    /*

    for (i = 0; i < responseCount; i++) {
      var adfCount = responseJson[i].actions_de_formation_programmees.length;
      Logger.log(responseJson[i].numero_complet 
            + ' - id module: ' + responseJson[i].id_module 
            + ' - intitule: ' + responseJson[i].intitule 
            + ' - modele quizz: ' + responseJson[i].c_nom_modele_quizz 
            + ' - adf programmees : ' );
            for (j = 0; j < adfCount; j++) {
              Logger.log( ' - p : ' + responseJson[i].actions_de_formation_programmees[j].id_action_de_formation
              + ' - intitule: ' + responseJson[i].actions_de_formation_programmees[j].intitule
              + ' - date debut : ' + responseJson[i].actions_de_formation_programmees[j].date_debut);
            }
            
    }
    */
    var repmodules = responseJson ;
    return repmodules ;

    

}



function categorie_produit(){

    // include the API Key
    const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';
     
    // set the endpoint
    const url = "https://pro.dendreo.com/timotu/api/categories_produit.php";
     
    // set the params object
    const params = {
      'method' : 'get',
        headers: {
          Authorization: API_KEY
        }
      }
     
    // call the API
    const response = UrlFetchApp.fetch(url,params);
    Logger.log(response);

}


function associeadflienquiz(){

  var resultadf = listadf() ;
  const adfCount = resultadf.length ;
  var resultModules = listmodules();
  const modulesCount = resultModules.length;

  // on fait tourner toutes les formations
      

      for (i = 0; i < adfCount; i++) {
        Logger.log(resultadf[i].numero_complet 
              + ' - Centre de formation: ' + resultadf[i].id_centre_de_formation 
              + ' - lien pre quizz: ' + resultadf[i].c_lien_pre_quizz
              + ' - lien post quizz: ' + resultadf[i].c_lien_post_quizz);
        if (resultadf[i].c_lien_pre_quizz == "") {
         
          Logger.log(' création du lien pre quiz pour adf avec id_formation = : ' + resultadf[i].id_action_de_formation);

          // recherche du module associé à l'adf à partir de l'id_action_de_formation de l'adf

          

          for (j = 0; j < modulesCount; j++) {
            var adfProgCount = resultModules[j].actions_de_formation_programmees.length;
            /*Logger.log(resultModules[i].numero_complet 
                + ' - id module: ' + resultModules[i].id_module 
                + ' - intitule: ' + resultModules[i].intitule 
                + ' - modele quizz: ' + resultModules[i].c_nom_modele_quizz 
                + ' - adf programmees : ' );*/
            for ( k = 0; k < adfProgCount; k++) {
              /*Logger.log( ' - p : ' + resultModules[i].actions_de_formation_programmees[j].id_action_de_formation
              + ' - intitule: ' + resultModules[i].actions_de_formation_programmees[j].intitule
              + ' - date debut : ' + resultModules[i].actions_de_formation_programmees[j].date_debut);*/
              if (resultModules[j].actions_de_formation_programmees[k].id_action_de_formation == resultadf[i].id_action_de_formation){
                
                var idModuleLien = resultModules[j].id_module;
                var idModeleQuiz = resultModules[j].c_nom_modele_quizz;
                Logger.log( 'intitule du module de la formation : ' + resultModules[j].intitule 
                    + ' - numero complet module : ' + resultModules[j].numero_complet
                    + ' - id module : ' + resultModules[j].id_module
                    + ' - modeleQuizAcreer: ' + idModeleQuiz);

                // lancer la création des quizz et des liens correspondant
                // resultcrea = copiequizz(nbModeleQuiz,);
              }
            }
            
          }


        }
      }


}

function copiequizz(AidModeleQuiz, Aadf_complet, folder){

    const idModeleQuiz = "1OtTzBFQfSjS7zmYwpZpg_6U4lNzc9cCv6Z4c5_eZFZI" ;
    const adf_complet = "ADF_20220566" ;
     
    var file = DriveApp.getFileById(idModeleQuiz);
    //var rep = "1awcXlZ0d5kyZAcGLPeJ-83A9wMee2Ad1";
    var folder = DriveApp.getFolderById("1awcXlZ0d5kyZAcGLPeJ-83A9wMee2Ad1");
    var newfile=file.makeCopy('quizz-'+ adf_complet,folder);// here you can define the copy name the way you want...
    //newfile.addToFolder(folder);//  add the copy to the folder
    //newfile.removeFromFolder(DocsList.getRootFolder());// and remove it from your root folder


}


function recupSessionDendreo() {

    // include the API Key
    //const API_KEY = '70GlKkHdVCi53WqONn97';
    const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';

    // set the endpoint
    //const url = 'https://developers.example.com/v1/abc';
    var url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php";
    //var url = "https://api.coindesk.com/v1/bpi/currentprice.json" ;
    //var url = "https://api.ipify.org?format=json"

    // set the params object
    var options = {
      'method' : 'get'
      //'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      //'payload' : JSON.stringify(data)
    };
    /*
    const params = {
      method : get,
        headers: {
          Authorization:API_KEY
        },
      muteHttpExceptions: true
      }
    */
    const params = {
      muteHttpExceptions: true,
      'contentType': 'application/json',
      }
    // call the API
    //var res = UrlFetchApp.fetch(url,params);

    var res = UrlFetchApp.fetch(url + '&key=' + API_KEY,params);
    //var res2 = UrlFetchApp.fetch(url);

    Logger.log(res.getContentText());
    //Logger.log(res);
    //Logger.log(res2);

    return res;

}


function AfficheSessionsDendreo() {

    // activer le feuille googlesheet pour l'affichage

    var idsheet = "1fFarlzuETD0gIJzDFzijyry5j8ULgLL3NP9zAnorTZE";
    var ss = SpreadsheetApp.openById(idsheet);
    SpreadsheetApp.setActiveSpreadsheet(ss);
    Logger.log(ss.getName());

    //range.setValue("hello");

    // injection des sessions dans sheet
    var resultat = recupSessionDendreo();
    /*var sessionData = JSON.parse(resultat.getContentText());
    //id_action_de_formation
    //numero_complet
    for ( var i=0 ; i < sessionData.length ; i++){

      var range = ss.getSheets()[0].getRange('1:i+1');
      SpreadsheetApp.setActiveRange(range);

      range.setValue(sessionData[i].id_action_de_formation);

    }
    */

    var range = ss.getSheets()[0].getRange('1:1');
    range.setValue(resultat);


}




