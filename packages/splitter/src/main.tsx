import { draw, getState, setState } from './api/post';
import { State } from './model/state';
import { getChartElementMap } from './ui/getChartElementMap';
import { highlightSelection } from './ui/highlightSelection';
import { onSelect } from './ui/onSelect';

import './main.css'
import { onCollapse } from './ui/onCollapse';
import { onMove } from './ui/onMove';

const root = document.getElementById('root')!;

const reDraw = async (state: State) => {
  // establish state
  let currentState = state;
  
  // draw svg
  const svg = await draw(currentState);
  root.innerHTML = svg;
  const chartElementMap = getChartElementMap(root);
  highlightSelection(currentState.selection, chartElementMap)


  // add controls
  const clearSelection = document.createElement('button')
  clearSelection.textContent = 'Clear selection'
  clearSelection.onclick = () => {
    currentState = {
      ...currentState,
      selection: {}
    }
    highlightSelection(currentState.selection, chartElementMap)
    setState('admin', currentState);
  }
  clearSelection.style.position = 'absolute'
  clearSelection.style.left = '0'
  clearSelection.style.top = '0'
  root.appendChild(clearSelection)

  // add handlers
  const select = (e: MouseEvent) => {
    currentState = onSelect(e, currentState);
    highlightSelection(currentState.selection, chartElementMap)
    setState('admin', currentState);
  }

  const collapse = (e: MouseEvent) => {
    currentState = onCollapse(e, currentState);
    setState('admin', currentState);
    reDraw(currentState);
  }

  const move = (e: MouseEvent) => {
    currentState = onMove(e, currentState);
    setState('admin', currentState);
    reDraw(currentState);
  }

  root.onclick = (e) => {
    e.preventDefault();

    if(e.ctrlKey) {
      move(e);
      return;
    }

    if(e.altKey) {
      collapse(e)
    } else {
      select(e)
    }
  };
}

const main = async () => {
  const state = await getState('admin');
  console.log(state)
  await reDraw(state);
}

main()