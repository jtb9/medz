import { create } from 'zustand'
import { log, logError } from 'Utilities/diag';
import { persist, createJSONStorage } from 'zustand/middleware'

enum UserStateStatus {
  template = "template",
  downloading = "downloading",
  uploading = "uploading",
  at_rest = "at_rest"
}

// the default empty state
const stateTemplate: userState = {
  errors: [],
  status: UserStateStatus.template,
  view: {
    theme: 'default',
    background: 'blurr-purple',
    feature: 'dash',
    component_state: {}
  },
  data: {
    name: "",
    uid: "",
    content: {}
  },
}

interface userStateView {
  theme: string;
  feature: string;
  background: string;
  component_state: any;
}

interface userStateData {
  name: string;
  uid: string;
  content: {};
}

interface userState {
  // generics for the app
  errors: any[];
  status: UserStateStatus;
  // things pertaining to the view and config
  view: userStateView;
  // the actual data of the application
  data: userStateData;
}

interface userStateActions {
  setTheme: (newTheme: string) => void,
  addToErrorMulti: (newErrorSet: any[]) => void,
  patchViewAttributeState: (slug: string, newValues: any, id: string) => void,
  patchDataAttributeState: (slug: string, newValues: any, id: string) => void,
  // addContentState: (newKey: string, extras: any) => void
}

// construct our store with all of our defined actions
// and the default state template at the top
export const useUserStore = create<userState & userStateActions>()(
  persist(
    (set) => ({
      ...stateTemplate,

      // addContentState: (newKey: string, extras: any) => {
      //   con
      // },

      patchDataAttributeState: (slug: string, newValues: any, id: string) => {
        attributePatch(set, "data", slug, newValues, id);
      },

      patchViewAttributeState: (slug: string, newValues: any, id: string) => {
        attributePatch(set, "view", slug, newValues, id);
      },

      setTheme: (newTheme: string) => {
        attributeSingleSet(set, "view", "theme", newTheme);
      },

      addToErrorMulti: (newErrorSet: any[]) => {
        attributeMultiAdd(set, undefined, "errors", newErrorSet);
      }

    }),
    {
      name: 'mz-user-state-storage-2',
      storage: createJSONStorage(() => localStorage),
    },
  ));

export function withDefaults(object: any, defaults: any): any {
  let base = {
    ...defaults,
    ...object
  }

  return base;
}

// our top-line generic setters/getters for the zustand state flavor
function attributePatch(set: any, parentAttribute: string | undefined, attribute: string, value: any, id: string) {
  set((oldState: any) => {
    let newState = {
      ...oldState
    }

    try {
      if (parentAttribute === undefined) {
        let subBuffer = {
          ...newState[attribute][id],
          ...value
        }

        newState[attribute][id] = subBuffer;
      }
      else {
        let subBuffer = {
          ...newState[parentAttribute][attribute][id],
          ...value
        }

        newState[parentAttribute][attribute][id] = subBuffer;
      }


    }
    catch (e) {
      logError({
        message: "error in attributeSingleSet",
        exception: e,
        parentAttribute,
        attribute,
        value
      });
    }

    return newState;
  })
}

function attributeSingleSet(set: any, parentAttribute: string | undefined, attribute: string, value: any) {
  set((oldState: any) => {
    let newState = {
      ...oldState
    }

    try {
      if (parentAttribute === undefined) {
        newState[attribute] = value;
      }
      else {
        newState[parentAttribute][attribute] = value;
      }
    }
    catch (e) {
      logError({
        message: "error in attributeSingleSet",
        exception: e,
        parentAttribute,
        attribute,
        value
      });
    }

    return newState;
  })
}

function attributeMultiAdd(set: any, parentAttribute: string | undefined, attribute: string, value: any[]) {
  set((oldState: any) => {
    let newState = {
      ...oldState
    }

    try {
      if (parentAttribute === undefined) {
        newState[attribute].push(value);
      }
      else {
        newState[parentAttribute][attribute].push(value);
      }
    }
    catch (e) {
      logError({
        message: "error in attributeMultiAdd",
        exception: e,
        parentAttribute,
        attribute,
        value
      });
    }

    return newState;
  })
}
