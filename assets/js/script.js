$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    let valueInput = $("#heroInput").val().trim();
    
    //Método AJAX
    $.ajax({
      type: "GET",
      url: "https://superheroapi.com/api.php/4905856019427443/" + valueInput,
      success: function (data) {
        //Verificar si nombre se encuentra en API
        if (data.response == "error") {
          document.querySelector(
            "#error"
          ).innerHTML = `Esta fuera del rango el ID agregado o es un caracter`;
        } else {
          limpiarError();

          //Traer información desde API
          let imagen = data.image.url;
          let nombre = data.name;
          let conexiones = data.connections;
          let publicado = data.biography.publisher;
          let ocupacion = data.work.occupation;
          let primeraAparicion = data.biography;
          let Estatura = data.appearance.height;
          let peso = data.appearance.weight;
          let alianzas = data.biography.aliases;
          let poder = data.powerstats.intelligence;

          // SE CREA UNA VALIDACION PARA ALGUNOS DATOS QUE NO APARECEN EN EL REGISTRO
          if (ocupacion == "-") {
            ocupacion = "Sin ocupación conocida";
          }
          if (conexiones == "-") {
            conexiones = "Sin conexiones conocidas";
          }
          if (primeraAparicion == "-") {
            primeraAparicion = "No se tiene registro";
          }
          if (poder == "null") {
            alert(
              "Todos los datos de este héroe son nulos.\n NO SE MOSTRARAN ESTADISTICAS"
            );
          }

          // SE INGRESAN LOS DATOS PARA LA TARJETA DEL SUPERHEROE

          //Insertar en HTML la informacion de card
          $("#heroCard").html(
            `<h3>SuperHero Encontrado</h3>
              <div class="card mb-3">
                <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${imagen}" class="img-fluid" style=" " alt="">
                </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title text-left">Nombre: ${nombre}</h5>
                      <p class="card-text text-left"">Conexiones: ${conexiones["group-affiliation"]} </p>
                      <p class="card-text text-left"">Publicado por: ${publicado}</p>
                      <p class="card-text text-left"">Ocupacion: ${ocupacion}</p>
                      <p class="card-text text-left"">Primera Aparicion: ${primeraAparicion["first-appearance"]} </p>
                      <p class="card-text text-left"">Estatura: ${Estatura} </p>
                      <p class="card-text text-left"">Peso: ${peso}</p>
                      <p class="card-text text-left"">Alianzas: ${alianzas} </p>
                    </div>
                  </div>
                </div>
              </div>`
          );

          //Variable para Gráfico Canvas
          let estadisticas = [
            { y: data.powerstats.intelligence, label: "Inteligencia" },
            { y: data.powerstats.strength, label: "Fuerza" },
            { y: data.powerstats.speed, label: "Velocidad" },
            { y: data.powerstats.durability, label: "Durabilidad" },
            { y: data.powerstats.power, label: "Poder" },
            { y: data.powerstats.combat, label: "Combate" },
          ];

          //Gráfico Canvas
          let chart = new CanvasJS.Chart("heroGrafic", {
            theme: "light2",
            exportEnabled: true,
            animationEnabled: true,
            title: {
              text: `Estadísticas de Poder Para ${nombre}`,
            },
            data: [
              {
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: estadisticas,
              },
            ],
          });
          chart.render();
        }
      },
    });
  });
});

//Funcion para limpiar mensaje de error al escribir el nombre
function limpiarError() {
  document.querySelector("#error").innerHTML = "";
}