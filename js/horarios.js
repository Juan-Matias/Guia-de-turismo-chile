var app = new function() {
        var horario1 = {
          origen: "Cementerio-General",
          destino: "A-1",
          hora: new Date(2023, 4, 15, 12),
          costobase: 500,
          costoneto: 0,
          reservas: []
        };
        var horario2 = {
          origen: "Cerro-San-Cristobal",
          destino: "A-2",
          hora: new Date(2023, 4, 28, 7, 30),
          costobase: 450,
          costoneto: 0,
          reservas: []
        };
        var horario3 = {
          origen: "Cerro-Santa-Lucia",
          destino: "A-3",
          hora: new Date(2023, 4, 21, 18),
          costobase: 600,
          costoneto: 0,
          reservas: []
        };
        var horario4 = {
          origen: "Museo-Bella-Artes",
          destino: "A-4",
          hora: new Date(2023, 4, 28, 6, 50),
          costobase: 550,
          costoneto: 0,
          reservas: [1078]
        };
        var horario5 = {
          origen: "Teatro-Muncipal",
          destino: "A-5",
          hora: new Date(2023, 5, 1, 19, 30),
          costobase: 200,
          costoneto: 0,
          reservas: []
        };
        this.horarios = [horario1, horario2, horario3, horario4, horario5];
        for (var i = 0; i < this.horarios.length; i++) {
          var aumentomanana = 0;
          var aumentofindesemana = 0;
          if (this.horarios[i].hora.getHours() <= 12) {
            aumentomanana = this.horarios[i].costobase * 0.05; 
          }
          if (this.horarios[i].hora.getDay() == 5 || this.horarios[i].hora.getDay() == 6) {
            aumentofindesemana = this.horarios[i].costobase * 0.1; 
          }
          this.horarios[i].costoneto = this.horarios[i].costobase + aumentomanana + aumentofindesemana;
        }
  
        this.mostrarhorarios = function() {
          var data = '<br>';
          if (this.horarios.length > 0) {
            for (i = 0; i < this.horarios.length; i++) {
              var hora = this.horarios[i].hora.getHours() < 10 ? '0' + this.horarios[i].hora.getHours() : this.horarios[i].hora.getHours();
              var minutos = this.horarios[i].hora.getMinutes() < 10 ? '0' + this.horarios[i].hora.getMinutes() : this.horarios[i].hora.getMinutes();
              data += '<tr>';
              data += '<td>HORARIOS # '+ (i+1) + ' ORIGEN: ' + this.horarios[i].origen + ', DESTINO: ' + this.horarios[i].destino + ', SALIDA: ' + this.horarios[i].hora.toDateString() + " " + hora + ":" + minutos + '</td>';
              data += '<td><button onclick="app.Reservar(' + i + ')">Reservar</button></td>';
              data += '</tr>';
            }
          }
          document.getElementById('horarios').innerHTML = data;
          document.getElementById('horarios').style.display = 'block';
        };

        this.Reservar = function (item) {
          var el = document.getElementById('documento');
          document.getElementById('documento').value = "";
          document.getElementById('datoshorario').style.display = 'block';
          document.getElementById('horarios').style.display = 'none';
          document.getElementById('menu1').style.display = 'none';
          document.getElementById('menu2').style.display = 'none';
          document.getElementById('btnback').style.display = 'block';

          var impuesto = this.horarios[item].costobase == this.horarios[item].costoneto ? '' : 'Impuesto mañana y/o fin de semana'; 
          var hora = this.horarios[item].hora.getHours() < 10 ? '0' + this.horarios[item].hora.getHours() : this.horarios[item].hora.getHours();
          var minutos = this.horarios[item].hora.getMinutes() < 10 ? '0' + this.horarios[item].hora.getMinutes() : this.horarios[item].hora.getMinutes();

          document.getElementById('datoshorario').innerHTML = "horario # " + (item + 1) + ":<br>ORIGEN: " + this.horarios[item].origen + '<br>DESTINO: ' + this.horarios[item].destino + '<br>SALIDA: ' + this.horarios[item].hora.toDateString() + " " + hora + ":" + minutos + '<br>PRECIO BASE: $' + this.horarios[item].costobase + '<br>PRECIO NETO: $' + this.horarios[item].costoneto + " " + impuesto;
          document.getElementById('campodoc').style.display = 'block';
          self = this;
          document.getElementById('reserva-edit').onsubmit = function() {
            var d = el.value * 1;
            if (isNaN(d) || d == 0) {
              window.alert("Ingrese un dato correcto");
            }else{
              var flag = false;
              for (j = 0; j < self.horarios.length; j++) {
                var auxDoc = self.horarios[j].reservas.indexOf(d)
                if (auxDoc != -1) {
                  if (self.horarios[j].hora.getFullYear() == self.horarios[item].hora.getFullYear() &&
                    self.horarios[j].hora.getMonth() == self.horarios[item].hora.getMonth() &&
                    self.horarios[j].hora.getDate() == self.horarios[item].hora.getDate()) {
                    flag = true;
                    break;
                  }
                }
              }
              if (flag) {
                window.alert("Error: usted ya tiene reservado un horario para esta fecha");
              }else{
                self.horarios[item].reservas.push(d);
                window.alert("horario reservado correctamente");
                document.getElementById('menu1').style.display = 'block';
                document.getElementById('menu2').style.display = 'block';
                document.getElementById('datoshorario').style.display = 'none';
                document.getElementById('campodoc').style.display = 'none';

                document.getElementById('btnback').style.display = 'none';
              }
            }
          }
        };

        this.consultarReserva = function () {
          var el = document.getElementById('docConsulta');
          var d = el.value * 1;
          if (isNaN(d) || d == 0) {
              window.alert("Ingrese un dato correcto");
          }else{
            var data = '<br>horarios RESERVADOS DE ' + d;
            for (i = 0; i < this.horarios.length; i++) {
              var auxDoc = this.horarios[i].reservas.indexOf(d)
              if (auxDoc != -1) {
                var hora = this.horarios[i].hora.getHours() < 10 ? '0' + this.horarios[i].hora.getHours() : this.horarios[i].hora.getHours();
                var minutos = this.horarios[i].hora.getMinutes() < 10 ? '0' + this.horarios[i].hora.getMinutes() : this.horarios[i].hora.getMinutes();
                data += '<tr>';
                data += '<td>horarios # '+ (i+1) + "= ORIGEN: " + this.horarios[i].origen + ', DESTINO: ' + this.horarios[i].destino + ', SALIDA: ' + this.horarios[i].hora.toDateString() + " " + hora + ":" + minutos + '</td>';
                data += '</tr>';
              }
            }
            if (data == '<br>horarios RESERVADOS DE ' + d) {
              window.alert("No existen horarios asociados a dicho documento");
            }else{
              document.getElementById('menu1').style.display = 'none';
              document.getElementById('menu2').style.display = 'none';
              document.getElementById('horarios').style.display = 'block';
              document.getElementById('horarios').innerHTML = data;
              document.getElementById('btnback').style.display = 'block';
            }
          }
        };

        this.Volver = function (){
          document.getElementById('datoshorario').style.display = 'none';
          document.getElementById('campodoc').style.display = 'none';
          document.getElementById('horarios').style.display = 'none';
          document.getElementById('btnback').style.display = 'none';
          document.getElementById('menu1').style.display = 'block';
          document.getElementById('menu2').style.display = 'block';
          document.getElementById('docConsulta').value = "";
        };
}