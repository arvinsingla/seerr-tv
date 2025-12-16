import { useColorScheme } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useAppStore from './lib/store'
import { navigationDarkTheme } from './lib/theme'
import DiscoveryScreen from './screens/DiscoveryScreen/DiscoveryScreen'
import SettingsScreen from './screens/SettingsScreen/SettingsScreen'
import Header from './components/Header/Header'
import MovieScreen from './screens/MovieScreen/MovieScreen'
import TvScreen from './screens/TvScreen/TvScreen'
import { MovieResult, PersonResult, TvResult } from './lib/OverseerrClient'
import { Category } from './components/HorizontalCategoryList/HorizontalCategoryList'
import MovieGenreScreen from './screens/MovieGenreScreen/MovieGenreScreen'
import TvGenreScreen from './screens/TvGenreScreen/TvGenreScreen'
import StudioScreen from './screens/StudioScreen/StudioScreen'
import NetworkScreen from './screens/NetworkScreen/NetworkScreen'
import MediaListScreen from './screens/MediaListScreen/MediaListScreen'
import SearchScreen from './screens/SearchScreen/SearchScreen'
import PersonScreen from './screens/PersonScreen/PersonScreen'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Discovery: undefined
  Settings: undefined
  Search: undefined
  Movie: { item: MovieResult }
  Tv: { item: TvResult }
  Person: { item: PersonResult }
  MovieGenre: { category: Category}
  TvGenre: { category: Category}
  Network: { category: Category}
  Studio: { category: Category}
	MediaList: { fetchFn: (page: number) => void, title: string, cacheKey: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const queryClient = new QueryClient()

function App(): JSX.Element {
  const { apiKey, apiPassword, apiAddress } = useAppStore()
  const hasServerSettings = (apiKey || apiPassword) && apiAddress
	const scheme = useColorScheme()
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={scheme === 'dark' ? navigationDarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName={hasServerSettings ? 'Discovery' : 'Settings'}
          screenOptions={{
            header: (props) => <Header header={props} />
          }}
        >
					<Stack.Screen name="Discovery" component={DiscoveryScreen} />
					<Stack.Screen name="Movie" component={MovieScreen} />
					<Stack.Screen name="Tv" component={TvScreen} />
					<Stack.Screen name="Person" component={PersonScreen} />
					<Stack.Screen name="MovieGenre" component={MovieGenreScreen} />
					<Stack.Screen name="TvGenre" component={TvGenreScreen} />
					<Stack.Screen name="Studio" component={StudioScreen} />
					<Stack.Screen name="Network" component={NetworkScreen} />
					<Stack.Screen name="MediaList" component={MediaListScreen} />
					<Stack.Screen name="Search" component={SearchScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
