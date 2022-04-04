import { ICruiseResult } from 'dependency-cruiser';
import { State } from './state';

const dedupe = (result: ICruiseResult) => {
    const sourceToModule: { [source: string]: ICruiseResult['modules'][number] } = {};

    for (const m of result.modules) {
        if (sourceToModule[m.source]) {
            sourceToModule[m.source].dependencies = [...sourceToModule[m.source].dependencies, ...m.dependencies];
        } else {
            sourceToModule[m.source] = { ...m };
        }
    }

    const modules = Object.values(sourceToModule).map((m) => {
        const seenDeps = new Set<string>();

        const dependencies = m.dependencies.filter((d) => {
            const wasSeen = seenDeps.has(d.resolved);

            seenDeps.add(d.resolved);

            return !wasSeen;
        });

        return {
            ...m,
            dependencies
        };
    });

    return {
        ...result,
        modules
    };
};

export const collapseUsingMap = (map: State['collapseMap'], result: State['cruiserResult']) => {
    const modules = result.modules.map((m) => ({
        ...m,
        source: map[m.source] || m.source,
        consolidated: Boolean(map[m.source]),
        dependencies: m.dependencies.map((d) => ({
            ...d,
            resolved: map[d.resolved] || d.resolved
        }))
    }));

    return dedupe({
        ...result,
        modules
    });
};