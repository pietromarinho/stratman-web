import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'app/model/chart.model';
import { DashContent } from 'app/model/dashContent.model';
import { Item } from 'app/model/item.model';
import { CenarioService } from 'app/service/cenario/cenario.service';
import * as Chartist from 'chartist';
import { TableData } from '../md/md-table/md-table.component';


declare const $: any;

@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  public tableData: TableData;

  dashContent: DashContent;
  itens: Item[] = [];

  mes = 'Fevereiro';

  constructor(
    private cenarioService: CenarioService
  ) {
  }

  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function (data: any) {

      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.getDasContent();
    this.buildLineChart();

    /* ----------==========     Daily Sales Chart initialization    ==========---------- */
  }

  private buildLineChart() {
    var chart = new Chartist.Line('#ro-chart', {
      labels: ['10h', '12h', '14h', '16h', '18h'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    }, {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0.2
      })
    });
  }

  ngAfterViewInit() {
    const breakCards = true;
    if (breakCards === true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each(function () {
        const $fix_button = $(this);
        const $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click(function () {
          const $header = $(this).parent().parent().siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(function () {
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(function () {
          const $this = $(this);
          const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr('data-count', hover_count);
          // if (hover_count >= 20) {
          //   $(this).children('.card-header, .card-image').addClass('hinge animated');
          // }
        });
      });
    }

    const dataDailySalesChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better
      // look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
      optionsCompletedTasksChart);

    this.startAnimationForLineChart(completedTasksChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
  }

  initChart(labels, series) {
    setTimeout(() => {
      const dataWebsiteViewsChart = {
        labels: labels,
        series: [series]
      };
      const optionsWebsiteViewsChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 21000,
        // chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
      };
      const responsiveOptions: any = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

      this.startAnimationForBarChart(websiteViewsChart);
    }, 100);
  }

  buildHistoric(element: Chart[]) {
    setTimeout(() => {
      for (let i = 0; i < element.length; i++) {

        const dataWebsiteViewsChart = {
          labels: element[i].labels,
          series: [element[i].series],
        };
        const optionsWebsiteViewsChart = {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 21000,
          // chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        };
        const responsiveOptions: any = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
        const websiteViewsChartHistoric = new Chartist.Bar('#websiteViewsChart' + i, dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

        this.startAnimationForBarChart(websiteViewsChartHistoric);
      }
    }, 100);
  }

  getDasContent() {
    this.cenarioService.getDashContent().subscribe(
      success => {
        this.dashContent = success;
        this.itens = this.dashContent.currentItens;
        this.initChart(success.currentCenario.labels, success.currentCenario.series);
        this.buildHistoric(success.historic);
        console.log(success);
      });
  }
}
