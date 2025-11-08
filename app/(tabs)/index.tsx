import { ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MediaList from '@/components/MediaList/MediaList';
import HorizontalCategoryList, { Category } from "@/components/HorizontalCategoryList/HorizontalCategoryList";
import MoreListItem from '@/components/MoreListItem/MoreListItem';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { DEFAULT_REFETCH_INTERVAL, EMPTY_SETTINGS_TEXT } from "@/lib/constants";
import { MediaType } from '@/lib/types';
import { MovieResult, PersonResult, TvResult } from '@/lib/OverseerrClient';
import { studios, networks } from '@/lib/maps'
import movieGenres from '@/lib/movieGenres.json'
import tvGenres from '@/lib/tvGenres.json'

export default function DiscoveryScreen() {
	const { client, hasValidSettings } = useAppStore()
  const styles = useDiscoveryScreenStyles()
	const router = useRouter()

	// Discovery screen data fetching
  const {isSuccess: trendingSuccess, data: trendingData } = useQuery({
    queryKey: ['trending'],
    queryFn: () => client?.search.getDiscoverTrending(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		enabled: !!client && hasValidSettings
  })
  const {isSuccess: popularMoviesSuccess, data: popularMoviesData } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => client?.search.getDiscoverMovies(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		enabled: !!client && hasValidSettings
  })
  const {isSuccess: popularTvSuccess, data: popularTvData } = useQuery({
    queryKey: ['popular-tv'],
    queryFn: () => client?.search.getDiscoverTv(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		enabled: !!client && hasValidSettings
  })
  const {isSuccess: upcomingMoviesSuccess, data: upcomingMoviesData } = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: () => client?.search.getDiscoverMoviesUpcoming(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		enabled: !!client && hasValidSettings
  })
  const {isSuccess: upcomingTvSuccess, data: upcomingTvData } = useQuery({
    queryKey: ['upcoming-tv'],
    queryFn: () => client?.search.getDiscoverTvUpcoming(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		enabled: !!client && hasValidSettings
  })

	if (!hasValidSettings) {
		return (
			<ParallaxScrollView>
				<ThemedText>{EMPTY_SETTINGS_TEXT}</ThemedText>
			</ParallaxScrollView>
		)
	}

 	if (!client) {
		return (
			<ParallaxScrollView>
				<ActivityIndicator size="large" />
			</ParallaxScrollView>
		)
	}

	// onPress handlers
	const handlePressMedia = (item: MovieResult | TvResult | PersonResult) => {
		switch(item.mediaType) {
			case MediaType.movie:
				// @ts-ignore
				router.push(`movie/${item.id}`)
				break
			case MediaType.tv:
				// @ts-ignore
				router.push(`tv/${item.id}`)
				break
			case MediaType.person:
				// @ts-ignore
				router.push(`person/${item.id}`)
				break
			default:
				break
		}
	}
	const handlePressTvGenre = (category: Category) => {
		router.push({
			pathname: '/tv-genre',
			params: {
				id: category.id,
				name: category.name
			}
		})
	}
	const handlePressNetwork = (category: Category) => {
		router.push({
			pathname: '/tv-network',
			params: {
				id: category.id,
				backdrops: category.backdrops
			}
		})
	}
	const handlePressMovieGenre = (category: Category) => {
		router.push({
			pathname: '/movie-genre',
			params: {
				id: category.id,
				name: category.name
			}
		})
	}
	const handlePressStudio = (category: Category) => {
		router.push({
			pathname: '/movie-studio',
			params: {
				id: category.id,
				backdrops: category.backdrops
			}
		})
	}
	const handlePressTrending = () => {
		router.push({
			pathname: '/media-list',
			params: {
				title: 'Trending',
				cacheKey: 'trending-screen',
			}
		})
	}
	const handlePressMoviePopular = () => {
		router.push({
			pathname: '/media-list',
			params: {
				title: 'Popular Movies',
				cacheKey: 'popular-movies-screen',
			}
		})
	}
	const handlePressMovieUpcoming = () => {
		router.push({
			pathname: '/media-list',
			params: {
				title: 'Upcoming Movies',
				cacheKey: 'upcoming-movies-screen',
			}
		})
	}
	const handlePressTvPopular = () => {
		router.push({
			pathname: '/media-list',
			params: {
				title: 'Popular Series',
				cacheKey: 'popular-tv-screen',
			}
		})
	}
	const handlePressTvUpcoming = () => {
		router.push({
			pathname: '/media-list',
			params: {
				title: 'Upcoming Series',
				cacheKey: 'upcoming-tv-screen',
			}
		})
	}

	return (
    <ParallaxScrollView>
			{trendingSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Trending</ThemedText>
					<MediaList
						media={trendingData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressTrending} />}
					/>
				</ThemedView>
			}
			{popularMoviesSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Popular Movies</ThemedText>
					<MediaList
						media={popularMoviesData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressMoviePopular} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={[styles.title]}>Movie Genres</ThemedText>
				<HorizontalCategoryList categories={movieGenres} onPress={handlePressMovieGenre} />
			</ThemedView>
			{upcomingMoviesSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Upcoming Movies</ThemedText>
					<MediaList
						media={upcomingMoviesData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressMovieUpcoming} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={[styles.title]}>Studios</ThemedText>
				<HorizontalCategoryList categories={studios} isLogo={true} onPress={handlePressStudio} />
			</ThemedView>
			{popularTvSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Popular Series</ThemedText>
					<MediaList
						media={popularTvData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressTvPopular} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={styles.title}>Series Genres</ThemedText>
				<HorizontalCategoryList categories={tvGenres} onPress={handlePressTvGenre} />
			</ThemedView>
			{upcomingTvSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Upcoming Series</ThemedText>
					<MediaList
						media={upcomingTvData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressTvUpcoming} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={[styles.title]}>Networks</ThemedText>
				<HorizontalCategoryList categories={networks} isLogo={true} onPress={handlePressNetwork} />
			</ThemedView>
    </ParallaxScrollView>
  );
}

const useDiscoveryScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
		title: {
			marginBottom: 5 * scale,
			fontWeight: '600',
		},
  });
};
