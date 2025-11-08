import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDebounce } from 'use-debounce';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import ParallaxScrollView from '@/components/ParallaxScrollView';
import MediaList from '@/components/MediaList/MediaList';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedText } from '@/components/ThemedText';
import useAppStore from '@/lib/store';
import { MediaType } from '@/lib/types';
import { MovieResult, PersonResult, TvResult } from '@/lib/OverseerrClient';
import { EMPTY_SETTINGS_TEXT } from '../../lib/constants';

export default function SearchScreen() {
	const [searchString, setSearchString] = useState('')
	const [searchValue] = useDebounce(searchString, 1000)
	const { client, hasValidSettings } = useAppStore()
	const router = useRouter();

	const queryClient = useQueryClient()
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['search', searchValue],
		queryFn: ({ pageParam }) => client?.search.getSearch(searchValue, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage: any) => {
			if (lastPage?.page && lastPage?.totalPages && lastPage.page < lastPage.totalPages) {
				return lastPage.page + 1
			}
			return undefined
		},
		enabled: searchValue !== '',
	})

	useEffect(() => {
		return () => {
			queryClient.removeQueries({ queryKey: ['search'] })
		}
	}, [])

	const handlePress = (item: MovieResult | TvResult | PersonResult) => {
		switch (item.mediaType) {
			case MediaType.movie:
				// @ts-ignore
				router.navigate(`/movie/${item.id}`)
				break
			case MediaType.tv:
				// @ts-ignore
				router.navigate(`/tv/${item.id}`)
				break
			case MediaType.person:
				// @ts-ignore
				router.navigate(`/person/${item.id}`)
				break
		}
	}

	const onEndReached = () => {
		if (searchValue !== '') {
			fetchNextPage
		}
	}

	const media = data?.pages ? data?.pages.map((page) => page?.results).flat() : []

	if (!hasValidSettings) {
			return (
				<ParallaxScrollView>
					<ThemedText>{EMPTY_SETTINGS_TEXT}</ThemedText>
				</ParallaxScrollView>
			)
		}


  return (
    <ParallaxScrollView>
			<ThemedTextInput
				value={searchString}
				onChangeText={setSearchString}
				placeholder={'Enter search term'}
				inputMode="search"
			/>
			<MediaList
				media={media}
				onPress={handlePress}
				onEndReached={onEndReached}
			/>
			{isFetching &&
				<ActivityIndicator size="large" />
			}
    </ParallaxScrollView>
  );
}
