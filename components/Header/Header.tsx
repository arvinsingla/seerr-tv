import { useEffect } from 'react'
import { StyleSheet, SafeAreaView, Image, TouchableOpacity, View, Alert } from 'react-native'
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import useAppStore from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { normalizeSize } from '@/lib/utils';

interface HeaderProps {
	header: NativeStackHeaderProps
}

const Header: React.FC<HeaderProps> = ({ header }) => {
	const navigation = useNavigation()
	const { client } = useAppStore()
	const queryClient = useQueryClient();
	const { route } = header
	const isSettingsPage = route.name === "Settings"

	const { data: userData } = useQuery({
		queryKey: ['user'],
		queryFn: () => client?.auth.getAuthMe()
	})

	function onPressRefresh() {
		Alert.alert(
			`Refresh data`,
			`Are you sure you want to get the lastest data from the server?`,
			[
				{
					text: 'Confirm',
					onPress: async () => {
						queryClient.invalidateQueries();
					},
					style: 'destructive',
					isPreferred: true
				},
				{
					text: 'Cancel',
					style: 'cancel'
				}
			],
		)
	}

	return (
		<SafeAreaView style={style.wrapper}>
			<Image style={style.logo} source={require('./img/logo.png')} />
			<View style={style.links}>
				{!isSettingsPage &&
					<TouchableOpacity
						activeOpacity={1}
						tvParallaxProperties={{
							enabled: true,
							magnification: 1.1,
							tiltAngle: 0
						}}
						style={[{ opacity: 0.5 }, style.menuItem]}
						onPress={() => navigation.navigate('Discovery')}
					>
						<Image style={style.icon} source={require('./img/home.png')} />
					</TouchableOpacity>
				}
				{!isSettingsPage && userData &&
					<TouchableOpacity
						activeOpacity={1}
						tvParallaxProperties={{
							enabled: true,
							magnification: 1.1,
							tiltAngle: 0
						}}
						style={[{ opacity: 0.5 }, style.menuItem]}
						onPress={() => navigation.navigate('Search')}
					>
						<Image style={style.icon} source={require('./img/search.png')} />
					</TouchableOpacity>
				}
				{!isSettingsPage && userData && false &&
					<TouchableOpacity
						activeOpacity={1}
						tvParallaxProperties={{
							enabled: true,
							magnification: 1.1,
							tiltAngle: 0
						}}
						style={[{ opacity: 0.5 }, style.menuItem]}
						onPress={onPressRefresh}
					>
						<Image style={style.icon} source={require('./img/refresh.png')} />
					</TouchableOpacity>
				}
				{!isSettingsPage &&
					<TouchableOpacity
						activeOpacity={1}
						tvParallaxProperties={{
							enabled: true,
							magnification: 1.1,
							tiltAngle: 0
						}}
						style={[{ opacity: 0.5 }, style.menuItem]}
						onPress={() => navigation.navigate('Settings')}
					>
						{userData?.avatar &&
							<Image
								source={{ uri: userData.avatar }}
								style={style.avatar}
							/>
						}
					</TouchableOpacity>
				}
			</View>
		</SafeAreaView>
	)
}

const style = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		verticalAlign: 'middle',
		width: '100%',
		height: normalizeSize(200),
		backgroundColor: '#1E2837',
		paddingTop: normalizeSize(10),
		paddingBottom: normalizeSize(10),
		paddingLeft: normalizeSize(80),
		paddingRight: normalizeSize(80),
		borderBottomWidth: 1,
		borderBottomColor: '#374151'
	},
	headerText: {
		fontSize: normalizeSize(60),
		color: '#ffffff'
	},
	logo: {
		width: normalizeSize(486),
		height: normalizeSize(86),
	},
	menuItem: {
		width: normalizeSize(100),
		height: normalizeSize(100),
		borderRadius: normalizeSize(50),
		borderWidth: normalizeSize(3),
		borderColor: '#ffffff',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: normalizeSize(60),
		height: normalizeSize(60),
	},
	avatar: {
		width: normalizeSize(100),
		height: normalizeSize(100),
		borderRadius: normalizeSize(50),
		borderWidth: normalizeSize(3),
		borderColor: '#ffffff'
	},
	links: {
		display: 'flex',
		flexDirection: 'row',
		gap: normalizeSize(40),
	}
})

export default Header
