import { getTitleText } from "./chartLib/getTitleText";

type NodeMap = { [key: string]: SVGGElement };

function getEdgeConnections(pString: string) {
    var nodeNames = pString.split(/\s*->\s*/);

    return {
        from: nodeNames.shift()!,
        to: nodeNames.shift()!,
    };
}

function addNodeToMap(pMap: NodeMap, pNode: SVGGElement) {
    var titleText = getTitleText(pNode);

    if (titleText) {
        pMap[titleText] = pNode;
    }
    return pMap;
}

function addEdgeToMap(nodeMap: NodeMap) {
    return function (edgeMap: { [key: string]: SVGGElement[] }, edge: SVGGElement) {
        var title = getTitleText(edge);

        if (title) {
            var { from, to } = getEdgeConnections(title);

            edgeMap[title] = [nodeMap[from], nodeMap[to]];
            (edgeMap[from] || (edgeMap[from] = [])).push(edge);
            (edgeMap[to] || (edgeMap[to] = [])).push(edge);
        }

        return edgeMap;
    };
}

function makeTitle2NodeMap(nodes: SVGGElement[]) {
    return nodes.reduce(addNodeToMap, {} as NodeMap);
}


function buildMap(edges: SVGGElement[], nodes: SVGGElement[]) {
    var title2NodeMap = makeTitle2NodeMap(nodes);

    return edges.reduce(addEdgeToMap(title2NodeMap), {});
}


function makeChartElementMap(edges: SVGGElement[], nodes: SVGGElement[]) {
    var elementMap = buildMap(edges, nodes);

    function get(pTitleText: string) {
        return elementMap[pTitleText] || [];
    }

    return {
        get,
        nodes,
        edges
    };
}

export function getChartElementMap(root: Element) {
    const nodes = [...root.querySelectorAll<SVGGElement>(".node")];
    const edges = [...root.querySelectorAll<SVGGElement>(".edge")];

    const chartElementMap = makeChartElementMap(edges, nodes);

    return chartElementMap
}

export type ChartElementMap = ReturnType<typeof getChartElementMap>;



