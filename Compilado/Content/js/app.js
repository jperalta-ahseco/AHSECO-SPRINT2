
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


   
     function MostrarGrafico(informacion) {
        var idproceso = $("#idproceso").val();
        if ($("#Region").val() != '-1')
        chartVacio({ NumeroItems: 5 });
        var chart = AmCharts.makeChart("chrGrafico", {
            "type": "pie",
            "startDuration": 0,
            "theme": "light",
            "innerRadius": "50%",
            "labelsEnabled": false,
            "fontFamily": "Arimo,Helvetica,Arial,sans-serif",
            "fontSize": 20,
            "marginBottom": 0,
            "marginTop": 0,
            //"colors": [colores],
            "legend": {
                "position": "right",
                "marginRight": 10,
                "autoMargins": true
            },
            "dataProvider": informacion,
            "valueField": "Total",
            "titleField": "Estado"
        });
    }

   
    
    var layer2 = new google.maps.KmlLayer();
   
    $("#Region").on("change", function () {
         
        console.log('region 2018');
      
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();

        recuperarInformacion({
            
            url: $("#url_base").val() + "/Incidencias/Provincias",
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
                MostrarTipo();
                if (idmodulo=='2' ||idmodulo=='4' )  MostrarMes();
                
                 
                
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
            url: $("#url_base").val() + "/Incidencias/Distritos",
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

                MostrarTipo();
                if (idmodulo=='2' ||idmodulo=='4' )  MostrarMes();
                //var mapa = $("#Region option:selected").text().toLowerCase();
                var mapa = $("#Region option:selected").text().toLowerCase().replaceAll(" ", "");
                var mapaprovinvia = $("#Provincia option:selected").text().toLowerCase().replaceAll(" ", "");
                 

                
                if ($("#Provincia").val() != '-1') {
          
                    MostrarProvincia();
                }
              
            }
        })
    });

    $("#Distrito").on("change", function () {
                console.log('distrito  2018');
                //var mapa = $("#Region option:selected").text().toLowerCase();
                var mapa = $("#Region option:selected").text().toLowerCase().replaceAll(" ", "");
                var mapaprovinvia = $("#Provincia option:selected").text().toLowerCase().replaceAll(" ", "");
                 
                if (idmodulo == '2' || idmodulo == '4') MostrarTipo();

                if ($("#Distrito").val() != '-1') {

                    //var urlkml = $("#urlkml").val();
                    //mapa = mapa.toUpperCase() + '_' + mapaprovinvia.toUpperCase();

                    //console.log(mapa);
                    //layer2.setUrl(urlkml + mapa + ".kml");
                    ////layer2.setUrl("http://jne2018.epizy.com/kml/YONAN.kml");
                    
                    //layer2.setMap($scope.map);
                    
                    MostrarProvincia();
                }

      
      
    });

    $("#Tipo").on("change", function () {
        console.log('TIPO  2018');
        var codubigeo = $("#Region").val().toLowerCase().replaceAll("-1", "") + $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
        if (codubigeo != '')
        {
            if ($("#Tipo").val() != '-1') {
                
                if (codubigeo.length > 2)
                    MostrarProvincia();
                else
                    MostrarRegional();
            }
        }
    });

    $("#Mes").on("change", function () {
        console.log('MES  2018');
        var codubigeo = $("#Region").val().toLowerCase().replaceAll("-1", "") + $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
         
        if (codubigeo != '') {
            if ($("#Mes").val() != '-1') {
                if (codubigeo.length > 2)
                    MostrarProvincia();
                else
                    MostrarRegional();
            }
        }

    });

    function MostrarTipo() 
    {
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();

        var codubigeo = $("#Region").val().toLowerCase().replaceAll("-1", "") + $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");

        if ($("#Region").val() != '-1') 
        {
            recuperarInformacion({
            url: $("#url_base").val() + "/Incidencias/ListarTipo",
            data: { IdProceso: idproceso, CodUbigeo: codubigeo, IdModulo: idmodulo },
            beforeSend: function () {

            },
            success: function (data) {
        
                var html = "<option value='-1' selected hidden>SELECCIONE</option>";
                $(data).each(function (index, element) {
                    html += '<option value="' + element.Value + '">' + element.Text + '</option>';
                });
                $("#Tipo").html(html);
                $("#Tipo").val('-1')

            }
        })
        }
    }

    function MostrarMes() {
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();
        var idtipo = $("#Tipo").val();
        var codubigeo = $("#Region").val().toLowerCase().replaceAll("-1", "") + $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
        if ( $("#Region").val()!='-1') {
        recuperarInformacion({
            url: $("#url_base").val() + "/Incidencias/ListarMes",
            data: { IdProceso: idproceso, CodUbigeo: codubigeo,IdTipo: idtipo ,IdModulo: idmodulo },
            beforeSend: function () {

            },
            success: function (data) {
               
                var html = "<option value='-1' selected hidden>SELECCIONE</option>";
                $(data).each(function (index, element) {
                    html += '<option value="' + element.Value + '">' + element.Text + '</option>';
                });
                $("#Mes").html(html);
                $("#Mes").val('-1')

            }
        })
        }
    }
    function MostrarRegional() {
 
        console.log('MostrarRegional  2018');
        var codubigeo = $("#Region").val().toLowerCase().replaceAll("-1", "") + $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();
        var idmes = $("#Mes").val();
        if (typeof idmes == 'undefined') {
                  idmes='-1';

        }
        var idtipo   = $("#Tipo").val();
        recuperarInformacion({
            url: $("#url_base").val() + "/Incidencias/ListarSumarizado",
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
                        var labeltotal  ='';
                            idmodulo    = $("#idmodulo").val();

                        if (idmodulo == '1' || idmodulo == '2')
                        {
                            var info = "<table><tr><td class='infoMaps'>" + item.txLocalidad + "</td></tr>";
                            info = info + "<tr><td class='infoMaps'>" + item.TOTAL +  " Incidencias</td></tr>";

                            info = info + "<td class='infoMapsfooter'>" + item.TXCAMPO1 + "</td>";
                            info = info + "<td class='infoMapsfooter'>" + item.NUVALOR1 + "</td></tr>";

                            info = info + "<td class='infoMapsfooter'>" + item.TXCAMPO2 + "</td>";
                            info = info + "<td class='infoMapsfooter'>" + item.NUVALOR2 + "</td></tr>";

                            info = info + "<td class='infoMapsfooter'>" + item.TXCAMPO3 + "</td>";
                            info = info + "<td class='infoMapsfooter'>" + item.NUVALOR3 + "</td></tr>";
                    
                            info = info + "<td class='infoMapsfooter'>" + item.TXCAMPO4 + "</td>";
                            info = info + "<td class='infoMapsfooter'>" + item.NUVALOR4 + "</td></tr></table>";
                            labeltotal = item.TOTAL;
                        }
                        else
                          {
                            var info = "<table><tr><td class='infoMaps'>" + item.txLocalidad + "</td></tr>";
                            info = info + "<tr><td class='infoMaps'>" + item.TOTAL + " Incidencias</td></tr></table>";
                             
                            labeltotal = item.TOTAL;
                        }
                        var infowindow = new google.maps.InfoWindow({
                            content:info// "<span class='infoMaps'>" + item.txLocalidad + "</span><br><span class='infoMapsfooter'>CLEVER <br/>Click para visualizar mas información</span>"

                        });
                        var ubicacion;
                        var markerIcon = []
                        ubicacion = { lat: item.CoordX, lng: item.CoordY };
                        
                        //marker = addMarker({ position: ubicacion, labelContent: labeltotal, animation: google.maps.Animation.DROP, draggable: false, icon: "../Images/" + item.IdProcedimiento + ".png" }, $scope);
                        if (idmodulo == '1' || idmodulo == '2')
                            marker = addMarker({ position: ubicacion, labelContent: labeltotal, animation: google.maps.Animation.DROP, draggable: false, icon: "../Images/Iconos/" + item.IdProcedimiento + ".png" }, $scope);
                        if (idmodulo == '3' || idmodulo == '4')
                            marker = addMarkerLabel({ position: ubicacion, labelContent: labeltotal, animation: google.maps.Animation.DROP, draggable: false, icon: "../Images/Iconos/" + item.IdProcedimiento + ".png" }, $scope);
                        markers.push(marker);

                        marker.addListener('mouseover', function () {
                            infowindow.open($scope.map, this);
                        });
                        marker.addListener('mouseout', function () {
                            infowindow.close();
                        });
                        //marker.addListener('click', function () {
                        //    //console.dir(item);
                        //    window.location = "../Incidencias/ListarDetalle?idproceso=" + idproceso + "&IdFormato=" + item.IdFormato;
                        //});
                    });
                    console.log('MostrarRegional  2018');
                    codubigeo = $("#Region").val()+ $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
                    var idproceso   = $("#idproceso").val();
                    var idmodulo    = $("#idmodulo").val();
                    var idtipo      =  $("#Tipo").val()
                    var idmes       = $("#Mes").val()
                    recuperarInformacion({
                        url: $("#url_base").val() + "/Incidencias/ListarGrafico",
                        data: { IdProceso: idproceso, CodRegion: codubigeo, IdTipo: idtipo, IdMes: idmes, IdModulo: idmodulo },
                        success: function (data) {
                            MostrarGrafico(data);
                        }
                    });
                }
            }
        });
    };

    function MostrarProvincia() {
       
        console.log('MostrarProvincia  2018');
        var codubigeo = $("#Region").val()+ $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
        var idproceso = $("#idproceso").val();
        var idmodulo = $("#idmodulo").val();
        var idtipo = $("#Tipo").val();
        var idmes= $("#Mes").val();
        
        recuperarInformacion({
            url: $("#url_base").val() + "/Incidencias/Listar",
            data: { IdProceso: idproceso, CodRegion: codubigeo, IdTipo: idtipo,IdMes:idmes, IdModulo: idmodulo },
            beforeSend: function () {
                setMapOnAll(null);
                //$("#totalJEE").text("TOTAL: " + 0);
            },
            success: function (data) {
                console.log('PROVINCIAL');
           
                if (data.length > 0) {
                    var markerPro;
                    
                    // $("#totalJEE").text("TOTAL: " + data.length);
                    //content: "<span class='infoMaps'>" + item.txLocalidad + "</span><br><span class='infoMapsfooter'>" + item.txProcedimiento + "<br/>Click para visualizar mas información</span>"
                    $(data).each(function (e, item) {

                        var infowindowPro = new google.maps.InfoWindow({
                            content: "<span class='infoMaps'>" + item.txLocalidad + "</span><br><span class='infoMapsfooter'>" + item.txProcedimiento + "<br/>Click para visualizar mas información</span>"

                        });
                        console.log(item.IdProcedimiento);
                        var ubicacion;
                        var markerIcon = ["../Images/Incidencia_MPDNFPE-30.png","../Images/Incidencia_MPDNFPE-99.png","../Images/Incidencia_MPDNFPE-24.png", "../Images/Incidencia_MPDNFPE-28.png", "../Images/Incidencia_MPDNFPE-29.png", "../Images/Incidencia_MPDNFPE-30.png", "../Images/Incidencia_MPDNFPE-31.png"]
                        ubicacion = { lat: item.CoordX, lng: item.CoordY };
                        markerPro = addMarkerLabel({ position: ubicacion, animation: google.maps.Animation.DROP, draggable: false, icon: "../Images/Iconos/" + item.IdProcedimiento + ".png" }, $scope);
                        
                        markers.push(markerPro);

                        markerPro.addListener('mouseover', function () {
                            infowindowPro.open($scope.map, this);
                        });
                        markerPro.addListener('mouseout', function () {
                            infowindowPro.close();
                        });
                        markerPro.addListener('click', function () {
                            //console.dir(item);
                            
                            window.location = "../Incidencias/ListarDetalle?idproceso=" + idproceso + "&IdFormato=" + item.IdFormato + "&IdModulo=" + idmodulo;
                        });
                    });
                    
                    codubigeo = $("#Region").val() + $("#Provincia").val().toLowerCase().replaceAll("-1", "") + $("#Distrito").val().toLowerCase().replaceAll("-1", "");
                    var idproceso = $("#idproceso").val();
                    var idmodulo = $("#idmodulo").val();
                    var idtipo = $("#Tipo").val()
                    var idmes = $("#Mes").val()
                    recuperarInformacion({
                        url: $("#url_base").val() + "/Incidencias/ListarIncidenciasGraficoDiaD",
                        data: { IdProceso: idproceso, CodRegion: codubigeo, IdTipo: idtipo,IdMes: idmes, IdModulo: idmodulo },
                        success: function (data) {
                            MostrarGrafico(data);
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
