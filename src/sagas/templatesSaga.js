import { TemplateLibrary, Template } from '@accordproject/cicero-core';
import { version as ciceroVersion } from '@accordproject/cicero-core/package.json';

import { takeLatest, put, select } from 'redux-saga/effects';
import * as actions from '../actions/templatesActions';
import * as selectors from '../selectors/templatesSelectors';

/**
 * saga to populate store with templates
 */
export function* pushTemplatesToStore() {
  try {
    const templateLibrary = new TemplateLibrary();
    const templateIndex = yield templateLibrary
      .getTemplateIndex({ latestVersion: false, ciceroVersion });
    const templateIndexArray = Object.values(templateIndex);
    yield put(actions.getTemplatesSuccess(templateIndexArray));
  } catch (err) {
    yield put(actions.getTemplatesError(err));
  }
}

/**
 * saga which puts a mock template onto the array
 * of templates in the store
 */
export function* addNewTemplateToStore() {
  const newTemplate = {
    uri: `${Date.now()}`,
    name: 'Temporary New Template',
    version: '1.0.0',
    description: 'This is mock data to showcase an action to add a new template.',
  };
  yield put(actions.addNewTemplateSuccess(newTemplate));
}

/**
 * saga which checks
 * of templates in the store
 */
export function* addTemplateObjectToStore(modelFileAction) {
  const templateObjects = yield select(selectors.templateObjects);

  if (!templateObjects || !templateObjects[modelFileAction.url]) {
    const templateObj = yield Template.fromUrl(modelFileAction.url);
    yield put(actions.loadTemplateObjectSuccess(modelFileAction.url, templateObj));
  }
}

export const templatesSaga = [
  takeLatest('GET_AP_TEMPLATES', pushTemplatesToStore),
  takeLatest('ADD_NEW_TEMPLATE', addNewTemplateToStore),
  takeLatest('LOAD_TEMPLATE_OBJECT', addTemplateObjectToStore),
];
