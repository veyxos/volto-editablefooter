import { editableFooterColumnsReducer } from './reducers';
import FooterConfigurationWidget from './widget/FooterConfigurationWidget';
import { getEditableFooterColumns } from './actions';
import { getItemsByPath } from './utils';

export { FooterConfigurationWidget, getEditableFooterColumns, getItemsByPath };

// eslint-disable-next-line import/no-anonymous-default-export
export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    footer_columns: FooterConfigurationWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    editableFooterColumns: editableFooterColumnsReducer,
  };

  config.settings.asyncPropsExtenders = [
    ...(config.settings.asyncPropsExtenders ?? []),
    {
      path: '/',
      extend: (dispatchActions) => {
        if (
          dispatchActions.filter(
            (asyncAction) => asyncAction.key === 'editable-footer',
          ).length === 0
        ) {
          dispatchActions.push({
            key: 'editable-footer',
            promise: ({ location, store: { dispatch } }) =>
              __SERVER__ && dispatch(getEditableFooterColumns()),
          });
        }
        return dispatchActions;
      },
    },
  ];

  config.settings['volto-editablefooter'] = {
    options: { socials: false, newsletterSubscribe: false },
  };
  return config;
};
