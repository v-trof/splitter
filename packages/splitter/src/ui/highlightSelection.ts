import { Selection } from "../model/state";
import { ChartElementMap } from "./getChartElementMap";

function removeHighlight(element: SVGGElement) {
    if (element && element.classList) {
        element.classList.remove("current");
    }
}

function addHighlight(element: SVGGElement) {
    if (element && element.classList) {
        element.classList.add("current");
    }
}

export const highlightSelection = (selection: Selection, chartElementMap: ChartElementMap) => {
    chartElementMap.nodes.forEach(removeHighlight);
    chartElementMap.edges.forEach(removeHighlight);

    for (const module in selection) {
        chartElementMap.get(module).forEach(addHighlight);
    }
}