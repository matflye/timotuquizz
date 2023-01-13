// Pour tester les sessions et ajouter les liens pre et post formation des quiz , il faut lancer la fonction associeadflienquiz()

// Pour récupérer les resultats d'un quiz , lancer recupresultsquiz()

function ArrayAvg(myArray) {
  var i = 0,
    summ = 0,
    ArrayLen = myArray.length;
  while (i < ArrayLen) {
    summ = summ + myArray[i++];
  }
  return summ / ArrayLen;
}

// fonction pour récupérer l'id du quiz à partir du lien
function extractQuizId() {
  const quiz_Lien =
    "https://docs.google.com/forms/d/e/1FAIpQLSfT-7PiWOOiVBVC4y1ZHcp61QnUQnvX38gcJ5aU0ocx_K3LNw/viewform";
}

function recupresultsquiz() {
  const quiz_id = "1lGgN1UHrU3rUJgekfnz3LKtnY9MgfLeiuNttBd3nq3Y";

  var form = FormApp.openById(quiz_id);
  //var formResponses = form.getResponses();

  var formResponses = form.getResponses();
  var formItems = form.getItems();

  Logger.log("nb reponses: " + formResponses.length); //

  // stocker les resultats de chaque quiz
  var scoretot = new Array();

  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];

    scoretot[i] = 0;

    for (var j = 0; j < formItems.length; j++) {
      var item = formItems[j];

      var points = item.asMultipleChoiceItem().getPoints();
      var itemResponse = formResponse.getGradableResponseForItem(item);
      var gradableResponseForItem =
        formResponse.getGradableResponseForItem(item);
      var score = gradableResponseForItem.getScore();

      scoretot[i] = scoretot[i] + score;

      Logger.log(
        "points: " +
          points +
          " pour i=" +
          i +
          " et j=" +
          j +
          "itemresponse = " +
          itemResponse.getResponse() +
          " score=" +
          score +
          " scoretot=" +
          scoretot[i]
      ); //
    }
  }

  var moyQuiz = ArrayAvg(scoretot);

  Logger.log("moyenne des resultats du quiz: " + moyQuiz);
}

function listadf() {
  // include the API Key
  const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';
  // set the endpoint
  const url =
    "https://pro.dendreo.com/timotu/api/actions_de_formation.php?id_centre_de_formation=5";
  //const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?ended_after=2022-11-15&ended_before=2022-12-08&id_centre_de_formation=5";
  //    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?ended_after=2022-11-31&ended_before=2022-12-08";
  //    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?id=97";
  // set the params object
  const params = {
    method: "get",
    headers: {
      Authorization: API_KEY,
    },
  };
  // call the API
  const response = UrlFetchApp.fetch(url, params);
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
  var repadf = responseJson;

  return repadf;
}

function listmodules() {
  // include the API Key
  const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';
  // set the endpoint
  const url = "https://pro.dendreo.com/timotu/api/modules.php";
  //    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?ended_after=2022-11-31&ended_before=2022-12-08";
  //    const url = "https://pro.dendreo.com/timotu/api/actions_de_formation.php?id=97";
  // set the params object
  const params = {
    method: "get",
    headers: {
      Authorization: API_KEY,
    },
  };
  // call the API
  const response = UrlFetchApp.fetch(url, params);
  var responseJson = JSON.parse(response.getContentText());
  var responseCount = responseJson.length;

  Logger.log("Total MODULES: " + responseCount); //

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
  var repmodules = responseJson;
  return repmodules;
}

function categorie_produit() {
  // include the API Key
  const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';
  // set the endpoint
  const url = "https://pro.dendreo.com/timotu/api/categories_produit.php";
  // set the params object
  const params = {
    method: "get",
    headers: {
      Authorization: API_KEY,
    },
  };
  // call the API
  const response = UrlFetchApp.fetch(url, params);
  Logger.log(response);
}

function associeadflienquiz() {
  var resultadf = listadf();
  const adfCount = resultadf.length;
  var resultModules = listmodules();
  const modulesCount = resultModules.length;

  // on fait tourner toutes les formations

  for (i = 0; i < adfCount; i++) {
    Logger.log(
      resultadf[i].numero_complet +
        " - Centre de formation: " +
        resultadf[i].id_centre_de_formation +
        " - lien pre quizz: " +
        resultadf[i].c_lien_pre_quizz +
        " - lien post quizz: " +
        resultadf[i].c_lien_post_quizz
    );
    if (resultadf[i].c_lien_pre_quizz == "") {
      Logger.log(
        " création du lien pre quiz pour adf avec id_formation = : " +
          resultadf[i].id_action_de_formation
      );

      // recherche du module associé à l'adf à partir de l'id_action_de_formation de l'adf

      for (j = 0; j < modulesCount; j++) {
        var adfProgCount =
          resultModules[j].actions_de_formation_programmees.length;
        /*Logger.log(resultModules[i].numero_complet 
                + ' - id module: ' + resultModules[i].id_module 
                + ' - intitule: ' + resultModules[i].intitule 
                + ' - modele quizz: ' + resultModules[i].c_nom_modele_quizz 
                + ' - adf programmees : ' );*/
        for (k = 0; k < adfProgCount; k++) {
          if (
            resultModules[j].actions_de_formation_programmees[k]
              .id_action_de_formation == resultadf[i].id_action_de_formation
          ) {
            Logger.log(
              "intitule du module de la formation : " +
                resultModules[j].intitule +
                " - numero complet module : " +
                resultModules[j].numero_complet +
                " - id module : " +
                resultModules[j].id_module +
                " - modeleQuizAcreer: " +
                resultModules[j].c_nom_modele_quizz
            );

            // lancer la création des quizz et des liens correspondant
            resultcrea = copiequizz(
              resultModules[j].c_nom_modele_quizz,
              resultadf[i].numero_complet,
              resultadf[i].id_action_de_formation
            );
          }
        }
      }
    }
  }
}

function copiequizz(idModeleQuiz, adf_complet, adf_id) {
  //const idModeleQuiz = "1OtTzBFQfSjS7zmYwpZpg_6U4lNzc9cCv6Z4c5_eZFZI" ;
  //const adf_complet = "ADF_20220566"  ;

  var filePre = DriveApp.getFileById(idModeleQuiz);
  var filePost = DriveApp.getFileById(idModeleQuiz);

  var folderDest = DriveApp.getFolderById("1awcXlZ0d5kyZAcGLPeJ-83A9wMee2Ad1");

  // création des deux fichiers form dans le repertoire Quiz
  var newfilePre = filePre.makeCopy("quizz-pre-" + adf_complet, folderDest);
  var idFilePre = newfilePre.getId();
  var lienFilePre = FormApp.openById(idFilePre).getPublishedUrl();

  var newfilePost = filePost.makeCopy("quizz-post-" + adf_complet, folderDest);
  var idFilePost = newfilePost.getId();
  var lienFilePost = FormApp.openById(idFilePost).getPublishedUrl();

  // ajout des 2 liens avec l'api dans la fiche de l'adf
  var resAjoutLienPost = ajoutLienQuizAdf(lienFilePre, lienFilePost, adf_id);
}

function ajoutLienQuizAdf(lienFilePre, lienFilePost, adf_id) {
  //function ajoutLienQuizAdf (){

  //const lienFilePre = "https://docs.google.com/forms/d/e/1FAIpQLSfTGLhhMfEBcQZp5Ir_LhwOruXgd25zlNMZluhMVdYpGYTotw/viewform";
  //const adf_id = "2162";

  Logger.log(
    "publication pour adf  : " + adf_id + " - du lien pre : " + lienFilePre
  );

  // include the API Key
  const API_KEY = 'Token token="70GlKkHdVCi53WqONn97"';
  // set the endpoint
  var urlBase = "https://pro.dendreo.com/timotu/api/actions_de_formation.php";

  // set the params object
  const params = {
    method: "put",
    headers: {
      Authorization: API_KEY,
    },
  };

  // il faut fournir l'id de l'adf et non l'adf_complet pour modifier le champ de l'adf
  // https://pro.dendreo.com/timotu/api/actions_de_formation.php?id_action_de_formation=54

  var urlCommande =
    "?id_action_de_formation=" + adf_id + "&c_lien_pre_quizz=" + lienFilePre;
  var urltot = urlBase + urlCommande;

  Logger.log(" - url : " + urltot);

  // call the API
  const response = UrlFetchApp.fetch(urltot, params);

  var urlCommande =
    "?id_action_de_formation=" + adf_id + "&c_lien_post_quizz=" + lienFilePost;
  var urltot = urlBase + urlCommande;

  Logger.log(" - url : " + urltot);

  // call the API
  const response2 = UrlFetchApp.fetch(urltot, params);
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
    method: "get",
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
    contentType: "application/json",
  };
  // call the API
  //var res = UrlFetchApp.fetch(url,params);

  var res = UrlFetchApp.fetch(url + "&key=" + API_KEY, params);
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

  var range = ss.getSheets()[0].getRange("1:1");
  range.setValue(resultat);
}
