import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { defaultAxiosConfig } from '~/config/defaultAxiosConfig'

export const axiosFactory = (createAxiosDefaults?: CreateAxiosDefaults<never>) => {
  return axios.create({
    ...defaultAxiosConfig,
    ...createAxiosDefaults,
  })
}
