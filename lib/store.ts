import { Platform } from 'react-native'
import { create } from 'zustand'
import { Settings } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverseerrClient } from './OverseerrClient'
import {
	DEFAULT_OVERSEERR_CONNECTION_TYPE,
	DEFAULT_OVERSEERR_PORT,
	DEFAULT_OVERSEERR_API_AUTH_TYPE
} from './constants'

interface AppState {
	apiConnectionType: string
	apiAddress: string
	apiPort: string
	apiUsername: string
	apiPassword: string
	apiKey: string
	apiAuthType: string
	hasValidSettings: boolean
	client: OverseerrClient | null
	unsetClientConfig: () => Promise<void>
	setOverseerClient: (
		connectionType: string,
		address: string,
		port: string,
		username: string,
		password: string,
		key: string,
		authType: string
	) => Promise<void>
	fetchInitialData: () => Promise<void>
}

const instantiateClient = (
	apiConnectionType: string,
	apiAddress: string,
	apiPort: string,
	apiUsername: string,
	apiPassword: string,
	apiKey: string,
	apiAuthType: string
): OverseerrClient => {
	if (apiAuthType === 'user') {
		return new OverseerrClient({
			BASE: `${apiConnectionType}://${apiAddress}${apiPort ? `:${apiPort}` : ''}/api/v1`,
			HEADERS: {
				'X-Api-Key': apiKey
			}
		})
	}
	return new OverseerrClient({
		BASE: `${apiConnectionType}://${apiAddress}${apiPort ? `:${apiPort}` : ''}/api/v1`,
		USERNAME: apiUsername,
		PASSWORD: apiPassword
	})
}

const useAppStore = create<AppState>()((set) => ({
	apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE,
	apiAddress: '',
	apiPort: DEFAULT_OVERSEERR_PORT,
	apiUsername: '',
	apiPassword: '',
	apiKey: '',
	apiAuthType: 'key',
	hasValidSettings: false,
	client: null,
	unsetClientConfig: async () => {
		if (Platform.OS === 'ios') {
			Settings.set({ apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE })
			Settings.set({ apiAddress: '' })
			Settings.set({ apiPort: DEFAULT_OVERSEERR_PORT })
			Settings.set({ apiUsername: '' })
			Settings.set({ apiPassword: '' })
			Settings.set({ apiKey: ''})
			Settings.set({ apiAuthType: DEFAULT_OVERSEERR_API_AUTH_TYPE})
		} else {
			await AsyncStorage.setItem('apiConnectionType', DEFAULT_OVERSEERR_CONNECTION_TYPE)
			await AsyncStorage.setItem('apiAddress', '')
			await AsyncStorage.setItem('apiPort', DEFAULT_OVERSEERR_PORT)
			await AsyncStorage.setItem('apiUsername', '')
			await AsyncStorage.setItem('apiPassword', '')
			await AsyncStorage.setItem('apiKey', '')
			await AsyncStorage.setItem('apiAuthType', DEFAULT_OVERSEERR_API_AUTH_TYPE)

		}
		set(() => ({
			apiConnectionType: DEFAULT_OVERSEERR_CONNECTION_TYPE,
			apiAddress: '',
			apiPort: DEFAULT_OVERSEERR_PORT,
			apiUsername: '',
			apiPassword: '',
			apiKey: '',
			apiAuthType: DEFAULT_OVERSEERR_API_AUTH_TYPE,
			client: null,
			hasValidSettings: false
		}))
	},
	setOverseerClient: async (apiConnectionType: string, apiAddress: string, apiPort: string, apiUsername: string, apiPassword: string, apiKey: string, apiAuthType: string) => {
		if (Platform.OS === 'ios') {
			Settings.set({ apiConnectionType })
			Settings.set({ apiAddress })
			Settings.set({ apiPort })
			Settings.set({ apiUsername })
			Settings.set({ apiPassword })
			Settings.set({ apiKey })
			Settings.set({ apiAuthType })
		} else {
			await AsyncStorage.setItem('apiConnectionType', apiConnectionType)
			await AsyncStorage.setItem('apiAddress', apiAddress)
			await AsyncStorage.setItem('apiPort', apiPort)
			await AsyncStorage.setItem('apiUsername', apiUsername)
			await AsyncStorage.setItem('apiPassword', apiPassword)
			await AsyncStorage.setItem('apiKey', apiKey)
			await AsyncStorage.setItem('apiAuthType', apiAuthType)
		}
		const client = instantiateClient(apiConnectionType, apiAddress, apiPort, apiUsername, apiPassword, apiKey, apiAuthType)
		set(() => ({ apiConnectionType, apiAddress, apiPort, apiUsername, apiPassword, client, hasValidSettings: true }))
	},
	fetchInitialData: async () => {
		let apiConnectionType = ''
		let apiAddress = ''
		let apiPort = ''
		let apiUsername = ''
		let apiPassword = ''
		let apiKey = ''
		let apiAuthType: string = DEFAULT_OVERSEERR_API_AUTH_TYPE
		if (Platform.OS === 'ios') {
			apiConnectionType = Settings.get('apiConnectionType') ?? DEFAULT_OVERSEERR_CONNECTION_TYPE
			apiAddress = Settings.get('apiAddress') ?? ''
			apiPort = Settings.get('apiPort') ?? DEFAULT_OVERSEERR_PORT
			apiUsername = Settings.get('apiUsername') ?? ''
			apiPassword = Settings.get('apiPassword') ?? ''
			apiKey = Settings.get('apiKey') ?? ''
			apiAuthType = Settings.get('apiAuthType') ?? DEFAULT_OVERSEERR_API_AUTH_TYPE
		} else {
			apiConnectionType = await AsyncStorage.getItem('apiConnectionType') ?? DEFAULT_OVERSEERR_CONNECTION_TYPE
			apiAddress = await AsyncStorage.getItem('apiAddress') ?? ''
			apiPort = await AsyncStorage.getItem('apiPort') ?? DEFAULT_OVERSEERR_PORT
			apiUsername = await AsyncStorage.getItem('apiUsername') ?? ''
			apiPassword = await AsyncStorage.getItem('apiPassword') ?? ''
			apiKey = await AsyncStorage.getItem('apiKey') ?? ''
			apiAuthType = (await AsyncStorage.getItem('apiAuthType') as string) ?? DEFAULT_OVERSEERR_API_AUTH_TYPE
		}
		if (apiAddress && apiUsername && apiPassword) {
			const client = instantiateClient(apiConnectionType, apiAddress, apiPort, apiUsername, apiPassword, apiKey, apiAuthType)
			set({ apiConnectionType, apiAddress, apiPort, apiUsername, apiPassword, client, hasValidSettings: true })
		}
	},
}))

useAppStore.getState().fetchInitialData()

export default useAppStore
