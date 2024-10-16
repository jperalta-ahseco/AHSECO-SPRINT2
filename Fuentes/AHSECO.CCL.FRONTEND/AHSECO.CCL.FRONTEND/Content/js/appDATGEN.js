
var app = angular.module('screen', []);
 
 
var Peru = {
    lat: -8.4504791,
    lng: -75.6931678
}
var coords = [{ lat: -12.0526638, lng: -77.03349750000001 }, { lat: -4.1459489, lng: -81.10995359999998 }, { lat: -12.046175, lng: -77.0307201 }, { lat: -12.0526638, lng: -77.03349750000001 }]

var Amazonas = [{ lat: -3.681547, lng: -75.611772 }, { lat: -3.774660, lng: -73.292767 }, { lat: -5.261546, lng: -75.652511 }, { lat: -5.060516, lng: -73.892940 }]
var Ancash = [{ lat: -9.026197, lng: -78.029304 }, { lat: -9.851009, lng: -77.778003 }, { lat: -9.228034, lng: -77.118823 }]

var todos = [{ lat: -3.681547, lng: -75.611772 }, { lat: -3.774660, lng: -73.292767 }, { lat: -5.261546, lng: -75.652511 }, { lat: -5.060516, lng: -73.892940 }, { lat: -9.026197, lng: -78.029304 }, { lat: -9.851009, lng: -77.778003 }, { lat: -9.228034, lng: -77.118823 }];
var markers = [];

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        markers[i].label = 1;
    }
}

function setMarkerOnAll() {
    
    for (var i = 0; i < markers.length; i++) {
        markers[i].setAnimation(null);
    }
}

$(document).ready(function () {
    $(".menu-item").on("click", function () {
        if (!$(this).hasClass("menu-active")) {
            $(this).addClass("menu-active");
            $(this).siblings('li').removeClass("menu-active");
        }
    });
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
});


$("#Region").append("<option value='-1' selected hidden>SELECCIONE</option>");
initCombo = function () {
    $("#Provincia").html("<option value='-1' selected>cleveveveveveev</option>").val("-1");
    $("#Distrito").html("<option value='-1' selected hidden>SELECCIONE</option>").val("-1");
    $("#Region").html("<option value='-1' selected>SELECCIONE</option>").val("-1");
    $("#Tipo").html("<option value='-1' selected>SELECCIONE</option>").val("-1");
    $("#Mes").html("<option value='-1' selected>SELECCIONE</option>").val("-1");
};
 

//=============================== INCIDENCIAS DIA D =====================================//

app.controller('IncidenciasDiaD', function ($scope, $http) {
    $scope.map = initMap({
        center: Peru,
        zoom: 6,
        minZoom: 6,
        maxZoom: 15,
        disableDefaultUI: true,
        draggable: true,
        styles: "mapGray"
    }, $scope);


 
    var layer2 = new google.maps.KmlLayer();
   
    $("#Region").on("change", function () {
         
        console.log('region 2018');
      
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();

        recuperarInformacion({
            
            url: $("#url_base").val() + "/DatosGenerales/Provincias",
            data: { IdProceso: idproceso, codRegion: $("#Region").val(), IdModulo: idmodulo },
            beforeSend: function () {

            },
            success: function (data) {
            
                var html = "<option value='-1' selected hidden>SELECCIONE</option>";
                $(data).each(function (index, element) {
                    html += '<option value="' + element.Value + '">' + element.Text + '</option>';
                });
                $("#Provincia").html(html);
                $("#Provincia").val('-1');
                $("#Distrito").html("<option value='-1' selected hidden>SELECCIONE</option>").val("-1");
              
               
                
                var mapa = $("#Region option:selected").text().toLowerCase().replaceAll(" ", "");
                
                if ( $("#Region").val()!='-1') {
                    
                    var urlkml = $("#urlkml").val();
                    
                    layer2.setUrl(urlkml + mapa.replace(' ','') + ".kml");
                    layer2.setMap($scope.map);
                    MostrarRegional();
                }
                else
                {
                        layer2.setMap(null);
                        $scope.map.setCenter(Peru);
                        $scope.map.setZoom(6);
                        var urlkml = $("#urlkml").val();
                        MostrarRegional();
                }
            }
        })
    });
    $("#Provincia").on("change", function () {
        var provincia = $("#Region").val() + $("#Provincia").val();
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();
        console.log('provincia 2018');

        recuperarInformacion({
            url: $("#url_base").val() + "/DatosGenerales/Distritos",
            data: { IdProceso: idproceso, codProvincia: provincia, IdModulo: idmodulo },
            beforeSend: function () {

            },
            success: function (data) {

                var html = "<option value='-1' selected hidden>SELECCIONE</option>";
                $(data).each(function (index, element) {
                    html += '<option value="' + element.Value + '">' + element.Text + '</option>';
                });
                $("#Distrito").html(html);
                $("#Distrito").val('-1')

              
              
                var mapa = $("#Region option:selected").text().toLowerCase().replaceAll(" ", "");
                var mapaprovinvia = $("#Provincia option:selected").text().toLowerCase().replaceAll(" ", "");
                 

                
                if ($("#Provincia").val() != '-1') {
          
                    MostrarRegional();
                }
              
            }
        })
    });

    $("#Distrito").on("change", function () {
                console.log('distrito  2018');
                //var mapa = $("#Region option:selected").text().toLowerCase();
                var mapa = $("#Region option:selected").text().toLowerCase().replaceAll(" ", "");
                var mapaprovinvia = $("#Provincia option:selected").text().toLowerCase().replaceAll(" ", "");
           

                if ($("#Distrito").val() != '-1') {

                    //var urlkml = $("#urlkml").val();
                    //mapa = mapa.toUpperCase() + '_' + mapaprovinvia.toUpperCase();

                    //console.log(mapa);
                    //layer2.setUrl(urlkml + mapa + ".kml");
                    ////layer2.setUrl("http://jne2018.epizy.com/kml/YONAN.kml");
                    
                    //layer2.setMap($scope.map);
                    
                    MostrarRegional();
                }

      
      
    });

  
 
 
    function MostrarRegional() {
       
        console.log('MostrarRegional  2018');
        var codubigeo = $("#Region").val().toLowerCase().replaceAll("-1", "") + $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();
        var idmes = '-1';
        var idtipo = '-1';
        recuperarInformacion({
            url: $("#url_base").val() + "/DatosGenerales/ListarDatosGenerales",
            data: { IdProceso: idproceso, CodRegion: codubigeo, IdTipo: idtipo,  IdMes: idmes,IdModulo: idmodulo },
            beforeSend: function () {
                setMapOnAll(null);
                //$("#totalJEE").text("TOTAL: " + 0);
            },
            success: function (data) {
                console.log('REGIONAL');
                //console.dir(data);
                if (data.length > 0) {
                    var marker;
                    var markerLabel;
                  
                    $(data).each(function (e, item) {
                           idmodulo    = $("#idmodulo").val();
 
                            var info = "<table><tr><td class='infoMaps'>" + item.txLocalidad + "</td></tr>";
    
                            info = info + "<tr><td class='infoMapsfooter'>N° LECTORES</td>";
                            info = info + "<td class='infoMapsfooter'>" + item.NUELECTORES + "</td></tr>";

                            info = info + "<tr><td class='infoMapsfooter'>N° LOCALES </td>";
                            info = info + "<td class='infoMapsfooter'>" + item.NULOCALES + "</td></tr>";

                            info = info + "<tr><td class='infoMapsfooter'>N° MESAS</td>";
                            info = info + "<td class='infoMapsfooter'>" + item.NUMESAS + "</td></tr></table>";
                      
                      
                        var infowindow = new google.maps.InfoWindow({
                            content:info// "<span class='infoMaps'>" + item.txLocalidad + "</span><br><span class='infoMapsfooter'>CLEVER <br/>Click para visualizar mas información</span>"

                        });
                        var ubicacion;
                        var markerIcon = []
                        ubicacion = { lat: item.CoordX, lng: item.CoordY };
                        
                        marker = addMarker({ position: ubicacion, animation: google.maps.Animation.DROP, draggable: false, icon: "../Images/Iconos/" + item.TXICONO + ".png" }, $scope);
                        markers.push(marker);

                        marker.addListener('mouseover', function () {
                            infowindow.open($scope.map, this);
                        });
                        marker.addListener('mouseout', function () {
                            infowindow.close();
                        });
                        
                    });

                     console.log('MostrarRegional  2018');
                    codubigeo = $("#Region").val()+ $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
                    var idproceso   = $("#idproceso").val();
                    var idmodulo    = $("#idmodulo").val();
                    var idtipo      =  $("#Tipo").val()
                    var idmes       = $("#Mes").val()
                    recuperarInformacion({
                        url: $("#url_base").val() + "/DatosGenerales/ListarInformacion",
                        data: { IdProceso: idproceso, CodRegion: codubigeo},
                        success: function (data) {
                            debugger;
                            $("#NUGOBERNADORES").text(data[0].NUGOBERNADORES);
                            $("#NUVICEGOBENRADORES").text(data[0].NUVICEGOBENRADORES);
                            $("#NUCONSEJEROS").text(data[0].NUCONSEJEROS);
                            $("#NUALCALDEPROV").text(data[0].NUALCALDEPROV);
                            $("#NUREGIDORPROV").text(data[0].NUREGIDORPROV);
                            $("#NUALCALDEDIST").text(data[0].NUALCALDEDIST);
                            $("#NUREGIDORDIST").text(data[0].NUREGIDORDIST);


                        }

                    });
                  
                }
            }
        });
    };

    
    
    $(document).ready(function () {
        //console.log("adssa");
        $("#Region").append("<option value='-1' selected>SELECCIONE</option>");
        $("#Tipo").append("<option value='-1' selected>SELECCIONE</option>");
        $("#Provincia").html("<option value='-1' selected hidden>SELECCIONE</option>").val("-1");
        //$("#Provincia").select2({ minimumResultsForSearch: -1 });

        $("#Distrito").html("<option value='-1' selected hidden>SELECCIONE</option>").val("-1");
        //$("#Distrito").select2({ minimumResultsForSearch: -1 });

        $("#Mes").html("<option value='-1' selected hidden>SELECCIONE</option>").val("-1");
        //$("#Mes").select2({ minimumResultsForSearch: -1 });

        //$("#Region").select2({ minimumResultsForSearch: -1 });
        //$("#Situacion").select2({ minimumResultsForSearch: -1 });
        $("#Region").trigger("change");

        //setTimeout(function () {
        //    //$("#header").css("display", "block");
        //    $("#imagenMaps").css("display", "block");
        //    //$("#Region").trigger("change");
        //}, 1000);

    });

});
