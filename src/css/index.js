$(document).ready(function(){
 

  /***************************** 
  *  Chargement des données.
  */

  var donnesPaysCovid  = []; 

  var listNomPays = [];

  // on ouvre le fichier Json pour transferer les données dans un tableau associatif  "donnesPaysCovid" 
  // La clée sera le nom de chaque pays
  // "listNomPays" comportant la liste de tous les pays servant pour la recherche d'un pays par nom.
  $.getJSON("/src/donnees/owid-covid-data.json",function(SourceDonnes){  
    for (var item in SourceDonnes ) {
      listNomPays.push(SourceDonnes[item][0].location)
      donnesPaysCovid[ SourceDonnes[item][0].location ] = SourceDonnes[item];
    } 
    listPays(donnesPaysCovid);
  });




  /***************************** 
  *  Lors du chargement de la page chargement d'une fenêtre modale servant aussi de point info.
  */
  $('#boutonInfo').trigger('click');

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  

  /***************************** 
  *  Ecoute des Interactions utilisateurs
  */


  // Servant lors d'une recherche d'un pays
  $('#rechercheNomPays').autocomplete({
    source : listNomPays,
    select : function(event, ui){ // lors de la sélection d'une proposition
    
      fun(ui.item.label);
    }
  });

  $("#rechercheNomPays").on('click',  function () {
    $(this).val('');
  });


  


  // Afficher le détails d'un Pays
  $("#listPays").on('click', '.pays', function () {
    var identifiantPays = $(this).closest('tr').find('.val').val();
    fun(identifiantPays);
    
    
  });

  // supresion d'un pays dans la liste
  $("#listPays").on('click', '.suprimePays', function () {
    $(this).closest('tr').remove() ;
  });


  $('#renitialisationDonne').on('click', function(){
    listPays(donnesPaysCovid);
  });




  /***************************** 
  *  Afficher les détails d'un pays et comparer les données entre les deux pays sélectionner
  */


  var gestionComparaison = 0;

  function fun(identifiantPays){
    if (gestionComparaison == 0){
      var selection ='1';
      gestionComparaison =1;
    }else{
      var selection ='2';
      gestionComparaison = 0;
    }
    afficherDetailsPays( donnesPaysCovid[identifiantPays] , selection, identifiantPays);

    statistique(donnesPaysCovid[identifiantPays], selection);

  }

  // affiche la liste des pays lors du chargement de la page ou click sur les boutton associés
  function listPays(data){
    var listPaysHtml = ' ';
    for (var item in data ) {
      listPaysHtml += '<tr>   <input type="hidden" class="val"  value="'+item+'" />  <td>  '+item +' </td>'; 
      listPaysHtml += ' <td> <a href="#" class="btn btn-info pays"  >   <img alt="click Pour Plus d\'informations" src="src/image/loupe.jpg" style="height:30px;  width:30px; border-radius:50%;" />    </a>   </td> ';
      listPaysHtml += '  <td>  <a href="#" class="btn btn-danger suprimePays"  >     <img alt="click Pour suprimer" src="src/image/suprimmer.jpg" style="height:30px;  width:30px; border-radius:50%;" />   </a></td> </tr>    ';
      $('#listPays').html(listPaysHtml);
    } 
  }



  // afficher l'évolutions du nombre de mort d'un pays sous forme de graphique.
  function statistique(data, selection) {
    var listDonnesPays = [] ; 
    listDonnesPays.push(['date', 'Nb Mort']); 
    $.each( data , function( key, val ) {
      for (var item in val) {
        var donnee = [ val.date ,  val.total_deaths ];
        listDonnesPays.push( donnee );
      }
    });
    gestionGraphique(listDonnesPays, selection);
  }

  function gestionGraphique(listDonnesPays, selection){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable( listDonnesPays );
   
      var options = {
        title: 'Evolution du nombre de mort',
        curveType: 'function',
        legend: { position: 'bottom' }
      };
      var chart = new google.visualization.LineChart(document.getElementById('Graphique'+selection));
      chart.draw(data, options);
    }
  }



  // Affiche des informations par pays
  function afficherDetailsPays(donnee, selection, identifiantPays){
    var detailsPaysHtml = ' ';
    detailsPaysHtml += ' <input type="hidden" class="val"  value="'+identifiantPays+'" />  <h2 class="titre" > '+ donnee[donnee.length-1].location +' </h2>  ' ;
    detailsPaysHtml += '<tr > <td>  Date Dernière Donnée </td>  <span class="date">  <td> '+ donnee[donnee.length-1].date +' </td> </span> </tr> <br>  ' ;
    detailsPaysHtml += '<tr> <td>  Population </td>    <span class="population"> <td> '+ donnee[donnee.length-1].population +' </td> </span>  </tr> <br>  ' ;
    detailsPaysHtml += '<tr> <td>  Densité Population </td>    <span class="population_density"> <td> '+ donnee[donnee.length-1].population_density +' </td> </span>  </tr> <br>  ' ;
    detailsPaysHtml += '<tr> <td>  PIB / Habitant </td>   <span class="gdp_per_capita">   <td> '+ donnee[donnee.length-1].gdp_per_capita +' </td>  </span>  </tr> <br> <br>' ;

    detailsPaysHtml += '<tr> <td>  Nombre de Cas totale </td>    <span class="total_cases"> <td> '+ donnee[donnee.length-1].total_cases +' </td> </span>  </tr> <br>  ' ;
    detailsPaysHtml += '<tr> <td>  % Population + 65ans </td>    <span class="aged_65_older"> <td> '+ donnee[donnee.length-1].aged_65_older +' </td> </span>  </tr> <br>  ' ;
    detailsPaysHtml += '<tr> <td>  Totale de mort </td>    <td > <span class="mort"><td> '+ donnee[donnee.length-1].total_deaths +' </td> </span>   </tr>  <br>' ;
    detailsPaysHtml += '<tr> <td>  Nombre mort par million </td>   <span class="new_deaths_per_million">   <td> '+ donnee[donnee.length-1].new_deaths_per_million +' </td>  </span>  </tr> <br> ' ;
    detailsPaysHtml += '<tr> <td>  Nombre de lit Hopital / 1000 Per </td>   <span class="hospital_beds_per_thousand">   <td> '+ donnee[donnee.length-1].hospital_beds_per_thousand +' </td>  </span>  </tr> <br> ' ;

    $('#presentation'+selection).html(detailsPaysHtml);
    comparator()
  }


        
 

  // On compare les données des deux pays sélectioner. 
  // affichage des données en rouge pour les éléments négatif et vert pour les positif
  function comparator(){
    // les chiffes les plus HAUTS sons les meilleurs
    compareBas('.gdp_per_capita');
    compareHaut('.population_density');
    compareHaut('.hospital_beds_per_thousand');
  

     // les chiffes les plus BAS sons les meilleurs
    compareBas('.mort');
    compareBas('.new_deaths_per_million');
    compareBas('.total_cases');
    compareBas('.aged_65_older');
  
  }

  function compareHaut(comp) {
    $('#presentation1 '+comp).css("background-color", "white");
    $('#presentation2 '+comp).css("background-color", "white");
    if( $('#presentation1 '+comp).html() > $('#presentation2 '+comp).html() ){
      $('#presentation1 '+comp).css("background-color", "#35ea0d");
      $('#presentation2 '+comp).css("background-color", "red");
    }else{
      $('#presentation2 '+comp).css("background-color", "#35ea0d");
      $('#presentation1 '+comp).css("background-color", "red");
    }

  }

  function compareBas(comp) {
    $('#presentation1 '+comp).css("background-color", "white");
    $('#presentation2 '+comp).css("background-color", "white");
    if( $('#presentation1 '+comp).html() < $('#presentation2 '+comp).html() ){
      $('#presentation1 '+comp).css("background-color", "#35ea0d");
      $('#presentation2 '+comp).css("background-color", "red");
    }else{
      $('#presentation2 '+comp).css("background-color", "#35ea0d");
      $('#presentation1 '+comp).css("background-color", "red");
    }

  }



      
});