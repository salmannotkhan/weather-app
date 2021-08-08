import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
	weatherState: string;
	minTemp: number;
	maxTemp: number;
	temp: number;
}

const Card = (props: Props) => {
	return (
		<View style={styles.weatherCard}>
			<Image
				style={styles.img}
				source={{
					uri: `https://www.metaweather.com/static/img/weather/png/64/${props.weatherState}.png`,
					height: 64,
					width: 64,
				}}
			/>
			<Text>
				{props.temp.toFixed()}
				&deg; C
			</Text>
			<View style={styles.minMax}>
				<Text>
					Min: {props.minTemp.toFixed()}
					&deg; C
				</Text>
				<Text>
					Max: {props.maxTemp.toFixed()}
					&deg; C
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	img: {
		marginRight: 15,
	},
	weatherCard: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 25,
		margin: 5,
		borderRadius: 5,
		elevation: 5,
		justifyContent: 'space-between',
	},
	minMax: {
		flex: 1,
		alignItems: 'flex-end',
	},
});

export default Card;
