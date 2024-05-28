import { Component, OnInit } from '@angular/core';
import { mensajesPorDiaData } from './data';

@Component({
  selector: 'app-informs',
  templateUrl: './informs.component.html',
  styleUrls: ['./informs.component.css']
})
export class InformsComponent implements OnInit {

  showMensajesPorDia: boolean = true;
  showUsuariosPorGrupo: boolean = false;
  showUsuariosInactivos: boolean = false;
  showGruposInactivos: boolean = false;

  selectedMensajesPorDiaFilter: string = 'name';
  mensajesPorDiaFilterValue: string = '';
  filteredMensajesPorDiaData: any[] = [];

  selectedDate: string = '';
  startDate: string = '';
  endDate: string = '';

  usuariosInactivosChartType: string = 'normal';
  gruposInactivosChartType: string = 'normal';


  selectedUsuariosPorGrupoFilter: string = 'name';
  usuariosPorGrupoFilterValue: string = '';
  filteredUsuariosPorGrupoData: any[] = [];

  ngOnInit(): void {
    this.filteredMensajesPorDiaData = this.mensajesPorDiaData;
    this.filteredUsuariosPorGrupoData = this.usuariosPorGrupoData;
  }

  showMensajesPorDiaSection() {
    this.showMensajesPorDia = true;
    this.showUsuariosPorGrupo = false;
    this.showUsuariosInactivos = false;
    this.showGruposInactivos = false;
  }

  showUsuariosPorGrupoSection() {
    this.showMensajesPorDia = false;
    this.showUsuariosPorGrupo = true;
    this.showUsuariosInactivos = false;
    this.showGruposInactivos = false;
  }

  showUsuariosInactivosSection() {
    this.showMensajesPorDia = false;
    this.showUsuariosPorGrupo = false;
    this.showUsuariosInactivos = true;
    this.showGruposInactivos = false;
  }

  showGruposInactivosSection() {
    this.showMensajesPorDia = false;
    this.showUsuariosPorGrupo = false;
    this.showUsuariosInactivos = false;
    this.showGruposInactivos = true;
  }

  // view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1EDFCE']
  };

  constructor() {}

  usuariosPorGrupoData = [
    { "name": "Los mas capitos", "value": 10 },
    { "name": "Cinematrografia", "value": 15 },
    { "name": "Roscancio", "value": 5 },
    { "name": "xd", "value": 4 },
    { "name": "Rossdcancio", "value": 7 },
    { "name": "Roscsdancio", "value": 12 },
    { "name": "Rosaaacancio", "value": 9 },
    { "name": "qwe", "value": 50 },
    { "name": "asd", "value": 23 },
    { "name": "edc", "value": 23 },
    { "name": "rfv", "value": 29 },
    { "name": "rgb", "value": 15 },
    { "name": "thj", "value": 25 },
    { "name": "yui", "value": 15 },
    { "name": "op", "value": 2 },
    { "name": "plk", "value": 0 },
    { "name": "kjh", "value": 0 },
    { "name": "mht", "value": 9 },
  ];

  usuariosInactivosData = [
    { "name": "Activos", "value": 60 },
    { "name": "Inactivos", "value": 40 }
  ];

  gruposInactivosData = [
    { "name": "Activos", "value": 120 },
    { "name": "Inactivos", "value": 30 }
  ];

  mensajesPorDiaData = mensajesPorDiaData;

  // mensajesPorDiaData = [
  //   {
  //     "name": "Seb god",
  //     "rrhh_id": 101,
  //     "series": [
  //       { "name": "2023-05-20", "value": 5 },
  //       { "name": "2023-05-21", "value": 3 },
  //       { "name": "2023-05-22", "value": 4 }
  //     ]
  //   },
  //   {
  //     "name": "juani gay",
  //     "rrhh_id": 102,
  //     "series": [
  //       { "name": "2023-05-20", "value": 2 },
  //       { "name": "2023-05-21", "value": 6 },
  //       { "name": "2023-05-22", "value": 1 }
  //     ]
  //   }
  // ];


  filterMensajesPorDia() {
    if (!this.mensajesPorDiaFilterValue && !this.selectedDate && !this.startDate && !this.endDate) {
      this.filteredMensajesPorDiaData = this.mensajesPorDiaData;
    } else {
      this.filteredMensajesPorDiaData = this.mensajesPorDiaData.map(series => {
        return {
          ...series,
          series: series.series.filter(item => {
            if (this.selectedMensajesPorDiaFilter === 'name') {
              return series.name.toLowerCase().includes(this.mensajesPorDiaFilterValue.toLowerCase());
            }
            if (this.selectedMensajesPorDiaFilter === 'value') {
              return item.value.toString().includes(this.mensajesPorDiaFilterValue);
            }
            if (this.selectedMensajesPorDiaFilter === 'date') {
              return item.name === this.selectedDate;
            }
            if (this.selectedMensajesPorDiaFilter === 'date-range') {
              const itemDate = new Date(item.name).getTime();
              const start = new Date(this.startDate).getTime();
              const end = new Date(this.endDate).getTime();
              return itemDate >= start && itemDate <= end;
            }
            if (this.selectedMensajesPorDiaFilter === 'rrhh_id') {
              return series.rrhh_id.toString().includes(this.mensajesPorDiaFilterValue);
            }
            return true;
          })
        };
      }).filter(series => series.series.length > 0);
    }
  }


  filterUsuariosPorGrupo() {
    if (!this.usuariosPorGrupoFilterValue) {
      this.filteredUsuariosPorGrupoData = this.usuariosPorGrupoData;
    } else {
      this.filteredUsuariosPorGrupoData = this.usuariosPorGrupoData.filter(item => {
        if (this.selectedUsuariosPorGrupoFilter === 'name') {
          return item.name.toLowerCase().includes(this.usuariosPorGrupoFilterValue.toLowerCase());
        } else if (this.selectedUsuariosPorGrupoFilter === 'value') {
          return item.value.toString().includes(this.usuariosPorGrupoFilterValue);
        }
      });
    }
  }
}
