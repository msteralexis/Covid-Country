<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>  Covid-Country  </title>
    <html lang="fr">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Sonsie+One" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="src/css/bootstrap.min.css">
    <script src="src/css/jquery.js">   </script> 
    <link rel="stylesheet" href="src/css/style.css">
    <script src="src/css/jquery-modal.js">   </script> 
    <script src="src/css/index.js">   </script> 
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  </head>

  <body class="container-fluid">
    <header>    
      <div  class="row">  
        <h1>  Covid-Country  </h1> 
      </div>
    </header>

    <main>   
      <div  class="row"> 

        <!-- Fenêttre  modale apportant des informations sur l'application  -->
        <div id="information"> </div>
          
        <div   class="col-lg-4 col-md-4 col-xs-4 col-sm-4 menu"> 
          <table class="table">
            <thead>
              <tr>
                <td> <h2>  Pays <h2> </td> 
                <td> <a href="#" id="renitialisationDonne" class="btn btn-info">  réinitialiser les données </a>   </td>
                <td>  <a  id="boutonInfo" data-toggle="modal" data-target="#info" class="btn btn-info"> <img alt="click Pour Plus d'informations" src="src/image/info.png" style="height:30px;  width:30px; border-radius:50%;" /> </a> </td>
              </tr>
              <tr>
                <td colspan="3">
                  <form>
                      <input type="text" id="rechercheNomPays" value="recherche"/>
                  </form>
                </td>
              </tr>
            </thead>
            <tbody id="listPays">
            </tbody>
          </table>  
        </div>

        <div   class="col-lg-4 col-md-4 col-xs-4 col-sm-4 presentation"> 
          <div id="presentation1">
          </div>
          <div id="Graphique1" style="width: 100%; height: 400px"></div>  
        </div>
        <div   class="col-lg-4 col-md-4 col-xs-4 col-sm-4 presentation"> 
          <div id="presentation2">
          </div>
          <div id="Graphique2" style="width: 100%; height: 400px"></div>
        </div>
      </div >      
    </main>
  </body>
</html>



<!-- Fenêttre  modale apportant des informations sur l'application  -->
<div class="modal fade" id="info"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> 
      <div class="modal-body">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-6 col-sm-6 "> 
            <h1  >  Bienvenue <h1>
            <img  src="src/image/covid.jpg" />
          </div>

          <div class="col-lg-6 col-md-6 col-xs-6 col-sm-6 "> 
            <p> Comparer la situation du coronavirus entre 2 Pays ?  Covid-Country  es la pour ça !  </p>
            <p> Pour ce faire: </p>
            <ul>
              <li style="text-align:left;"  > Sélectionné un 2 Pays minimum. </li>
              <li  style="text-align:left;"  > <strong> En vert: </strong>  Les données favorables</li>
              <li style="text-align:left;" > <strong>  En rouge:</strong>  Les données négatif</li>
              <li  style="text-align:left;" > <strong>  Un graphique: </strong>   Représentant l'évolution du nombre de décès.</li>
            </ul> 
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


