import useSWR, { mutate } from "swr"
import { useMemo } from "react"

// Project-imports
import { fetcher } from "utils/axios"

// types
import { MenuProps, NavItemType } from "types/menu"

const initialState: MenuProps = {
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true,
}

export const endpoints = {
  key: "api/menu",
  master: "master",
  dashboard: "/dashboard", // server URL
}

export function useGetMenu() {
/*
// TEMPORARY CHANGE: Network fetching has been disabled for this component due to persistent 404 errors.
// This decision was made to prevent unnecessary load and errors on the backend as the current endpoint
// does not exist. The fetched data was not really useful. useGetMenu is only used in one location.
//
// Future developers should either:
// 1. Update the endpoint to a valid URL if network functionality needs to be restored.
// 2. Remove related code if the decision is made to permanently disable dynamic fetching for this component.
// This code change was implemented as a quick fix and should be revisited for a more permanent solution.

  const { data, isLoading, error, isValidating } = useSWR(
    endpoints.key + endpoints.dashboard,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
*/
  const data = { dashboard: {} as NavItemType, length: 0 }
  const error = true;
  const isValidating = false;
  const isLoading = false;
  const memoizedValue = useMemo(
    () => ({
      menu: data?.dashboard as NavItemType,
      menuLoading: isLoading,
      menuError: error,
      menuValidating: isValidating,
      menuEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating],
  )

  return memoizedValue
}

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(
    endpoints.key + endpoints.master,
    () => initialState,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data as MenuProps,
      menuMasterLoading: isLoading,
    }),
    [data, isLoading],
  )

  return memoizedValue
}

export function handlerComponentDrawer(isComponentDrawerOpened: boolean) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: any) => ({
      ...currentMenuMaster,
      isComponentDrawerOpened,
    }),
    false,
  )
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: any) => ({
      ...currentMenuMaster,
      isDashboardDrawerOpened,
    }),
    false,
  )
}
