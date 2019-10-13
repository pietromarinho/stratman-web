import { Cenario } from "./cenario.model";
import { Chart } from "./chart.model";
import { Item } from "./item.model";

export class DashContent {
    currentCenario: Chart;
    currentItens: Item[] = [];
    historic: Chart[] = [];
}
