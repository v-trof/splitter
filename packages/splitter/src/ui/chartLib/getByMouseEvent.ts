import { getTitleText } from "./getTitleText";

export const getNodeByMouseEvent = (pMouseEvent: MouseEvent) => {
    const node = pMouseEvent.target as SVGGElement;
    let closestNodeOrEdge = node.closest(".edge, .node") as SVGGElement;
    let closestTitleText = getTitleText(closestNodeOrEdge);

    return closestTitleText;
}

export const getFolderByMouseEvent = (pMouseEvent: MouseEvent) => {
    const node = pMouseEvent.target as SVGGElement;
    const cluster = node.closest(".cluster") as Element;
    const title = cluster.querySelector('title') as HTMLTitleElement;

    return title.textContent?.replace('cluster_', '');
}

export const getTarget = (event: MouseEvent): { type: 'module' | 'folder', path: string } | { type: 'none' } => {
    const nodePath = getNodeByMouseEvent(event)

    if (nodePath) {
        return {
            type: 'module',
            path: nodePath
        }
    }

    const folderPath = getFolderByMouseEvent(event)

    if (folderPath) {
        return {
            type: 'folder',
            path: folderPath
        }
    }

    return { type: 'none' }
}