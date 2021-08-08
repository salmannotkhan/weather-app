/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
} from 'react-native';
import Card from './Card';

interface ConsolidatedWeather {
	air_pressure: number;
	applicable_date: string;
	created: string;
	humidity: number;
	id: number;
	max_temp: number;
	min_temp: number;
	predictability: number;
	the_temp: number;
	visibility: number;
	weather_state_abbr: string;
	weather_state_name: string;
	wind_direction: number;
	wind_direction_compass: string;
	wind_speed: number;
}

interface Weather {
	consolidated_weather: ConsolidatedWeather[];
	title: string;
	sun_rise: string;
	sun_set: string;
}

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const [location, setLocation] = useState('');
	const [weather, setWeather] = useState<Weather>();

	const searchCity = async () => {
		const url =
			'https://www.metaweather.com/api/location/search/?query=' +
			location;
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		const weatherUrl = `https://www.metaweather.com/api/location/${data[0].woeid}`;
		const weatherResponse = await fetch(weatherUrl);
		const weatherData = await weatherResponse.json();
		setWeather(weatherData);
	};

	return (
		<SafeAreaView>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<TextInput
				style={styles.searchBar}
				onChangeText={setLocation}
				onSubmitEditing={searchCity}
				placeholder="Search City"
				returnKeyType="search"
			/>

			<ScrollView
				automaticallyAdjustContentInsets={true}
				style={styles.scrollView}>
				{weather ? (
					<View style={styles.hero}>
						<View style={styles.row}>
							<View>
								<Image
									source={{
										uri: `https://www.metaweather.com/static/img/weather/png/${weather.consolidated_weather[0].weather_state_abbr}.png`,
										height: 100,
										width: 100,
									}}
								/>
								<Text style={styles.mainTemp}>
									{weather.consolidated_weather[0].the_temp.toFixed()}
									&deg; C
								</Text>
								<Text style={styles.title}>
									{weather.title}
								</Text>
							</View>
							<View>
								<Text>
									{
										weather.consolidated_weather[0]
											.weather_state_name
									}
								</Text>
								<Text style={styles.temp}>
									Min:{' '}
									{weather.consolidated_weather[0].min_temp.toFixed()}
									&deg; C
								</Text>
								<Text style={styles.temp}>
									Max:{' '}
									{weather.consolidated_weather[0].max_temp.toFixed()}
									&deg; C
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View>
								<Text>
									Visibility:{' '}
									{weather.consolidated_weather[0].visibility.toFixed(
										2,
									)}
								</Text>
								<Text>
									Wind Speed:{' '}
									{weather.consolidated_weather[0].wind_speed.toFixed(
										2,
									) + ' '}
									km/h
								</Text>
							</View>
							<View>
								<Text>
									Sunrise: {weather.sun_rise.slice(11, 16)}
								</Text>
								<Text>
									Sunset: {weather.sun_set.slice(11, 16)}
								</Text>
							</View>
						</View>
					</View>
				) : null}
				{weather
					? weather.consolidated_weather.slice(1).map(entry => (
							<Card
								key={entry.id}
								temp={entry.the_temp}
								minTemp={entry.min_temp}
								maxTemp={entry.max_temp}
								weatherState={entry.weather_state_abbr}
							/>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))
					: null}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainTemp: {
		marginTop: 10,
		fontSize: 30,
	},
	temp: {
		textAlign: 'right',
	},
	hero: {
		padding: 40,
	},
	row: {
		flex: 1,
		padding: 5,
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		flexDirection: 'row',
	},
	main: {
		display: 'flex',
	},
	scrollView: {
		height: '90%',
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	searchBar: {
		fontSize: 16,
		padding: 20,
		elevation: 1,
		shadowRadius: 50,
	},
});

export default App;
