export const actionTypes = {
  FETCH_APIS: 'fetch_apis',
  FETCH_API_DATA: 'api_data',
  FETCH_API_BY_ID: 'fetch_api_by_id',
  INVOKE_ALL: 'invoke_all',
  CREATE_API: 'create_api',
  DELETE_API: 'delete_api',
  FLUSH_CACHE: 'flush_cache',
  UPDATE_API: 'update_api'
}
export const mutationTypes = {
  UPDATE_API_LIST: 'update_api_list',
  UPDATE_SELECTED_API_DATA: 'update_selected_data',
  CLEAR_SELECTION: 'clear_selection',
  UPDATE_ALL_API_DATA: 'update_all_data',
  DELETE_LOCAL_API: 'delete_local_api'
}
export const getterTypes = {
  APIS: 'apis',
  SELECTED_API_DATA: 'selected_api_data',
  ALL_DATA: 'all_data',
  SELECTED_API_RAW_DATA: 'selected_raw'
}
