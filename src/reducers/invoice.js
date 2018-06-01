// Copyright 2018 Hayk Pilosyan <hayk.pilos@gmail.com>
// Copyright 2018 Don Kelly <karfai@gmail.com>

// This file is part of Lichen, a functional component of an
// Internet of Rules (IoR).

// ACKNOWLEDGEMENTS
// Funds: Xalgorithms Foundation
// Collaborators: Don Kelly, Joseph Potvin and Bill Olders.

// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License. You may
// obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

import * as types from '../constants/types';

const INITIAL_STATE = {};

function invoiceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INVOICE_FETCHED: {
      return {
        ...state,
        [action.data.id]: action.data.content,
      }
    }
    case types.INVOICE_STATUS_CHANGED: {
      const { id, topic } = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          topic,
        },
      }
    }
    default: return state;
  }
}

export default invoiceReducer;