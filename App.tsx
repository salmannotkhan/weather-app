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

			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<View>
					{weather ? (
						<View style={styles.weatherCard}>
							<Image
								source={{
									uri: `https://www.metaweather.com/static/img/weather/png/${weather.consolidated_weather[0].weather_state_abbr}.png`,
									height: 64,
									width: 64,
								}}
							/>
							<Text>{location}</Text>
							<Text>
								{weather.consolidated_weather[0].the_temp.toFixed()}
								&deg; C
							</Text>
							<View>
								<Text>
									Min:{' '}
									{weather.consolidated_weather[0].min_temp.toFixed()}
									&deg; C
								</Text>
								<Text>
									Max:{' '}
									{weather.consolidated_weather[0].max_temp.toFixed()}
									&deg; C
								</Text>
							</View>
						</View>
					) : null}
					{weather
						? weather.consolidated_weather.map(entry => (
								<View key={entry.id} style={styles.weatherCard}>
									<Image
										source={{
											uri: `https://www.metaweather.com/static/img/weather/png/${entry.weather_state_abbr}.png`,
											height: 64,
											width: 64,
										}}
									/>
									<Text>
										{entry.the_temp.toFixed()}
										&deg; C
									</Text>
									<View>
										<Text>
											Min: {entry.min_temp.toFixed()}
											&deg; C
										</Text>
										<Text>
											Max: {entry.max_temp.toFixed()}
											&deg; C
										</Text>
									</View>
								</View>
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  ))
						: null}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	searchBar: {
		fontSize: 16,
		padding: 15,
		shadowColor: 'black',
		shadowOpacity: 100,
		shadowOffset: {width: 15, height: 5},
		shadowRadius: 50,
	},
	weatherCard: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 25,
		justifyContent: 'space-between',
	},
});

export default App;
