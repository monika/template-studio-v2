import { TemplateLibrary } from '@accordproject/cicero-core';
import { version as ciceroVersion } from '@accordproject/cicero-core/package.json';

import { all, takeLatest, put } from 'redux-saga/effects';

export function* pushTemplatesToStore() {
  try {
    const templateLibrary = new TemplateLibrary();
    const templateIndex = yield templateLibrary
      .getTemplateIndex({ latestVersion: false, ciceroVersion });
    const templateIndexArray = Object.values(templateIndex);
    yield put({ type: 'AP_TEMPLATES_RECEIVED', templates: templateIndexArray });
  } catch (err) {
    yield put({ type: 'AP_TEMPLATES_ERROR', error: err });
  }
}

export function* addNewTemplateToStore() {
  yield put({
    type: 'ADD_NEW_TEMPLATE_SUCCEEDED',
    template: {
      uri: `${Date.now()}`,
      name: 'Temporary New Template',
      version: '1.0.0',
      description: 'This is mock data to showcase an action to add a new template.',
    },
  });
}

export function* updateModelOnStore(modelMockAction) {
  yield put({
    type: 'UPDATE_MODEL_MOCK_SUCCEEDED',
    model: modelMockAction.model,
  });
}

export function* updateLogicOnStore(logicMockAction) {
  yield put({
    type: 'UPDATE_LOGIC_MOCK_SUCCEEDED',
    logic: logicMockAction.logic,
  });
}

function* actionWatcher() {
  yield takeLatest('GET_AP_TEMPLATES', pushTemplatesToStore);
  yield takeLatest('ADD_NEW_TEMPLATE', addNewTemplateToStore);
  yield takeLatest('UPDATE_MODEL_MOCK', updateModelOnStore);
  yield takeLatest('UPDATE_LOGIC_MOCK', updateLogicOnStore);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
