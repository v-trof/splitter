import { ICruiseResult } from 'dependency-cruiser';
import express from 'express';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { saveDot } from './model/makeSVG';
import bodyParser from 'body-parser'
import { prepareFilePath, save } from './model/save';
import { State } from './model/state';
import { collapseUsingMap } from './model/collapse';


const app = express()
const port = 3001

const jsonParser = bodyParser.json({ limit: '300mb' });

app.use(express.static(resolve(__dirname, '../static')));

const dg = resolve(__dirname, './results/dg-admin.html')

app.get('/', (req, res) => {
  res.sendFile(dg)
})

const initialState = resolve(__dirname, '../../data/initialState.json')

const getStateFilePath = (id: string) => `state-${id}.json`;

app.post('/state/get', jsonParser, (req, res) => {
  const { id } = req.body as { id: string };
  const filePath = getStateFilePath(id);

  if (existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.sendFile(initialState);
  }
})

app.post('/state/set', jsonParser, (req, res) => {
  const { state, id } = req.body as { id: string; state: State };
  const filePath = getStateFilePath(id);

  save(filePath, JSON.stringify(state));
  res.send(filePath);
})

app.post('/state/draw', jsonParser, (req, res) => {
  const { state } = req.body as { state: State };
  const collapsedModules = collapseUsingMap(state.collapseMap, state.cruiserResult);

  const result = saveDot(collapsedModules, '');
  res.sendFile(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})